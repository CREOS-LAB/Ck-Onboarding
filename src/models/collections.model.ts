import { prop, getModelForClass } from '@typegoose/typegoose';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import mongoose from 'mongoose';
import { Class, ClassModel } from './classes.model';

export class Collection {
    @IsString()
    @prop({ required: true })
    title?: string;

    @IsString()
    @prop({ required: true })
    description?: string;

    @IsString()
    @prop({ required: true })
    cover?: string;

    @IsOptional()
    @prop({ ref: () => ClassModel })
    class?: string;

    @IsOptional()
    @IsString()
    @prop()
    category?: string;

    @IsNumber()
    @prop({ required: true })
    maxAge?: number;

    @IsNumber()
    @prop({ required: true })
    minAge?: number;


    constructor(v: Partial<Collection>) {
        if (v) {
            Object.assign(this, v)
        }
    }
}

export const CollectionModel = getModelForClass(Collection, {
    schemaOptions: {
        timestamps: true,

    }
});


