import mongoose from 'mongoose';

export interface ISignup extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId,
  event: mongoose.Schema.Types.ObjectId,
  date: Date
}

const SignupSchema = new mongoose.Schema<ISignup>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Signup = mongoose.models.Signup || mongoose.model<ISignup>('Signup', SignupSchema);

export default Signup;
