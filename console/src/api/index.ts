import { HttpClient } from "@/api/http/client";
import { StorageKeys, getSessionStorageItem } from "@/app/utils/storage";

/*
**
 * ErrorUnauthorized is a custom error type which indicates that the client request has not been
 * completed because it lacks valid authentication credentials for the requested resource.
 */
export class UnauthorizedError extends Error {
    /** Error message while unauthorized. */
    public constructor(message = 'Unauthorized') {
        super(message);
    }
}
/**
 * BadRequestError is a custom error type which indicates that the server cannot or
 * will not process the request due to something that is perceived to be a client error.
 */
export class BadRequestError extends Error {
    /** Error message while bad request */
    public constructor(message = 'bad request') {
        super(message);
    }
}
/**
 * ForbiddenError is a custom error type which indicates that the resource is not allowed.
 */
export class ForbiddenError extends Error {
    /** Error message while resource is not allowed */
    public constructor(message = 'not allowed') {
        super(message);
    }
}
/**
 * NotFoundError is a custom error type which indicates that the server can't find the requested resource.
 */
export class NotFoundError extends Error {
    /** Error message while not found request */
    public constructor(message = 'not found') {
        super(message);
    }
}

/**
 * InternalError is a custom error type which indicates that the server encountered an unexpected condition
 * that prevented it from fulfilling the request.
 */
export class InternalError extends Error {
    /** Error message for internal server error */
    public constructor(message = 'internal server error') {
        super(message);
    }
};

/**
 * InternalError is a custom error type which indicates that to many requests provided.
 */
export class TooManyRequestsError extends Error {
    /** Error message for too many reqeuests error */
    public constructor(message = 'too many requests') {
        super(message);
    }
}


export const BAD_REQUEST_ERROR = 400;
export const UNAUTHORISED_ERROR = 401;
export const FORBIDDEN_ERROR = 403;
export const NOT_FOUND_ERROR = 404;
export const TOO_MANY_REQUESTS_ERROR = 429;
export const INTERNAL_ERROR = 500;

/**
 * APIClient is base client that holds http client and error handler.
 */
export class APIClient {
    protected readonly http: HttpClient = new HttpClient();
    protected readonly ROOT_PATH = `${import.meta.env.VITE_API_URL}`;

    public get token() {
        return getSessionStorageItem(StorageKeys.TOKEN) || '';
    };

    /**
         * handles error due to response code.
         * @param response - response from server.
         *
         * @throws {@link NotFoundError}
         * This exception is thrown if the input is not a valid ISBN number.
         *
         * @throws {@link UnauthorizedError}
         * Thrown if the ISBN number is valid, but no such book exists in the catalog.
         *
         * @throws {@link InternalError}
         * Thrown if the ISBN number is valid, but no such book exists in the catalog.
         *
         * @private
         */
    protected async handleError(response: Response): Promise<void> {
        switch (response.status) {
            case BAD_REQUEST_ERROR:
                throw new BadRequestError();
            case FORBIDDEN_ERROR:
                throw new ForbiddenError();
            case NOT_FOUND_ERROR:
                throw new NotFoundError();
            case UNAUTHORISED_ERROR: {
                throw new UnauthorizedError();
            }
            case TOO_MANY_REQUESTS_ERROR: {
                throw new TooManyRequestsError();
            }
            case INTERNAL_ERROR:
            default:
                throw new InternalError();
        }
    }
};
