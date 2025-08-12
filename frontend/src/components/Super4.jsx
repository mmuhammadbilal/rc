import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

const countryCodes = {
  INDIA: "IN",
  AUSTRALIA: "AU",
  PAKISTAN: "PK",
  ENGLAND: "GB",
  NEWZELAND: "NZ",
  SOUTHAFRICA: "ZA",
  BANGLADESH: "BD",
  WESTINDIES: "JM",
};

const rankEmojis = ["🥇", "🥈", "🥉"];
const FixtureBox = ({ title, team1, team2, highlight, winner }) => (
  <motion.div
    whileHover={{ scale: 1.06 }}
    transition={{ type: "spring", stiffness: 220, damping: 15 }}
    className={`relative w-72 rounded-2xl p-5 border-2 shadow-lg overflow-hidden
      ${highlight 
        ? "from-yellow-500/40 via-yellow-400/20 to-yellow-500/30 border-yellow-300" 
        : "from-[#1a1033] via-[#2a1a44] to-[#0b0f2b] border-yellow-500/50"
      }
      bg-gradient-to-br`}
  >
    {/* Title */}
    <h3 className={`text-lg font-bold text-center mb-4 tracking-wider uppercase
      ${highlight ? "text-yellow-200" : "text-yellow-300"}`}>
      {title}
    </h3>

    {/* Teams */}
    <div className="flex items-center justify-between relative">
      {/* Team 1 */}
      <div className="flex flex-col items-center gap-2 w-24">
        <div className="w-20 h-12 flex items-center justify-center border-2 border-yellow-400 bg-[#0b0f2b] rounded-lg shadow-md">
          <span className="text-sm text-white font-semibold text-center">{team1.name}</span>
        </div>
      </div>

      {/* VS Divider */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-yellow-400 text-2xl font-extrabold drop-shadow-lg">VS</span>
        <div className="w-[2px] h-8 bg-yellow-400/30"></div>
      </div>

      {/* Team 2 */}
      <div className="flex flex-col items-center gap-2 w-24">
        <div className="w-20 h-12 flex items-center justify-center border-2 border-yellow-400 bg-[#0b0f2b] rounded-lg shadow-md">
          <span className="text-sm text-white font-semibold text-center">{team2.name}</span>
        </div>
      </div>
    </div>

    {/* Winner Pending */}
    <div className="mt-4 text-center">
      {winner ? (
        <span className="px-4 py-1 text-sm font-bold text-black bg-yellow-400 rounded-full">
          Winner: {winner}
        </span>
      ) : (
        <span className="px-4 py-1 text-sm font-bold text-yellow-300 border border-yellow-300/40 rounded-full">
          Winner: TBD
        </span>
      )}
    </div>

    {/* Glow Effect */}
    <motion.div
      animate={{ x: ["-150%", "150%"] }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      className="absolute top-0 left-0 w-full h-full pointer-events-none 
        bg-gradient-to-r from-transparent via-white/10 to-transparent"
    />
  </motion.div>
);


const Super4PointsTable = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/points/super4`
        );
        setPoints(res.data);
      } catch (err) {
        console.error("Error fetching Super 4 points:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
  }, []);

  if (loading)
    return (
      <div className="text-center p-4 text-lg font-bold text-yellow-300 animate-pulse">
        Loading Royal Table...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto mt-10 space-y-12"
    >
      {/* Fixture Chart */}
<div className="flex flex-col items-center space-y-8">
  <div className="flex justify-center gap-20 flex-wrap relative">
    {/* Qualifier 1 */}
    <FixtureBox 
      title="Qualifier 1" 
      team1={{ name: "BAN" }} 
      team2={{ name: "NZ" }} 
      winner={{ name: "NZ" }} 
    />

    {/* Eliminator 1 */}
    <FixtureBox 
      title="Eliminator 1" 
      team1={{ name: "ENG" }} 
      team2={{ name: "AUS" }} 
    />

    {/* Eliminator 2 */}
    <FixtureBox
      title="Eliminator 2"
      team1={{ name: "BAN" }}
      team2={{ name: "Eliminator 1 Winner" }}
    />
  </div>

  {/* Final */}
  <FixtureBox
    title="🏆 Final"
    team1={{ name: "TBD" }}
    team2={{ name: "TBD" }}
    highlight
  />
</div>


      {/* Points Table */}
      <div className="p-[2px] rounded-3xl bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 shadow-[0_0_50px_rgba(255,215,0,0.5)]">
        <div className="rounded-3xl backdrop-blur-xl bg-gradient-to-br from-[#0b0f2b]/95 via-[#1a1033]/95 to-[#0a0a0a]/95 border border-yellow-500/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a1033] via-[#332255] to-[#0b0f2b] py-5 text-center border-b border-yellow-500/40 relative">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-[0_0_20px_gold] tracking-widest uppercase">
              👑 Super 4 Points Table
            </h2>
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-white font-medium">
              <thead className="bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-transparent text-yellow-300 uppercase">
                <tr>
                  <th className="p-4 border border-yellow-400/30">#</th>
                  <th className="p-4 border border-yellow-400/30 text-left">
                    Team
                  </th>
                  <th className="p-4 border border-yellow-400/30">Matches</th>
                  <th className="p-4 border border-yellow-400/30">Won</th>
                  <th className="p-4 border border-yellow-400/30">Lost</th>
                  <th className="p-4 border border-yellow-400/30">NRR</th>
                  <th className="p-4 border border-yellow-400/30">Points</th>
                </tr>
              </thead>
              <tbody>
                {points.length > 0 ? (
                  points.map((team, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.01,
                        backgroundColor: "rgba(255,215,0,0.08)",
                      }}
                      className="transition-all"
                    >
                      <td className="p-4 border border-yellow-400/20 text-center text-yellow-300 font-bold text-lg">
                        {rankEmojis[index] || index + 1}
                      </td>
                      <td
                        className="p-4 border border-yellow-400/20 flex items-center gap-3 cursor-pointer"
                        data-tooltip-id={`tooltip-${index}`}
                      >
                        <img
                          src={`https://flagsapi.com/${
                            countryCodes[team.teamName] || "UN"
                          }/flat/32.png`}
                          alt={team.teamName}
                          className="w-8 h-8 rounded-full border border-yellow-400 shadow-md"
                        />
                        <span className="font-semibold">{team.teamName}</span>
                        <Tooltip
                          id={`tooltip-${index}`}
                          place="right"
                          content={`Wins: ${team.wins}, Losses: ${team.losses}`}
                        />
                      </td>
                      <td className="p-4 border border-yellow-400/20 text-center">
                        {team.matches}
                      </td>
                      <td className="p-4 border border-yellow-400/20 text-center text-green-400 font-bold">
                        {team.wins}
                      </td>
                      <td className="p-4 border border-yellow-400/20 text-center text-red-400 font-bold">
                        {team.losses}
                      </td>
                      <td className="p-4 border border-yellow-400/20 text-center">
                        {parseFloat(team.netRunRate).toFixed(2)}
                      </td>
                      <td className="p-4 border border-yellow-400/20 text-center text-yellow-400 font-extrabold">
                        {team.points}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center p-6 font-bold text-yellow-400"
                    >
                      No Super 4 data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Super4PointsTable;
