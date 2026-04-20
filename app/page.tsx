"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { ProductMockup } from "@/components/landing/ProductMockup";
import { HowItWorks } from "@/components/landing/HowItWorks";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const bgColor = darkMode ? "bg-black" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-black";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} font-mono`}>
      <Header onThemeToggle={setDarkMode} initialDarkMode={darkMode} />
      <main>
        <Hero darkMode={darkMode} />
        <ProductMockup darkMode={darkMode} />
        <HowItWorks darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}