// sanitize.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { sanitize } from 'class-sanitizer';
import { plainToClass } from 'class-transformer';

export const useSanitizer = (classType: new (...args: any[]) => any) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const sanitizedBody = sanitize(plainToClass(classType, request.body));
        request.body = sanitizedBody;
        next();
    };
};
