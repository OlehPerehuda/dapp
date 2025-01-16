import { APIClient } from "@/api";

export class CoingeckoClient extends APIClient {
    private readonly PATH: string = import.meta.env.VITE_COINGECKO_API_URL;

    public async coinInfo(id: string = 'solana'): Promise<any> {
        const path = `${this.PATH}/${id}`;

        await this.http.get(path, '', import.meta.env.VITE_COINGECKO_KEY);
    };
};
