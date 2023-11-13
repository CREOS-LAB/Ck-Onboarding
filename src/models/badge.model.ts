import { prop, getModelForClass } from "@typegoose/typegoose";

class Badges {
  @prop({ required: false })
  cover?: string;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  numberOfVideos!: string;

  @prop({ required: true })
  numberOfGems!: string;

  @prop({ default: false })
  public?: boolean;

  @prop({ required: true })
  minAge!: number;

  @prop({ required: true })
  maxAge!: number;

}

const BadgesModel = getModelForClass(Badges);

export default BadgesModel;
