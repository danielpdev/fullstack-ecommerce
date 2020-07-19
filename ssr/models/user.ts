import * as mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {
    type: String, required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  passwordResetKey: String,
  passwordKeyExpires: Number,
  createdAt: {
    type: Date,
    required: false
  },
  updatedAt: {
    type: Number,
    required: false
  }
}, { runSettersOnQuery: true });

userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase();
  const currentDate = new Date().getTime();
  this.updatedAt = currentDate;

  if (!this.created_at) {
    this.createdAt = currentDate;
  }
  next();
});

export default mongoose.model("User", userSchema);
