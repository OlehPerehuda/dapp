import { useContext, useMemo, useState } from "react";

import { AuthClient } from "@/api/auth";
import { StorageKeys, removeSessionStorageItem } from "@/app/utils/storage";
import { AppState } from "@/app/context/app";
import { NotificationsPlugin } from "@/app/utils/notifications";
import messages from '@/app/configs/messages.json';

import { Button } from "@/app/components/common/Button";
import { Modal } from "@/app/components/common/Modal";
import { WalletAddress } from "@/app/components/WalletAddress";

import './index.scss';

export function Header() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AppState);
    const authClient = useMemo(() => new AuthClient(), []);
    const [isModalShown, setIsModalShown] = useState<boolean>(false);

    const toggleModalVisibility = () => setIsModalShown(!isModalShown);

    const onLogout = async () => {
        try {
            await authClient.logout();
            removeSessionStorageItem(StorageKeys.TOKEN);
            setIsLoggedIn(false);
        } catch (error) {
            NotificationsPlugin.error(messages.auth.logout.error);
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
