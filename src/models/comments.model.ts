import { prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { Video } from "./videos.model";
import { Student } from "./students.model";



class Comments {
  @prop({ ref: () => Video })
  video?: Ref<Video>;

  @prop({ ref: () => Student })
  student?: Ref<Student>;

  @prop()
  content?: string;

  // Timestamps will be added automatically by Typegoose
}

const CommentsModel = getModelForClass(Comments);

export { CommentsModel };
