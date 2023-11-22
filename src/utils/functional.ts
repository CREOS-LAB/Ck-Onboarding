import { ErrorResponse, PromiseErrorOrSuccess, SuccessResponse } from "../response";
import * as E from "fp-ts/Either"

type TryFunction<T> = () => Promise<T>

export async function Try<T>(fn: TryFunction<T>, messsages?: { error?: string, success?: string }): PromiseErrorOrSuccess<T> {
    try {
        const result: T = await fn()
        return E.right(SuccessResponse({
            result: result,
            message: messsages?.success || "Successful"
        }))
    }
    catch (e: any) {
        return E.left(ErrorResponse({
            message: e.message || messsages?.error || "Error",
            status: 500
        }))
    }
}

