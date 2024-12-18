import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  image:{type:Buffer},
  role: { type: String, 
    enum: ['admin', 'user'],

    default: 'user' }
});

const User = mongoose.model('User', UserSchema);

export default User;