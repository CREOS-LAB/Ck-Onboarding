import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const useValidator = (classType: new (...args: any[]) => any) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const input = plainToClass(classType, request.body);
        validate(input).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                response.status(400).json({ errors });
            } else {
                request.body = input;
                next();
            }
        });
    };
};
