import { APIClient } from "@/api";

export class Client extends APIClient {
    public async profile(): Promise<any> {
        const response = await this.http.get(`${this.ROOT_PATH}/api/profile`);

        return await response.json();
    };
};
