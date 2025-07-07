"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Masonry from "./Masonry";
import RollingGallery from "./RollingGallery";

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
      <section className="w-full flex flex-col items-center justify-center py-20">
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4 drop-shadow-lg">
          Our Special Moments
        </h2>
        <RollingGallery autoplay={true} pauseOnHover={true} />
      </section>

      {/* Photo Gallery Section */}
      <section className="w-full flex flex-col items-center justify-center py-20">
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 mb-4 drop-shadow-lg">
          Our Memories
        </h2>
        {/* Masonry Gallery */}
        <div className="w-full max-w-5xl">
          <Masonry
            items={[
              // Original 6 images
              {
                id: "1",
                img: "https://picsum.photos/id/1015/600/900?grayscale",
                url: "https://example.com/one",
                height: 400,
              },
              {
                id: "2",
                img: "https://picsum.photos/id/1011/600/750?grayscale",
                url: "https://example.com/two",
                height: 250,
              },
              {
                id: "3",
                img: "https://picsum.photos/id/1020/600/800?grayscale",
                url: "https://example.com/three",
                height: 600,
              },
              {
                id: "4",
                img: "https://picsum.photos/id/1025/600/700?grayscale",
                url: "https://example.com/four",
                height: 350,
              },
              {
                id: "5",
                img: "https://picsum.photos/id/1035/600/900?grayscale",
                url: "https://example.com/five",
                height: 500,
              },
              {
                id: "6",
                img: "https://picsum.photos/id/1040/600/800?grayscale",
                url: "https://example.com/six",
                height: 300,
              },
              // Additional images to reach 50 total
              {
                id: "7",
                img: "https://picsum.photos/id/1041/600/850?grayscale",
                url: "https://example.com/seven",
                height: 450,
              },
              {
                id: "8",
                img: "https://picsum.photos/id/1042/600/750?grayscale",
                url: "https://example.com/eight",
                height: 280,
              },
              {
                id: "9",
                img: "https://picsum.photos/id/1043/600/900?grayscale",
                url: "https://example.com/nine",
                height: 520,
              },
              {
                id: "10",
                img: "https://picsum.photos/id/1044/600/700?grayscale",
                url: "https://example.com/ten",
                height: 320,
              },
              {
                id: "11",
                img: "https://picsum.photos/id/1045/600/800?grayscale",
                url: "https://example.com/eleven",
                height: 380,
              },
              {
                id: "12",
                img: "https://picsum.photos/id/1054/600/900?grayscale",
                url: "https://example.com/twelve",
                height: 480,
              },
              {
                id: "13",
                img: "https://picsum.photos/id/1047/600/750?grayscale",
                url: "https://example.com/thirteen",
                height: 290,
              },
              {
                id: "14",
                img: "https://picsum.photos/id/1048/600/850?grayscale",
                url: "https://example.com/fourteen",
                height: 420,
              },
              {
                id: "15",
                img: "https://picsum.photos/id/1049/600/700?grayscale",
                url: "https://example.com/fifteen",
                height: 340,
              },
              {
                id: "16",
                img: "https://picsum.photos/id/1050/600/900?grayscale",
                url: "https://example.com/sixteen",
                height: 460,
              },
              {
                id: "17",
                img: "https://picsum.photos/id/1051/600/800?grayscale",
                url: "https://example.com/seventeen",
                height: 360,
              },
              {
                id: "18",
                img: "https://picsum.photos/id/1052/600/750?grayscale",
                url: "https://example.com/eighteen",
                height: 310,
              },
              {
                id: "19",
                img: "https://picsum.photos/id/1053/600/900?grayscale",
                url: "https://example.com/nineteen",
                height: 540,
              },
              {
                id: "20",
                img: "https://picsum.photos/id/1054/600/700?grayscale",
                url: "https://example.com/twenty",
                height: 330,
              },
              {
                id: "21",
                img: "https://picsum.photos/id/1055/600/850?grayscale",
                url: "https://example.com/twentyone",
                height: 410,
              },
              {
                id: "22",
                img: "https://picsum.photos/id/1056/600/800?grayscale",
                url: "https://example.com/twentytwo",
                height: 370,
              },
              {
                id: "23",
                img: "https://picsum.photos/id/1057/600/900?grayscale",
                url: "https://example.com/twentythree",
                height: 490,
              },
              {
                id: "24",
                img: "https://picsum.photos/id/1058/600/750?grayscale",
                url: "https://example.com/twentyfour",
                height: 270,
              },
              {
                id: "25",
                img: "https://picsum.photos/id/1059/600/700?grayscale",
                url: "https://example.com/twentyfive",
                height: 350,
              },
              {
                id: "26",
                img: "https://picsum.photos/id/1060/600/900?grayscale",
                url: "https://example.com/twentysix",
                height: 510,
              },
              {
                id: "27",
                img: "https://picsum.photos/id/1061/600/800?grayscale",
                url: "https://example.com/twentyseven",
                height: 390,
              },
              {
                id: "28",
                img: "https://picsum.photos/id/1062/600/750?grayscale",
                url: "https://example.com/twentyeight",
                height: 300,
              },
              {
                id: "29",
                img: "https://picsum.photos/id/1063/600/850?grayscale",
                url: "https://example.com/twentynine",
                height: 430,
              },
              {
                id: "30",
                img: "https://picsum.photos/id/1064/600/700?grayscale",
                url: "https://example.com/thirty",
                height: 320,
              },
              {
                id: "31",
                img: "https://picsum.photos/id/1065/600/900?grayscale",
                url: "https://example.com/thirtyone",
                height: 470,
              },
              {
                id: "32",
                img: "https://picsum.photos/id/1066/600/800?grayscale",
                url: "https://example.com/thirtytwo",
                height: 380,
              },
              {
                id: "33",
                img: "https://picsum.photos/id/1067/600/750?grayscale",
                url: "https://example.com/thirtythree",
                height: 290,
              },
              {
                id: "34",
                img: "https://picsum.photos/id/1068/600/900?grayscale",
                url: "https://example.com/thirtyfour",
                height: 530,
              },
              {
                id: "35",
                img: "https://picsum.photos/id/1069/600/700?grayscale",
                url: "https://example.com/thirtyfive",
                height: 340,
              },
              {
                id: "36",
                img: "https://picsum.photos/id/1070/600/850?grayscale",
                url: "https://example.com/thirtysix",
                height: 420,
              },
              {
                id: "37",
                img: "https://picsum.photos/id/1071/600/800?grayscale",
                url: "https://example.com/thirtyseven",
                height: 360,
              },
              {
                id: "38",
                img: "https://picsum.photos/id/1072/600/900?grayscale",
                url: "https://example.com/thirtyeight",
                height: 480,
              },
              {
                id: "39",
                img: "https://picsum.photos/id/1073/600/750?grayscale",
                url: "https://example.com/thirtynine",
                height: 310,
              },
              {
                id: "40",
                img: "https://picsum.photos/id/1074/600/700?grayscale",
                url: "https://example.com/forty",
                height: 330,
              },
              {
                id: "41",
                img: "https://picsum.photos/id/1075/600/900?grayscale",
                url: "https://example.com/fortyone",
                height: 500,
              },
              {
                id: "42",
                img: "https://picsum.photos/id/1076/600/800?grayscale",
                url: "https://example.com/fortytwo",
                height: 370,
              },
              {
                id: "43",
                img: "https://picsum.photos/id/1077/600/750?grayscale",
                url: "https://example.com/fortythree",
                height: 280,
              },
              {
                id: "44",
                img: "https://picsum.photos/id/1078/600/850?grayscale",
                url: "https://example.com/fortyfour",
                height: 440,
              },
              {
                id: "45",
                img: "https://picsum.photos/id/1079/600/700?grayscale",
                url: "https://example.com/fortyfive",
                height: 350,
              },
              {
                id: "46",
                img: "https://picsum.photos/id/1080/600/900?grayscale",
                url: "https://example.com/fortysix",
                height: 520,
              },
              {
                id: "47",
                img: "https://picsum.photos/id/1081/600/800?grayscale",
                url: "https://example.com/fortyseven",
                height: 390,
              },
              {
                id: "48",
                img: "https://picsum.photos/id/1082/600/750?grayscale",
                url: "https://example.com/fortyeight",
                height: 300,
              },
              {
                id: "49",
                img: "https://picsum.photos/id/1083/600/850?grayscale",
                url: "https://example.com/fortynine",
                height: 430,
              },
              {
                id: "50",
                img: "https://picsum.photos/id/1084/600/700?grayscale",
                url: "https://example.com/fifty",
                height: 340,
              },
            ]}
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
