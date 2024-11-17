const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Make sure both sender and recipient are required
    },
    messageType: {
        type: String,
        enum: ["text", "file"],
        required: true,
    },
    content: {
        type: String,
        required: function() {
            return this.messageType === "text";
        },
    },
    fileUrl: {
        type: String,
        required: function() {
            return this.messageType === "file";
        },
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

// Ensure consistency with model export
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
