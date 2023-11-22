import { HttpStatusCode } from "axios";
import { isURL } from "class-validator";
import { NextFunction, Request, Response, response } from "express";

import * as E from "fp-ts/lib/Either"


export interface InAppCookie {
    name: string,
    value: string,
    keep?: boolean;
}

export interface RedirectData {
    link: string

}

export class SuccessResponseInterface<T> {
    message?: string
    result?: T
    timestamp!: string
    status?: HttpStatusCode
    cookie?: InAppCookie
    redirect?: RedirectData
}

export class ErrorResponseInterface {
    message!: string
    timestamp!: string
    status?: HttpStatusCode
    redirect?: RedirectData
}

export function SuccessResponse<T>({ message, result, status, cookie, redirect }: Partial<SuccessResponseInterface<T>>): SuccessResponseInterface<T> {
    return {
        message,
        result,
        timestamp: new Date().toISOString(),
        status, cookie, redirect
    }
}

export function ErrorResponse({ message, status, redirect }: { message: string, status?: HttpStatusCode, redirect?: RedirectData }): ErrorResponseInterface {
    return {
        message,
        timestamp: new Date().toISOString(),
        status,
        redirect
    }
}


export type PromiseErrorOrSuccess<T> = Promise<E.Either<ErrorResponseInterface, SuccessResponseInterface<T>>>

export function SendResponseOrError<T>({ value, res, next }: { value: PromiseErrorOrSuccess<T>, res: Response, next: NextFunction }) {
    value.then((result) => {
        if (E.isRight(result)) {
            if (result.right.cookie) {
                const { name, value, keep } = result.right.cookie;
                res.cookie(name, value, {
                    maxAge: 1000 * 60 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                })

                if (!keep) delete result.right.cookie
            }

            if (result.right.redirect) {
                const { link } = result.right.redirect

                const isUrl = isURL(link)
                if (isUrl) {
                    return res.redirect(link);

                } else {


                    next(ErrorResponse({
                        message: "The link provided was invalid",
                        status: HttpStatusCode.InternalServerError
                    }))
                }
            }

            return res.status(result.right.status || 200).json(result.right);

        }
        else {
            if (result.left.redirect) {
                const { link } = result.left.redirect
                return res.redirect(link)
            }

            next(result.left)
        }
    })
}

type SuccessOrErrorHandlerFunction<T> = (req: Request) => PromiseErrorOrSuccess<T>
type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any> | any


export function SuccessOrErrorHandler<T>(fn: SuccessOrErrorHandlerFunction<T>): RequestHandler {
    function handle(req: Request, res: Response, next: NextFunction) {
        const result = fn(req)
        result.then((result) => {
            if (E.isRight(result)) {
                if (result.right.cookie) {
                    const { name, value, keep } = result.right.cookie;
                    res.cookie(name, value, {
                        maxAge: 1000 * 60 * 60 * 60 * 24 * 30,
                        httpOnly: true,
                    })

                    if (!keep) delete result.right.cookie
                }

                if (result.right.redirect) {
                    const { link } = result.right.redirect

                    const isUrl = isURL(link)
                    if (isUrl) {
                        return res.redirect(link);

                    } else {


                        next(ErrorResponse({
                            message: "The link provided was invalid",
                            status: HttpStatusCode.InternalServerError
                        }))
                    }
                }

                return res.status(result.right.status || 200).json(result.right);

            }
            else {
                if (result.left.redirect) {
                    const { link } = result.left.redirect
                    return res.redirect(link)
                }

                next(result.left)
            }
        })

    }
    return handle;
} 