// models/Store.ts
import { Schema, model, Document, Types } from "mongoose";
import { randomUUID } from "crypto";

export interface IStore extends Document {
  user: Types.ObjectId;
  shop: string;
  accessToken: string;
  scope: string;
  installedAt: Date;
  isMaster: boolean;
  masterStoreId?: string; // for dependent stores
  masterKey?: string; // for master store
  dependentStores: string[]; // array of shop domains for quick view
}

const storeSchema = new Schema<IStore>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  shop: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  scope: String,
  installedAt: { type: Date, default: Date.now },
  isMaster: { type: Boolean, default: false },
  masterStoreId: String,
  masterKey: String,
  dependentStores: [String],
});

// Automatically generate a masterKey for new masters
storeSchema.pre("save", function (next) {
  if (this.isMaster && !this.masterKey) {
    this.masterKey = randomUUID();
  }
  next();
});

export default model<IStore>("Store", storeSchema);
