import mongoose from "mongoose";

const Super4PointsSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  matches: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  ties: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  netRunRate: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Super4Points", Super4PointsSchema);
