import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface UserMessage extends Document {
  userId: Types.ObjectId; 
  isAcceptingMessages: boolean;
  messages: Message[];
}

// Updated User schema
const UserMessageSchema: Schema<UserMessage> = new mongoose.Schema({
  userId: { 
    type: Types.ObjectId,
    ref: 'user',
    required: true,
    index: true,
    
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true
  },
  messages: [MessageSchema],
});

const UserMessageModel =
  (mongoose.models.UserMessage as mongoose.Model<UserMessage>) ||
  mongoose.model<UserMessage>('UserMessage', UserMessageSchema);

export default UserMessageModel;


// Better Auth Tables - User, Account, verification, Session, UserMessage 