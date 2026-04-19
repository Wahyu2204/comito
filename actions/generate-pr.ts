'use server'

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';

interface GeneratePRResult {
  success: boolean;
  data?: string;
  error?: string;
}

export async function generatePRDescription(prUrl: string): Promise<GeneratePRResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return {
        success: false,
        error: 'Unauthorized: Please log in again to grant GitHub access.',
      };
    }

    // Validate and parse the PR URL
    let urlObj: URL;
    try {
      urlObj = new URL(prUrl);
    } catch {
      return {
        success: false,
        error: 'Invalid URL format. Please provide a valid GitHub Pull Request URL.',
      };
    }

    const pathParts = urlObj.pathname.split('/').filter(Boolean);

    if (pathParts.length < 4 || pathParts[2] !== 'pull') {
      return {
        success: false,
        error: 'Invalid URL. Please provide a valid GitHub Pull Request URL.',
      };
    }

    const owner = pathParts[0];
    const repo = pathParts[1];
    const prNumber = pathParts[3];

    // Fetch PR diff from GitHub
    const githubRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, {
      headers: {
        'Accept': 'application/vnd.github.v3.diff',
        'Authorization': `Bearer ${session.accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'Comito-PR-Generator',
      },
    });

    if (!githubRes.ok) {
      if (githubRes.status === 401 || githubRes.status === 403) {
        return {
          success: false,
          error: 'GitHub access denied. Please re-login to grant repository access.',
        };
      }
      if (githubRes.status === 404) {
        return {
          success: false,
          error: 'Pull request not found. Please check the URL.',
        };
      }
      return {
        success: false,
        error: `Failed to fetch PR data from GitHub: ${githubRes.statusText}`,
      };
    }

    let diffText = await githubRes.text();

    const MAX_DIFF_LENGTH = 12000;

    // Remove lock files and SVG files from diff
    diffText = diffText.replace(/diff --git a\/.*lock\.json[\s\S]*?(?=diff --git|$)/g, '');
    diffText = diffText.replace(/diff --git a\/.*\.svg[\s\S]*?(?=diff --git|$)/g, '');

    if (diffText.length > MAX_DIFF_LENGTH) {
      diffText = diffText.substring(0, MAX_DIFF_LENGTH) + '\n\n...[DIFF TRUNCATED DUE TO LENGTH]...';
    }

    // Call Groq API to generate PR description
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a Senior Software Engineer. Your task is to write a highly professional, neat, and detailed Pull Request description based on the provided git diff.

Use the following Markdown format:
## Overview
(Briefly explain the main purpose of these changes)

## Changes
(List the specific files/components changed and why)

## Potential Impacts / Breaking Changes
(Are there any side effects? Write 'None' if safe)

Use clear, technical, yet accessible language.`
          },
          {
            role: "user",
            content: `Please create a PR description for the following changes:\n\n${diffText}`
          }
        ],
        temperature: 0.6,
      }),
    });

    if (!groqRes.ok) {
      const errorData = await groqRes.json().catch(() => ({}));
      console.error("Groq API error:", errorData);
      return {
        success: false,
        error: `Failed to generate from AI: ${groqRes.statusText}`,
      };
    }

    const aiData = await groqRes.json();
    const generatedMarkdown = aiData.choices[0]?.message?.content;

    if (!generatedMarkdown) {
      return {
        success: false,
        error: 'AI returned an empty response. Please try again.',
      };
    }

    // Save to database
    try {
      const userId = BigInt(session.user.id);

      await prisma.generation.create({
        data: {
          userId: userId,
          repo_name: `${owner}/${repo}`,
          pr_url: prUrl,
          input_diff: diffText,
          output: generatedMarkdown,
        },
      });
    } catch (dbError) {
      // Log but don't fail - the generation still worked
      console.error("Failed to save generation to database:", dbError);
    }

    return {
      success: true,
      data: generatedMarkdown,
    };

  } catch (error: unknown) {
    console.error("Error generating PR:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'An internal error occurred.',
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}