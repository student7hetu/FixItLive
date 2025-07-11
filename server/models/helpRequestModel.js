import mongoose from 'mongoose';

const helpRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['bug', 'feature', 'concept', 'other'],
    default: 'bug',
  },
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
  },
 status: {
  type: String,
  enum: ['open', 'in-progress', 'closed'], // ✅ now valid
  default: 'open',
},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, { timestamps: true });

const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);

export default HelpRequest;
