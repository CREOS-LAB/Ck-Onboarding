// validateAndSanitize.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { sanitizeAsync } from 'class-sanitizer';

export const useValidateAndSanitize = (classType: new (...args: any[]) => any, groups?: Array<string>) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const transformedInput = plainToClass(classType, request.body);
        // First validate the input
        const validationErrors = await validate(transformedInput, { groups });
        if (validationErrors.length > 0) {
            response.status(400).json({
                message: "The data you inputted was invalid",
                errors: validationErrors
            });
        } else {
            // If validation passed, then sanitize the input
            const sanitizedInput = await sanitizeAsync(transformedInput);
            request.body = sanitizedInput;
            next();
        }
    };
};