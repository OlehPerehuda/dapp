import { Dispatch, SetStateAction, createContext, useState } from "react";

import { StorageKeys, getSessionStorageItem } from "@/app/utils/storage";

interface ContextState {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
    address: string;
    setAddress: Dispatch<SetStateAction<string>>
};

export const AppState = createContext<ContextState>({} as ContextState);

export const AppContext: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(getSessionStorageItem(StorageKeys.TOKEN)));
    const [address, setAddress] = useState<string>('');

    return (
        <AppState.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            address,
            setAddress,
        }}>
            {children}
        </AppState.Provider>
    );
};
