import mongoose from "mongoose";

const SubmenuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    id: { type: String, required: true, trim: true, default: "#id" },
    icon: { type: String, trim: true, default: "icons.icon" },
    rank: { type: Number, trim: true, unique: true },
    link: { type: String, required: true, trim: true, unique: true },
    parent: { type: mongoose.Types.ObjectId, ref: `Menus` },
  },
  { timestamps: true }
);
const Submenu = mongoose.model("Submenus", SubmenuSchema);

export default Submenu;
