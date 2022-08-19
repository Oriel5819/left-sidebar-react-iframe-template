import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    icon: { type: String, required: true, trim: true, default: "icons.info" },
    rank: { type: Number, required: true, trim: true, unique: true },
    link: { type: String, required: true, trim: true, unique: true },
    port: { type: String, required: true, trim: true, unique: true },
    submenus: [{ type: Object }],
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menus", MenuSchema);

export default Menu;
