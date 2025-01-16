import { useContext, useMemo, useState } from "react";

import { AuthClient } from "@/api/auth";
import { StorageKeys, removeSessionStorageItem } from "@/app/utils/storage";
import { AppState } from "@/app/context/app";

import { Button } from "@/app/components/common/Button";
import { Modal } from "@/app/components/common/Modal";
import { WalletAddress } from "@/app/components/WalletAddress";

import './index.scss';

export function Header() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AppState);
    const authClient = useMemo(() => new AuthClient(), []);
    const [isModalShown, setIsModalShown] = useState<Boolean>(false);

    const toggleModalVisibility = () => setIsModalShown(!isModalShown);

    const onLogout = async () => {
        try {
            await authClient.logout();
            removeSessionStorageItem(StorageKeys.TOKEN);
            setIsLoggedIn(false);
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <>
            <header className="header">
                {
                    isLoggedIn ? <>
                        <WalletAddress />
                        <Button label="logout" onClick={onLogout} />

                    </>
                        : <Button label="Connect" onClick={toggleModalVisibility} />
                }
            </header>
            {
                isModalShown && <Modal onClose={toggleModalVisibility} />
            }
        </>
    );
};
