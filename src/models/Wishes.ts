import mongoose from 'mongoose';

const Wishes = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'name is required!']
    },
    wish: {
      type: String,
      require: [true, 'wish is required!']
    },
    createdBy: {
      type: String,
      require: [true, 'createdBy is required!']
    },
    invitationBy: {
      type: String,
      require: [true, 'invitationBy is required!']
    }
  },
  { timestamps: true }
);

export default mongoose.models.Wishes || mongoose.model('Wishes', Wishes);
