import { model, Schema } from 'mongoose';
import { Schema } from 'mongoose';


const usersSchema = new Schema(
    {
        name: { type: String, required: true, },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true, }
    },
    { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserCollection= model('users', usersSchema);
export default UsersCollection;