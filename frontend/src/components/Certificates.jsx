import React from "react";

import Champion from "./champion";
import Runnerup from "./Runnerup";
import Playert from "./Playert";
import Batter from "./batter";
import Bowler from "./Bowler";
import Allrounder from "./Allrounder";
import Battingteam from "./Battingteam";
import Bowlingteam from "./Bowlingteam";
import Allrounderteam from "./Allrounderteam";
import Battingstat from "./Battingstat";
import Bowlingstat from "./Bowlingstat";
const Certificates = () => {
  return (
    <div className="flex flex-col items-center gap-16 p-10">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-yellow-300 uppercase tracking-widest drop-shadow-lg">
        Real Cricket World Cup 2025 – Tournament Certificates
      </h1>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Pass the appropriate props for each certificate */}
        <Champion playerName="MUNEER AHMED" teamName="NEW-ZEALAND" />
        <Runnerup playerName="KHAIRUL " teamName="BANGLADESH" />
        <Playert playerName="R RAVINDRA" teamName="NZ" />
        <Batter playerName="R RAVINDRA" teamName="NZ" />
        <Bowler playerName="ADIL RASHID" teamName="ENG" />
        <Allrounder playerName="R ASHWIN" teamName="INDIA" />
        <Bowlingteam teamName="BILAL SHAHID" playerName="ENGLAND" />
        <Battingteam teamName="BILAL SHAHID" playerName="ENGLAND" />
        <Allrounderteam teamName="NEW-ZEALAND" />
        <Battingstat playerName="G MAXWELL" teamName="AUSTRALIA" />
        <Bowlingstat playerName="M MONDOL" teamName="BANGLADESH" />
      
      </div>
    </div>
  );
};

export default Certificates;
