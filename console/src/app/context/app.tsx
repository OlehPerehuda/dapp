import { Dispatch, SetStateAction, createContext, useEffect, useMemo, useState } from "react";

import { StorageKeys, getSessionStorageItem } from "@/app/utils/storage";
import { CoingeckoClient } from "@/api/coingecko";
import { CoinInfo, MarketCapPercentages } from "@/types";
import { CRYPTOCURRENCIES, CryptoCurrency } from "@/app/configs/app";
import { TooManyRequestsError } from "@/api";
import { NotificationsPlugin } from "@/app/utils/notifications";
import messages from "@/app/configs/messages.json";

interface ContextState {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
    coin: CoinInfo | null;
    setCoin: Dispatch<SetStateAction<CoinInfo | null>>;
    percentages: MarketCapPercentages | null;
    setPercentages: Dispatch<SetStateAction<MarketCapPercentages | null>>;
    cryptocurrency: CryptoCurrency;
    setCryptocurrency: Dispatch<SetStateAction<CryptoCurrency>>;
};

export const AppState = createContext<ContextState>({} as ContextState);

export const AppContext: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(getSessionStorageItem(StorageKeys.TOKEN)));
    const [address, setAddress] = useState<string>('');
    const [coin, setCoin] = useState<CoinInfo | null>(null);
    const [percentages, setPercentages] = useState<MarketCapPercentages | null>(null);
    const [cryptocurrency, setCryptocurrency] = useState<CryptoCurrency>(CRYPTOCURRENCIES[0]);
    const coingeckoClient = useMemo(() => new CoingeckoClient(), []);

    useEffect(() => {
        (async () => {
            try {
                const coin = await coingeckoClient.coinInfo(cryptocurrency.id);
                setCoin(coin);
            } catch (error: any) {
                if (error instanceof TooManyRequestsError) {
                    NotificationsPlugin.error(messages.coingecko.erros.tooManyRequests);

                    return;
                };

                NotificationsPlugin.error(messages.coingecko.erros.couldNotGetCoinInfo);
            }
        })();
    }, [cryptocurrency.id]);

    useEffect(() => {
        if (percentages) {
            return;
        };

        (async () => {
            try {
                const percentages = await coingeckoClient.marketCapPercentage();
                setPercentages(percentages);
            } catch (error: any) {
                if (error instanceof TooManyRequestsError) {
                    NotificationsPlugin.error(messages.coingecko.erros.tooManyRequests);

                    return;
                };

                NotificationsPlugin.error(messages.coingecko.erros.couldNotGetMarketCapInfo);
            }
        })();
    }, []);

    return (
        <AppState.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            address,
            setAddress,
            coin,
            setCoin,
            percentages,
            setPercentages,
            cryptocurrency,
            setCryptocurrency,
        }}>
            {children}
        </AppState.Provider>
    );
};
