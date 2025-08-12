import Super4Points from "../models/Super4.js"

// 📌 GET Super 4 Points Table
export const getSuper4Points= async (req, res) => {
  try {
    const table = await Super4Points.find().sort({ points: -1, netRunRate: -1 });
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Super 4 points", error });
  }
};

// 📌 UPDATE/ADD Super 4 Points
export const updateSuper4Points = async (req, res) => {
  try {
    const { teamName, matches, wins, losses, ties, points, netRunRate } = req.body;

    let team = await Super4Points.findOne({ teamName });

    if (team) {
      // Update existing team
      team.matches = matches;
      team.wins = wins;
      team.losses = losses;
      team.ties = ties;
      team.points = points;
      team.netRunRate = netRunRate;
      await team.save();
    } else {
      // Create new team
      team = new Super4Points({
        teamName, matches, wins, losses, ties, points, netRunRate
      });
      await team.save();
    }

    res.status(200).json({ message: "Super 4 points updated successfully", team });
  } catch (error) {
    res.status(500).json({ message: "Error updating Super 4 points", error });
  }
};
