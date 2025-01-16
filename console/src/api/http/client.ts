/**
 * HttpClient is a custom wrapper around fetch api.
 * Exposes get, post and delete methods for JSON.
 */
export class HttpClient {
    /**
   * Performs POST http request with JSON body.
   * @param path
   * @param body serialized JSON
   */
    public async post(
        path: string,
        body?: string | FormData,
        token?: string,
    ): Promise<Response> {
        return await this.do('POST', path, body, token);
    }

    /**
   * Performs PATCH http request with JSON body.
   * @param path
   * @param body serialized JSON
   */
    public async patch(
        path: string,
        body?: string,
        token?: string,
    ): Promise<Response> {
        return await this.do('PATCH', path, body, token);
    }

    /**
   * Performs PUT http request with JSON body.
   * @param path
   * @param body serialized JSON
    */
    public async put(
        path: string,
        body?: string | FormData,
        token?: string,
    ): Promise<Response> {
        return await this.do('PUT', path, body, token);
    }

    /**
     * Performs GET http request.
     * @param path
     * @param body serialized JSON
    */
    public async get(
        path: string,
        body?: string,
        token?: string,
    ): Promise<Response> {
        return await this.do('GET', path, body, token);
    }

    /**
     * Performs DELETE http request.
     * @param path
     * @param body serialized JSON    headers?: HeadersInit,

    */
    public async delete(
        path: string,
        body?: string,
        token?: string,
    ): Promise<Response> {
        return await this.do('DELETE', path, body, token);
    }

    /**
   * do sends an HTTP request and returns an HTTP response as configured on the client.
   * @param method holds http method type
   * @param path
   * @param body serialized JSON
   */
    private async do(
        method: string,
        path: string,
        body?: string | FormData,
        token?: string,
    ): Promise<Response> {
        const request: RequestInit = {
            method,
        };

        if (body) {
            request.body = body;
        };

        /**
         * The browser automaticaly able to set the Content-Type header with the boundary expression
         * it will use to delimit form fields in the request body.
         * */
        request.headers = {
            'Content-Type': 'application/json',
        };

        console.log('token: ', token);

        if (token) {
            request.headers = {
                ...request.headers,
                'Authorization': `Bearer ${token}`,
            }
        };

        return await fetch(path, request);
    }
}
