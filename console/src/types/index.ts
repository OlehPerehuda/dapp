export type LoginParams = {
    message: string;
    address: string;
    signature: string;
};

export type Profile = {
    address: string;
};

export type CoinInfo = {
    id: string;    
    symbol: string;
    name: string;
    description: string;
    image: string;
    links: string[];
    marketData: {
        currentPrice: number;
        ath: number;
        rank: number;
        marketCap: number;
        totalVolume: number;
    };
};

export type MarketCapPercentages = {
    btc: number;
    eth: number;
    usdt: number;
    bnb: number;
    sol: number;
    usdc: number;
    xrp: number;
    steth: number;
    doge: number;
    ada: number;
};
