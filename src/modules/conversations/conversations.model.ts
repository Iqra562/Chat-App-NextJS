import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      validate: [
        (arr:any) => arr.length === 2,
        "Conversation must have exactly 2 members",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Conversation || mongoose.model("Conversation",ConversationSchema  )