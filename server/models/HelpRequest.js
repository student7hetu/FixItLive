import mongoose from 'mongoose';

const helpRequestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    duration: { type: Number }, // in minutes
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['open', 'accepted', 'closed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);
export default HelpRequest;
