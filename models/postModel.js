const mongooose = require("mongoose");

const postSchema = new mongooose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    admin: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooose.model("Post", postSchema);
