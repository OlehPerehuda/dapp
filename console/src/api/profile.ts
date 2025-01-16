import { APIClient } from "@/api";
import { Profile } from "@/types";

export class ProfileClient extends APIClient {
    public async profile(): Promise<Profile> {
        const path = `${this.ROOT_PATH}/api/profile`;
        const response = await this.http.get(path, '', this.token);

        return await response.json();
    };
};
