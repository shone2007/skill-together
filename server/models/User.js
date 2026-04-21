import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    skillsToTeach: {
        type: [String],
        default: [],
    },
    skillsToLearn: {
        type: [String],
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('User', userSchema);
