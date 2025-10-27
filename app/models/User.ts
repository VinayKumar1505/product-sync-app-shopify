import { Document  Schema, model} from 'mongoose';

export interface User extends Document {
  email: string;
  masterKey: string;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  masterKey: { type: String, required: true },
});

export default model<User>('User', userSchema);


