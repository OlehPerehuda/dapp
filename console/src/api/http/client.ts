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
    ): Promise<Response> {
        return await this.do('POST', path, body);
    }

    /**
   * Performs PATCH http request with JSON body.
   * @param path
   * @param body serialized JSON
   */
    public async patch(
        path: string,
        body?: string,
    ): Promise<Response> {
        return await this.do('PATCH', path, body);
    }

    /**
   * Performs PUT http request with JSON body.
   * @param path
   * @param body serialized JSON
    */
    public async put(
        path: string,
        body?: string | FormData,
    ): Promise<Response> {
        return await this.do('PUT', path, body);
    }

    /**
     * Performs GET http request.
     * @param path
     * @param body serialized JSON
    */
    public async get(
        path: string,
        body?: string,
    ): Promise<Response> {
        return await this.do('GET', path, body);
    }

    /**
     * Performs DELETE http request.
     * @param path
     * @param body serialized JSON    headers?: HeadersInit,

    */
    public async delete(
        path: string,
        body?: string,
    ): Promise<Response> {
        return await this.do('DELETE', path, body);
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
    ): Promise<Response> {
        const request: RequestInit = {
            method,
        };

        if (body) {
            request.body = body;
        };

        /** 'Content-Type': 'multipart/form-data' doesn't set to headers.
         * The browser automaticaly able to set the Content-Type header with the boundary expression
         * it will use to delimit form fields in the request body.
         * */
        request.headers = {
            'Accept': "application/vnd.api+json",
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
        };

        return await fetch(path, request);
    }
}
