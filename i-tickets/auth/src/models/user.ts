import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { Password } from '../utils/password';

// An interface that describes the attributes that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An intreface that describes props that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An inteface that describes the properties that a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  generateAuthToken(): string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      // override method that transforms user doc into JSON
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs): UserDoc => {
  return new User(attrs);
};

// Add a document method to return JWT
userSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign(
    {
      id: this._id.toString(),
      email: this.email
    },
    process.env.JWT_KEY!,
    { expiresIn: '15min' }
  );

  return token;
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
