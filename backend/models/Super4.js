import mongoose from "mongoose";

const Super4PointsSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  matches: { type: Number, default: 0 },
  win: { type: Number, default: 0 },      // not wins
  loss: { type: Number, default: 0 },     // not losses
  tie: { type: Number, default: 0 },      // not ties
  points: { type: Number, default: 0 },
  runRate: { type: Number, default: 0 }   // not netRunRate
}, { timestamps: true });

export default mongoose.model("Super4Points", Super4PointsSchema);
