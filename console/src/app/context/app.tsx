import { Dispatch, SetStateAction, createContext, useEffect, useMemo, useState } from "react";

import { StorageKeys, getSessionStorageItem } from "@/app/utils/storage";
import { CoingeckoClient } from "@/api/coingecko";
import { CoinInfo, MarketCapPercentages } from "@/types";

interface ContextState {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
    coin: CoinInfo | null;
    setCoin: Dispatch<SetStateAction<CoinInfo | null>>;
    percentages: MarketCapPercentages | null;
    setPercentages: Dispatch<SetStateAction<MarketCapPercentages | null>>;
};

export const AppState = createContext<ContextState>({} as ContextState);

export const AppContext: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(getSessionStorageItem(StorageKeys.TOKEN)));
    const [address, setAddress] = useState<string>('');
    const [coin, setCoin] = useState<CoinInfo | null>(null);
    const [percentages, setPercentages] = useState<MarketCapPercentages | null>(null);
    const coingeckoClient = useMemo(() => new CoingeckoClient(), []);

    useEffect(() => {
        (async () => {
            const coin = await coingeckoClient.coinInfo();
            setCoin(coin);
        })();
    }, []);

    useEffect(() => {
        if (percentages) {
            return;
        };

        (async () => {
            const percentages = await coingeckoClient.marketCapPercentage();
            setPercentages(percentages);
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
            setPercentages
        }}>
            {children}
        </AppState.Provider>
    );
};
