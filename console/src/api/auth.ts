import { APIClient } from "@/api";
import { LoginParams } from "@/types";

export class AuthClient extends APIClient {
    public async login(params: LoginParams): Promise<string> {
        const path = `${this.ROOT_PATH}/api/login`;

        const response = await this.http.post(path, JSON.stringify(params));

        const body = await response.json();

        return await body.token;
    };

    public async logout(): Promise<void> {
        const path = `${this.ROOT_PATH}/api/logout`;

        await this.http.post(path, '', this.token);
    };
};
