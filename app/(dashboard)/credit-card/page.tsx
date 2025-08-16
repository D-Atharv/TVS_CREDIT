"use client";

import React, { useState } from "react";
import { ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";

// --- Data for Credit Card Options ---
const cardData = [
  {
    id: 1,
    title: "Crimson Elite",
    description:
      "For the discerning spender seeking premium rewards and travel benefits.",
    // Using the original blue from your CSS as a base for Crimson Elite
    colors: { from: "#01adef", to: "#0860bf" },
    features: [
      "5x Points on Travel",
      "Airport Lounge Access",
      "No Foreign Transaction Fees",
    ],
  },
  {
    id: 2,
    title: "Silver Starter",
    description:
      "A perfect entry-level card for building credit with great cashback.",
    colors: { from: "#C0C0C0", to: "#808080" }, // Silver gradient
    features: [
      "1.5% Unlimited Cashback",
      "No Annual Fee",
      "$200 Welcome Bonus",
    ],
  },
  {
    id: 3,
    title: "Ruby Business",
    description:
      "Tailored for small businesses to manage expenses and earn rewards.",
    colors: { from: "#e11d48", to: "#991b1b" }, // Ruby red gradient
    features: [
      "Expense Management Tools",
      "2x Points on All Purchases",
      "Employee Cards",
    ],
  },
  {
    id: 4,
    title: "Emerald Business",
    description:
      "Tailored for intermediate businesses to manage expenses and earn rewards.",
    // Emerald green gradient
    colors: { from: "#10b981", to: "#065f46" }, // Emerald green gradient
    features: [
      "Expense Management Tools",
      "2x Points on All Purchases",
      "Employee Cards",
    ],
  },
];

// --- New Flippable Credit Card Component using your provided logic ---
const DetailedFlippableCard = ({
  cardInfo,
}: {
  cardInfo: (typeof cardData)[0];
}) => {
  const cardStyle = {
    "--card-gradient-from": cardInfo.colors.from,
    "--card-gradient-to": cardInfo.colors.to,
  } as React.CSSProperties;

  return (
    <>
      <div className="card" style={cardStyle}>
        <div className="card-inner">
          <div className="card-front">
            <div className="card-bg"></div>
            <div className="card-glow"></div>
            <div
              className="logo"
              style={{ position: "absolute", right: 25, top: 30 }}
            >
              <svg
                width="100"
                height="28"
                viewBox="0 0 110 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="0"
                  y="22"
                  fontFamily="'Overpass Mono', monospace"
                  fontWeight="bold"
                  fontSize="22"
                  fill="white"
                  letterSpacing="-1.5"
                >
                  TVS CREDIT
                </text>
              </svg>
            </div>
            <div className="card-contactless">
              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56">
                <path
                  fill="none"
                  stroke="#f9f9f9"
                  strokeWidth="6"
                  strokeLinecap="round"
                  d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5 0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
                />
              </svg>
            </div>
            <div className="card-chip"></div>
            <div className="card-holder">{cardInfo.title} User</div>
            <div className="card-number">1234 5678 9000 1234</div>
            <div className="card-valid">12/29</div>
          </div>
          <div className="card-back">
            <div className="card-signature">{cardInfo.title} User</div>
            <div className="card-seccode">123</div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Main Page Component ---
export default function CreditCardPage() {
  const [selectedCard, setSelectedCard] = useState(cardData[0]);

  const CardStyles = `
    .card {
      width: 320px;
      height: 200px;
      border-radius: 10px;
      perspective: 1000px;
    }
    .card:hover .card-inner {
      transform: rotateY(180deg);
    }
    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      transition: transform 600ms ease;
      transform-style: preserve-3d;
      box-shadow: 0 0 25px 2px rgba(0,0,0, 0.2);
    }
    .card-front, .card-back {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
      backface-visibility: hidden;
      /* Using CSS variables for dynamic gradients */
      background: linear-gradient(321.03deg, var(--card-gradient-from) 0%, var(--card-gradient-to) 91.45%);
    }
    .card-back {
      transform: rotateY(180deg);
    }
    .card-back::before {
      content: "";
      position: absolute;
      top: 40%;
      left: 20%;
      width: 180%;
      height: 120%;
      border-radius: 100%;
      background-image: linear-gradient(to right top, #a3d4e7, #a7d5e6, #abd5e4, #aed6e3, #b2d6e2, #aed4e2, #abd3e1, #a7d1e1, #9bcee1, #8ecae1, #81c7e1, #73c3e1);
      filter: blur(10px);
      opacity: 0.15;
    }
    .card-back::after {
      content: "";
      position: absolute;
      top: 15%;
      width: 100%;
      height: 40px;
      background-image: linear-gradient(to right top, #021318, #07191f, #0a1f26, #0b262e, #0c2c35, #0c2c35, #0c2c35, #0c2c35, #0b262e, #0a1f26, #07191f, #021318);
    }
    .card-bg {
      position: absolute;
      top: -20px;
      right: -120px;
      width: 380px;
      height: 250px;
      background: linear-gradient(321.03deg, var(--card-gradient-from) 0%, var(--card-gradient-to) 91.45%);
      border-top-left-radius: 100%;
    }
    .card-glow {
      position: absolute;
      top: -140px;
      left: -65px;
      height: 200px;
      width: 400px;
      background: rgba(1, 173, 239, 0.4);
      filter: blur(15px);
      border-radius: 100%;
      transform: skew(-15deg, -15deg);
    }
    .card-contactless {
      position: absolute;
      right: 15px;
      top: 55px;
      transform: scale(0.5);
    }
    .card-chip {
      position: absolute;
      top: 65px;
      left: 25px;
      width: 45px;
      height: 34px;
      border-radius: 5px;
      background-color: #ffda7b;
      overflow: hidden;
    }
    .card-chip::before {
      content: "";
      position: absolute;
      left: 49%;
      top: -7%;
      transform: translateX(-50%);
      background: #ffda7b;
      border: 1px solid #a27c1f;
      width: 25%;
      height: 110%;
      border-radius: 100%;
      z-index: 2;
    }
    .card-chip::after {
      content: "";
      position: absolute;
      top: 30%;
      left: -10%;
      background: transparent;
      border: 1px solid #a27c1f;
      width: 120%;
      height: 33%;
    }
    .card-holder, .card-number, .card-valid {
      position: absolute;
      color: white;
      font-family: "Overpass Mono", monospace;
      letter-spacing: 0.15em;
      filter: drop-shadow(1px 1px 1px rgba(0,0,0, 0.3));
    }
    .card-holder { left: 25px; bottom: 30px; font-size: 14px; }
    .card-number { left: 25px; bottom: 65px; font-size: 16px; font-weight: 600; }
    .card-valid { right: 25px; bottom: 30px; font-size: 14px; }
    .card-valid::before {
      content: "GOOD THRU";
      position: absolute;
      top: 1px;
      left: -35px;
      width: 50px;
      font-size: 7px;
    }
    .card-signature {
      position: absolute;
      top: 120px;
      left: 15px;
      width: 70%;
      height: 30px;
      background: rgb(238, 236, 236);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #021318;
      font-family: "Mr Dafoe", cursive;
      font-size: 24px;
      font-weight: 400;
    }
    .card-signature::before {
      content: "Authorized Signature";
      position: absolute;
      top: -15px;
      left: 0;
      font-family: "Overpass Mono", monospace;
      font-size: 9px;
      color: rgb(238, 236, 236);
    }
    .card-seccode {
      position: absolute;
      top: 125px;
      left: 245px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 17px;
      color: #021318;
      background-color: rgb(238, 236, 236);
      text-align: center;
      font-size: 11px;
    }
    .logo { position: absolute; right: 25px; top: 30px; }
    @import url('https://fonts.googleapis.com/css2?family=Mr+Dafoe&family=Overpass+Mono:wght@400;600&display=swap');
  `;

  return (
    <div className="min-h-screen w-full bg-black bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:40px_40px] text-gray-200 p-4 md:p-8">
      <style>{CardStyles}</style>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Flippable Card & Info */}
        <div className="lg:col-span-2 flex flex-col items-center lg:items-start lg:sticky top-8 h-fit">
          <h1 className="text-4xl font-bold text-white text-center lg:text-left">
            Choose Your Card
          </h1>
          <p className="text-gray-400 mt-2 text-center lg:text-left">
            Hover the card to see the back. Select an option to update.
          </p>
          <div className="mt-12">
            <DetailedFlippableCard cardInfo={selectedCard} />
          </div>
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl w-full max-w-sm">
            <h2 className="text-xl font-semibold text-white">
              {selectedCard.title}
            </h2>
            <ul className="mt-4 space-y-2 text-gray-300">
              {selectedCard.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Bento Grid of Card Options */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-center items-center text-center">
              <ShieldCheck className="w-12 h-12 text-blue-400" />
              <h2 className="text-2xl font-bold mt-4 text-white">
                Secure and Rewarding
              </h2>
              <p className="text-gray-400 mt-2 max-w-md">
                Every card is packed with industry-leading security features and
                a rewarding points system designed for you.
              </p>
            </div>

            {cardData.map((card) => (
              <div
                key={card.id}
                className="p-6 bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col group hover:border-white/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                <p className="text-gray-400 mt-2 flex-grow">
                  {card.description}
                </p>
                <button
                  onClick={() => setSelectedCard(card)}
                  className="mt-6 w-full inline-flex items-center justify-center px-4 py-2.5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-300 transform group-hover:scale-105"
                >
                  Choose Plan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
