import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const SyncRuleSchema = new Schema({
  name: { type: String, required: true },
  source: { type: Types.ObjectId, ref: "Store", required: true },
  destination: { type: Types.ObjectId, ref: "Store"},
  SyncProducts: { type: Boolean, default: false },
  SyncInventory: { type: Boolean, default: false },
  SyncCollections: { type: Boolean, default: false },
  filter: {productType: [String], tags: [String], Collections: [String]},
  schedule: {
    type: {
      type: String, // "immediate" | "hourly" | "daily" | "custom-cron"
      default: "immediate"
    },
    cron: String, // optional custom CRON expression
    intervalMinutes: { type: Number, default: 60 }, // used for periodic jobs
  },
  isEnabled: { type: Boolean, default: true },
  nextRunAt: { type: Date, default: Date.now },
  lastRunAt: { type: Date },    
}, {
  timestamps: true,
});

const SyncRule = mongoose.models.SyncRule || mongoose.model("SyncRule", SyncRuleSchema);
export default SyncRule;