import mongoose from 'mongoose';

const Rsvp = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'name is required!']
    },
    isAttend: {
      type: Boolean,
      require: [true, 'isAttend is required!']
    },
    session: {
      type: Number,
      default: null
    },
    invitationBy: {
      type: String,
      require: [true, 'invitationBy is required!']
    }
  },
  { timestamps: true }
);

export default mongoose.models.Rsvp || mongoose.model('Rsvp', Rsvp);
