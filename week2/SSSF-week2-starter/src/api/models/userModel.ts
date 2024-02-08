// TODO: mongoose schema for user
// with this snippet from src/api/models/userModel.ts:
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, required: true, default: 'user'},
  password: {type: String, required: true},
});

export default mongoose.model('User', userSchema);
