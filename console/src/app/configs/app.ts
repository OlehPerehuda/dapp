export type CryptoCurrency = {
    id: string;
    value: string;
};

export const CRYPTOCURRENCIES: CryptoCurrency[] = [
    {
        id: 'bitcoin',
        value: 'BTC',
    },
    {
        id: 'ethereum',
        value: 'ETH',
    },
    {
        id: 'tether',
        value: 'USDT',
    },
    {
        id: 'cardano',
        value: 'ADA',
    },
    {
        id: 'dogecoin',
        value: 'Doge',
    },
    {
        id: 'solana',
        value: 'Sol',
    },
];
