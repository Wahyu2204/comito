import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Get the current user session on the server
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

/**
 * Get the current session with all data
 */
export async function getSession() {
  return getServerSession(authOptions);
}

/**
 * Require authentication - redirect to sign in if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/api/auth/signin");
  }
  return user;
}
