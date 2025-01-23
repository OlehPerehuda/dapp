import { APIClient } from "@/api";
import { CoinInfo, MarketCapPercentages } from "@/types";

export class CoingeckoClient extends APIClient {
    private readonly PATH: string = import.meta.env.VITE_COINGECKO_API_URL;

    public async coinInfo(id: string): Promise<CoinInfo> {
        const path = `${this.PATH}/coins/${id}`;
        const response = await this.http.get(path, '', import.meta.env.VITE_COINGECKO_KEY);

        if (!response.ok) {
            await this.handleError(response);
        };

        const body = await response.json();

        return await {
            id: body.id,    
            symbol: body.symbol,
            name: body.name,
            description: body.description.en,
            image: body.image.small,
            links: body.links.homepage,
            marketData: {
                currentPrice: body.market_data.current_price.usd,
                ath: body.market_data.ath.usd,
                marketCap: body.market_data.market_cap.usd,
                totalVolume: body.market_data.total_volume.usd,
                rank: body.market_cap_rank,
            },
        };
    };

    public async marketCapPercentage(): Promise<MarketCapPercentages> {
        const path = `${this.PATH}/global`;
        const response = await this.http.get(path, '', import.meta.env.VITE_COINGECKO_KEY);

        if (!response.ok) {
            await this.handleError(response);
        };

        const body = await response.json();

        return await {
            btc: body.data.market_cap_percentage.btc,
            eth: body.data.market_cap_percentage.eth,
            usdt: body.data.market_cap_percentage.usdt,
            bnb: body.data.market_cap_percentage.bnb,
            sol: body.data.market_cap_percentage.sol,
            usdc: body.data.market_cap_percentage.usdc,
            xrp: body.data.market_cap_percentage.xrp,
            steth: body.data.market_cap_percentage.steth,
            doge: body.data.market_cap_percentage.doge,
            ada: body.data.market_cap_percentage.ada,
        }
    };
};
