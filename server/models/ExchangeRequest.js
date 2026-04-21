import mongoose from 'mongoose';

const exchangeRequestSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    skillOffered: {
        type: String,
        required: true,
    },
    skillRequested: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('ExchangeRequest', exchangeRequestSchema);
