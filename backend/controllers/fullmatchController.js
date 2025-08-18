import Match from '../models/Match.js';
import PlayerStats from '../models/PlayerStats.js';
import PointsTable from '../models/PointsTable.js';
import Schedule from '../models/Schedule.js';
import Super4Points from '../models/Super4.js';
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const submitFullMatch = async (req, res) => {
  try {
    console.log('📥 Incoming Request Body:', req.body);
    console.log('📸 Screenshot:', req.file);

    const {
      teamA,
      teamB,
      teamAScore,
      teamBScore,
      teamAOvers,
      teamBOvers,
      winner,
      result,
      playerOfTheMatch,
      date,
    } = req.body;

    const screenshot = req.file;

    const bestBatters = JSON.parse(req.body.bestBatters || '[]');
    const bestBowlers = JSON.parse(req.body.bestBowlers || '[]');
    const bestAllrounders = JSON.parse(req.body.bestAllrounders || '[]');

    // 1️⃣ Save match
    const match = new Match({
      teamA,
      teamB,
      teamAScore: `${teamAScore} (${teamAOvers} ov)`,
      teamBScore: `${teamBScore} (${teamBOvers} ov)`,
      winner,
      playerOfTheMatch,
      screenshots: screenshot ? [screenshot.originalname] : [],
      result,
      date: new Date(date)
    });
    await match.save();

    // 2️⃣ Save player stats
    const updatePlayers = async (players, role) => {
      for (let p of players) {
        if (!p.name) continue;
        await PlayerStats.findOneAndUpdate(
          { playerName: p.name, role },
          {
            playerName: p.name,
            team: p.team || null,
            role,
            $inc: {
              runs: Number(p.runs) || 0,
              wickets: Number(p.wickets) || 0,
              runsGiven: Number(p.runsGiven) || 0
            }
          },
          { upsert: true, new: true }
        );
      }
    };

    await updatePlayers(bestBatters, "Batsman");
    await updatePlayers(bestBowlers, "Bowler");
    await updatePlayers(bestAllrounders, "Allrounder");

    // 3️⃣ Run rate calculation
    const calculateRunRateDiff = (runsFor, oversFor, runsAgainst, oversAgainst) => {
      const rrFor = runsFor / oversFor;
      const rrAgainst = runsAgainst / oversAgainst;
      return rrFor - rrAgainst;
    };

    // 4️⃣ Update points table (league stage)
// 4️⃣ Update points table (league stage)
const updateTeamPoints = async (model, teamName, isWinner, isTie, rrDiff) => {
  try {
    const existing = await model.findOne({ teamName });

    // Always use consistent field names
    const updated = {
      matches: (existing?.matches || 0) + 1,
      win: (existing?.win || 0) + (isWinner ? 1 : 0),
      loss: (existing?.loss || 0) + (!isWinner && !isTie ? 1 : 0),
      tie: (existing?.tie || 0) + (isTie ? 1 : 0),
      points: (existing?.points || 0) + (isWinner ? 2 : isTie ? 1 : 0),
      runRate: parseFloat(((existing?.runRate || 0) + rrDiff).toFixed(3)), // keep decimals clean
    };

    await model.findOneAndUpdate(
      { teamName },
      { $set: updated },   // replace only with our consistent structure
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Error updating team points:", error);
  }
};

    const isTie = winner?.toLowerCase() === 'tie';

    const rrDiffTeamA = calculateRunRateDiff(
      parseInt(teamAScore),
      parseFloat(teamAOvers),
      parseInt(teamBScore),
      parseFloat(teamBOvers)
    );

    const rrDiffTeamB = calculateRunRateDiff(
      parseInt(teamBScore),
      parseFloat(teamBOvers),
      parseInt(teamAScore),
      parseFloat(teamAOvers)
    );

    if (isTie) {
      await updateTeamPoints(PointsTable, teamA, false, true, 0);
      await updateTeamPoints(PointsTable, teamB, false, true, 0);

      // // Super 4 table tie update
      // await updateTeamPoints(Super4Points, teamA, false, true, 0);
      // await updateTeamPoints(Super4Points, teamB, false, true, 0);
    } else {
      if (teamA === winner) {
        await updateTeamPoints(PointsTable, teamA, true, false, rrDiffTeamA);
        await updateTeamPoints(PointsTable, teamB, false, false, rrDiffTeamB);

        // // Super 4 table
        // await updateTeamPoints(Super4Points, teamA, true, false, rrDiffTeamA);
        // await updateTeamPoints(Super4Points, teamB, false, false, rrDiffTeamB);
      } else {
        await updateTeamPoints(PointsTable, teamA, false, false, rrDiffTeamA);
        await updateTeamPoints(PointsTable, teamB, true, false, rrDiffTeamB);

        // // Super 4 table
        // await updateTeamPoints(Super4Points, teamA, false, false, rrDiffTeamA);
        // await updateTeamPoints(Super4Points, teamB, true, false, rrDiffTeamB);
      }
    }

    // 5️⃣ Mark schedule completed
    await Schedule.findOneAndUpdate({ match: match._id }, { status: 'Completed' });

    res.status(201).json({ msg: 'Match recorded successfully (Points + Super 4 updated).' });
  } catch (err) {
    console.error('❌ Match Submission Error:', err);
    res.status(500).json({ error: err.message });
  }
};
