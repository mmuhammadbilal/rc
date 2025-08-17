import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Top Batters", key: "batters" },
  { name: "Top Bowlers", key: "bowlers" },
  { name: "All-Rounders", key: "allrounders" },
  { name: "Best Bowling", key: "bestbowling" },
  { name: "Best Batting", key: "bestbatting" },
];

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState("batters");
  const [data, setData] = useState({
    batters: [],
    bowlers: [],
    allrounders: [],
    bestbowling: [
      // { name: "M MONDOL", country: "BAN", stat: "5/5 vs AUS" },
      // { name: "J BUMRAH", country: "IND", stat: "4/0 vs AUS" },
      // { name: "M MIRAZ", country: "BAN", stat: "4/2 vs PAK" },
      // { name: "M MONDOL", country: "BAN", stat: "4/3 vs SA" },
      //   { name: "R AHMED", country: "ENG", stat: "4/6 vs IND" },
      //    { name: "A RASHID", country: "ENG", stat: "4/10 vs PAK" },
      //  { name: "R AHMED", country: "ENG", stat: "3/0 vs PAK" },
      //    { name: "L WOOD", country: "ENG", stat: "3/0 vs WI" },
        
    ],
    bestbatting: [
      // { name: "G MAXWELL", country: "AUS", stat: "57 vs ENG" },
      // { name: "M RIZWAN", country: "PAK", stat: "41 vs SA" },
      // { name: "F ZAMAN", country: "PAK", stat: "40 vs IND" },
      //  { name: "H ALI", country: "PAK", stat: "41 vs BAN" },
      //   { name: "C LYNN", country: "AUS", stat: "37 vs IND" },
      //    { name: "I KAYES", country: "BAN", stat: "34 vs WI" },
      //     { name: "J ROY", country: "ENG", stat: "33 vs AUS" },
      //      { name: "MAHMUDULLAH", country: "BAN", stat: "30 vs SA" },
    ],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [battersRes, bowlersRes, allroundersRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/stats/top?type=Batsman`),
          fetch(`${import.meta.env.VITE_API_URL}/api/stats/top?type=Bowler`),
          fetch(`${import.meta.env.VITE_API_URL}/api/stats/top?type=Allrounder`),
        ]);

        const batters = await battersRes.json();
        const bowlers = await bowlersRes.json();
        const allrounders = await allroundersRes.json();

        setData({
          batters: batters.map((p) => ({
            name: p.playerName,
            country: p.team,
            stat: `Runs: ${p.runs}`,
          })),
          bowlers: bowlers.map((p) => ({
            name: p.playerName,
            country: p.team,
            stat: `Wickets: ${p.wickets}`,
          })),
          allrounders: allrounders.map((p) => ({
            name: p.playerName,
            country: p.team,
            stat: `Runs: ${p.runs}, Wkts: ${p.wickets}`,
          })),
          bestbowling: data.bestbowling,
          bestbatting: data.bestbatting,
        });
      } catch (err) {
        console.error("Error fetching player stats:", err);
      }
    };

    fetchStats();
  }, []);

  const isTopCategory =
    activeTab === "batters" || activeTab === "bowlers" || activeTab === "allrounders";

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white relative">
      {/* Background */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Red-cricket-ball.png"
        alt="Cricket Ball"
        className="absolute opacity-10 w-60 right-[-50px] bottom-[-50px] rotate-12 pointer-events-none"
      />
      <div className="min-h-[100px]"></div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 drop-shadow"
      >
        🏏 RC World Cup 2025 – Player Stats
      </motion.h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 
              ${
                activeTab === tab.key
                  ? "bg-yellow-400 text-gray-900 shadow-lg scale-105"
                  : "bg-white/10 text-yellow-200 border border-yellow-400 hover:bg-white/20"
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Player Cards */}
      {isTopCategory ? (
        <>
          {/* Top 3 in 3 columns */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {data[activeTab]?.slice(0, 3).map((player, index) => (
              <div
                key={index}
                className="backdrop-blur-md rounded-2xl border border-white/20 shadow-xl bg-white/10 p-6 hover:shadow-yellow-400/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-2xl text-yellow-300">
                    #{index + 1}
                  </span>
                  <span className="rounded-full text-sm px-3 py-1 bg-yellow-400 text-black">
                    {player.country}
                  </span>
                </div>
                <h2 className="font-semibold text-white text-xl">{player.name}</h2>
                <p className="mt-1 font-medium text-yellow-200 text-lg">
                  {player.stat}
                </p>
              </div>
            ))}
          </div>

          {/* Remaining cards in 4 columns */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {data[activeTab]?.slice(3).map((player, index) => (
              <div
                key={index + 3}
                className="backdrop-blur-md rounded-xl border border-white/20 shadow-lg bg-white/5 p-4 scale-95 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-lg text-yellow-200">
                    #{index + 4}
                  </span>
                  <span className="rounded-full text-xs px-2 py-0.5 bg-yellow-300/80 text-black">
                    {player.country}
                  </span>
                </div>
                <h2 className="font-semibold text-white text-base">{player.name}</h2>
                <p className="mt-1 font-medium text-yellow-200 text-sm">
                  {player.stat}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        // For non-top categories, show all in 4 columns
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {data[activeTab]?.map((player, index) => (
            <div
              key={index}
              className="backdrop-blur-md rounded-xl border border-white/20 shadow-lg bg-white/5 p-4 scale-95 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-lg text-yellow-200">
                  #{index + 1}
                </span>
                <span className="rounded-full text-xs px-2 py-0.5 bg-yellow-300/80 text-black">
                  {player.country}
                </span>
              </div>
              <h2 className="font-semibold text-white text-base">{player.name}</h2>
              <p className="mt-1 font-medium text-yellow-200 text-sm">
                {player.stat}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsPage;
