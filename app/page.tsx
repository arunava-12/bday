"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Masonry from "./Masonry";
import Stack from "./Stack";

// Dynamically import react-confetti to avoid SSR issues
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Home() {
  const [cardOpen, setCardOpen] = useState(false);

  // Get window size for confetti (optional: can use useEffect for responsiveness)
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });
  React.useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.45) 0%, transparent 20%), #000000",
      }}
    >
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-20">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-4 drop-shadow-lg">
          Happy Birthday, My Love! 🎉
        </h1>
        <p className="text-xl text-purple-200 drop-shadow-md">
          A special surprise just for you 💖
        </p>
      </section>

      {/* Interactive Birthday Card Section */}
      <section className="w-full flex flex-col items-center justify-center py-20 relative">
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4 drop-shadow-lg">
          Your Birthday Card
        </h2>
        <div
          className={`w-full max-w-md md:max-w-lg lg:max-w-xl cursor-pointer transition-all duration-700 ease-in-out relative`}
          style={{ minHeight: cardOpen ? undefined : "300px", maxHeight: cardOpen ? undefined : "300px" }}
          onClick={() => setCardOpen((open) => !open)}
        >
          {/* Card Front/Closed State */}
          <div
            className={`absolute inset-0 w-full h-full rounded-lg flex items-center justify-center text-2xl text-purple-200 shadow-xl border border-white/20 backdrop-blur-md transition-all duration-700 ${
              cardOpen ? "opacity-0 scale-95 pointer-events-none z-0" : "opacity-100 scale-100 pointer-events-auto z-10"
            }`}
            style={{
              background: "rgba(255,255,255,0.12)",
            }}
          >
            <div className="text-center p-8">
              <div className="text-purple-300 mb-4 text-4xl">✨</div>
              <div className="text-xl font-semibold">Click to open your card!</div>
              <div className="text-sm text-purple-300 mt-2">💕 A special message awaits 💕</div>
            </div>
          </div>
          {/* Card Open State */}
          {cardOpen && (
            <div
              className="w-full rounded-lg flex flex-col items-center justify-center text-purple-100 shadow-xl border border-white/20 backdrop-blur-md transition-all duration-700 bg-opacity-80 relative"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <div className="p-6 w-full flex flex-col">
                <div className="text-3xl mb-4 text-center">💕</div>
                <div className="text-lg font-semibold mb-4 text-purple-200 text-center">
                  Happy Birthday, Susmita ❤️🎂✨
                </div>
                <div className="text-sm leading-relaxed space-y-3 text-justify">
                  <p>
                    Today is all about you—your smile, your soul, your laughter, your dreams. 
                    And I want you to know, from the bottom of my heart, how incredibly grateful 
                    I am to walk through life with someone as beautiful and extraordinary as you.
                  </p>
                  <p>
                    From the moment you came into my life, everything changed for the better. 
                    You bring light into every room you enter, and your presence calms my storms. 
                    Your laughter is my favorite melody, and your happiness is my constant wish. 
                    You&apos;ve taught me what love truly means—unconditional, patient, kind, and deeply 
                    rooted in friendship.
                  </p>
                  <p>
                    Every little thing you do—whether it&apos;s the way you talk about your passions, 
                    the way you care for others, or the way you simply hold my hand when I need it—reminds 
                    me why I fell in love with you, and why I keep falling, over and over again, 
                    every single day.
                  </p>
                  <p>
                    I hope this birthday is everything you&apos;ve wished for and more. May it be filled 
                    with laughter, love, warm hugs, sweet surprises, and moments that make your heart 
                    feel full. I hope the year ahead brings you growth, peace, and every success your 
                    heart desires. You deserve all the beautiful things this world has to offer.
                  </p>
                  <p>
                    Thank you for being my partner, my best friend, my favorite person, and the one 
                    I want to celebrate all my future birthdays with. I can&apos;t wait to make a lifetime 
                    of memories together—with more smiles, spontaneous adventures, and quiet moments of joy.
                  </p>
                  <p>
                    So here&apos;s to you, Susmita—the love of my life. Happy Birthday, my sunshine. 💖🎉 
                    I love you more than words could ever capture.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-300/30 text-center">
                  <div className="text-sm font-medium text-purple-200">
                    Forever yours,<br />
                    Arunava
                  </div>
                  <div className="text-2xl mt-2">🎂🎈</div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Confetti overlay when card is open */}
        {cardOpen && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={250}
              recycle={false}
            />
          </div>
        )}
      </section>

      {/* Rolling Gallery Section */}
      {/* Removed RollingGallery and replaced with Stack */}
      <section className="w-full flex flex-col items-center justify-center py-5">
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4 drop-shadow-lg">
          Our Special Moments
        </h2>
        <Stack
          randomRotation={true}
          sensitivity={180}
          sendToBackOnClick={false}
          cardDimensions={{ width: 200, height: 200 }}
          cardsData={[
            { id: 1, img: "/img/IMG-20241009-WA0040.jpg" },
            { id: 2, img: "/img/IMG-20241009-WA0044.jpg" },
            { id: 3, img: "/img/IMG-20241009-WA0048.jpg" },
            { id: 4, img: "/img/IMG-20241009-WA0054.jpg" }
          ] as import("./Stack").CardData[]}
        />
      </section>

      {/* Photo Gallery Section */}
      <section className="w-full flex flex-col items-center justify-center py-5">
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 mb-4 drop-shadow-lg">
          Our Memories
        </h2>
        {/* Masonry Gallery */}
        <div className="w-full max-w-5xl">
          <Masonry
            items={(() => {
              // All 54 image filenames from public/img
              const files = [
                "IMG-20240726-WA0048.jpg","IMG-20240817-WA0032.jpg","IMG-20240824-WA0035.jpg","IMG-20240825-WA0022.jpg","IMG-20241009-WA0062.jpg","Picsart_24-10-05_22-49-03-968.jpg","IMG-20241009-WA0054.jpg","IMG-20241009-WA0040.jpg","IMG-20241009-WA0048.jpg","IMG-20241009-WA0044.jpg","IMG-20241030-WA0028.jpg","IMG-20241031-WA0036.jpg","IMG-20241031-WA0045.jpg","IMG-20241031-WA0050.jpg","IMG-20241031-WA0067.jpg","IMG-20241031-WA0069.jpg","IMG-20241031-WA0076.jpg","IMG-20241101-WA0053.jpg","IMG-20241101-WA0054.jpg","IMG-20241102-WA0011.jpg","IMG-20241230-WA0053.jpg","IMG-20241231-WA0044.jpg","IMG-20250107-WA0017.jpg","IMG-20250107-WA0018.jpg","IMG-20250107-WA0014.jpg","IMG-20250107-WA0039.jpg","IMG-20250203-WA0021.jpg","IMG-20250203-WA0028.jpg","IMG-20250221-WA0003.jpg","IMG-20250221-WA0008.jpg","IMG_20250226_231122.jpg","IMG-20250306-WA0051.jpg","IMG-20250306-WA0047.jpg","IMG_20250318_051814.jpg","IMG_20250318_053010.jpg","IMG-20250410-WA0007.jpg","IMG-20250419-WA0011.jpg","IMG-20250419-WA0010.jpg","IMG-20250419-WA0021.jpg","IMG-20250419-WA0029.jpg","IMG-20250419-WA0045.jpg","IMG-20250419-WA0037.jpg","IMG-20250419-WA0057.jpg","IMG-20250419-WA0009.jpg","IMG-20250419-WA0043.jpg","IMG-20250419-WA0035.jpg","IMG-20250427-WA0025.jpg","IMG-20250427-WA0027.jpg","IMG-20250427-WA0033.jpg","IMG-20250512-WA0007.jpg","IMG-20250618-WA0001.jpg","IMG-20250618-WA0002.jpg","IMG-20250620-WA0008.jpg","IMG-20250620-WA0009.jpg","IMG-20250620-WA0007.jpg","IMG-20250620-WA0010.jpg"
              ];
              // Shuffle array
              for (let i = files.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [files[i], files[j]] = [files[j], files[i]];
              }
              // Map to Masonry items
              return files.map((filename) => ({
                id: filename,
                img: `/img/${filename}`,
                url: `/img/${filename}`,
                height: 300 + Math.floor(Math.random() * 201), // 300-500
              }));
            })()}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>
      </section>
    </main>
  );
}
