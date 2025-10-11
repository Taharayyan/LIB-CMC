import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Bookmark = sequelize.define(
  "Bookmark",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    book_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "books",
        key: "id",
      },
    },
    page_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "bookmarks",
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "book_id"],
      },
    ],
  }
);

export default Bookmark;
