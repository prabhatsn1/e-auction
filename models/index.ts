import { Schema, model, models, Document } from "mongoose";

// User Model
interface IUser extends Document {
  email: string;
  password: string;
  role: "ADMIN" | "SELLER" | "BIDDER";
  profile: {
    name: string;
    avatar?: string;
    address: string;
    phone?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "SELLER", "BIDDER"], required: true },
    profile: {
      name: { type: String, required: true },
      avatar: String,
      address: { type: String, required: true },
      phone: String,
    },
  },
  { timestamps: true }
);

// Auction Model
interface IAuction extends Document {
  title: string;
  description: string;
  sellerId: Schema.Types.ObjectId;
  startingPrice: number;
  reservePrice?: number;
  currentPrice: number;
  startTime: Date;
  endTime: Date;
  status: "DRAFT" | "SCHEDULED" | "ACTIVE" | "ENDED" | "CANCELLED";
  images: string[];
  category: string[];
}

const auctionSchema = new Schema<IAuction>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startingPrice: { type: Number, required: true },
    reservePrice: Number,
    currentPrice: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["DRAFT", "SCHEDULED", "ACTIVE", "ENDED", "CANCELLED"],
      required: true,
    },
    images: [String],
    category: [String],
  },
  { timestamps: true }
);

// Bid Model
interface IBid extends Document {
  auctionId: Schema.Types.ObjectId;
  bidderId: Schema.Types.ObjectId;
  amount: number;
  maxAmount?: number;
  status: "ACTIVE" | "OUTBID" | "WINNING";
}

const bidSchema = new Schema<IBid>(
  {
    auctionId: { type: Schema.Types.ObjectId, ref: "Auction", required: true },
    bidderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    maxAmount: Number,
    status: {
      type: String,
      enum: ["ACTIVE", "OUTBID", "WINNING"],
      required: true,
    },
  },
  { timestamps: true }
);

// Export models
export const User = models.User || model<IUser>("User", userSchema);
export const Auction =
  models.Auction || model<IAuction>("Auction", auctionSchema);
export const Bid = models.Bid || model<IBid>("Bid", bidSchema);
