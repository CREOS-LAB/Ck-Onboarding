import { prop, getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Class {
    @prop()
    name?: string;

    @prop({ ref: () => 'School' }) // Reference to the "School" model
    school?: mongoose.Types.ObjectId;

    constructor(v: Partial<Class>) {
        if (v) {
            Object.assign(this, v)
        }
    }
}

export const ClassModel = getModelForClass(Class, {
    schemaOptions: {
    }
});
