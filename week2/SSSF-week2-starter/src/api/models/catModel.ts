// TODO: mongoose schema for cat
import mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  cat_name: {type: String, required: true},
  weight: {type: Number, required: true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  filename: {type: String, required: true},
  birthdate: {type: Date, required: true},
  location: {
    type: {type: String, enum: ['Point'], required: true},
    coordinates: {type: [Number], required: true},
  },
});

export default mongoose.model('Cat', catSchema);