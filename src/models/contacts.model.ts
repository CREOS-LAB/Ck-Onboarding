import { prop, getModelForClass } from "@typegoose/typegoose";

export class Contact {
  @prop()
  firstName?: string;

  @prop()
  lastName?: string;

  @prop()
  email?: string;

  @prop()
  message?: string;
}

export const ContactModel = getModelForClass(Contact);


