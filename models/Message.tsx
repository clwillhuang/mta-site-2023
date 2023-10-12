import { Document, Schema, model, models } from 'mongoose';

export interface IMessage extends Document {
  email: string;
  message: string;
  sentTime: Date;
  senderName: string;
  subjectLine: string;
}

const messageSchema = new Schema<IMessage>({
  email: { type: String, required: true },
  message: { type: String, required: true },
  sentTime: { type: Date, default: Date.now },
  senderName: { type: String, required: true },
  subjectLine: { type: String, required: true },
});

const Message = models.Message || model<IMessage>('Message', messageSchema);

export { Message };
