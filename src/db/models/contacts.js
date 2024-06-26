import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
        },
    email: {
        type: String,
      required: false,
        unique: true,
        },
    isFavourite: {
        type: Boolean,
        required: false,
        default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    contactType: {
      type: String,
      required: false,
        enum: ["work", "home", "personal"],
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);