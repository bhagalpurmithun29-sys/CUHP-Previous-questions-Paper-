import mongoose, { Schema, Document } from 'mongoose';

export interface IPaperMetadataHistory extends Document {
  paperId: mongoose.Types.ObjectId;
  editorId: mongoose.Types.ObjectId;
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  timestamp: Date;
}

const paperMetadataHistorySchema = new Schema<IPaperMetadataHistory>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'Paper', required: true, index: true },
    editorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    changes: [{
      field: { type: String, required: true },
      oldValue: { type: Schema.Types.Mixed },
      newValue: { type: Schema.Types.Mixed }
    }],
    timestamp: { type: Date, default: Date.now }
  }
);

export const PaperMetadataHistory = mongoose.model<IPaperMetadataHistory>('PaperMetadataHistory', paperMetadataHistorySchema);
