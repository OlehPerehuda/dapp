import { useContext, useMemo, useRef } from "react";

import { SolanaProvider } from "@/providers/solana";
import { AuthClient } from "@/api/auth";
import { StorageKeys, setSessionStorageItem } from "@/app/utils/storage";
import { AppState } from "@/app/context/app";
import { WALLETS_CONFIG, Wallets } from "@/app/utils/wallets";
import { NotificationsPlugin } from "@/app/utils/notifications";
import messages from '@/app/configs/messages.json';

import { CloseIcon } from "@/app/static/icons/close";

import './index.scss';

type ModalProps = {
    onClose: () => void;
};

export function Modal({ onClose }: ModalProps) {
    const { setIsLoggedIn } = useContext(AppState);
    const provider = useMemo(() => new SolanaProvider(), []);
    const authClient = useMemo(() => new AuthClient(), []);

    const selectWalletModalRef = useRef<HTMLDivElement | null>(null);

    const onLogin = async (name: Wallets) => {
        const providerType = name === 'solflare' ? 'solflare' : 'solana';

        try {
            await provider.connect(providerType);
            onClose();
            const signature = await provider.signMessage(providerType);
            const token = await authClient.login({
                address: provider.PUBLIC_KEY ?? '',
                signature,
                message: import.meta.env.VITE_MESSAGE,
            });

            if (!token) {
                throw new Error();
            }

            setSessionStorageItem(StorageKeys.TOKEN, token);
            setIsLoggedIn(true);
        } catch (error) {
            NotificationsPlugin.error(messages.auth.login.error);
            onClose();
            console.log('error: ', error);
        }
    };

    return (
        <>
            <div className="modal-wrapper"></div>
            <div className="modal" ref={selectWalletModalRef}>
                <div className="modal__close" onClick={onClose}>
                    <CloseIcon />
                </div>
                <h4 className="modal__title">
                    Choose your preferred wallet
                </h4>
                <div className="modal__list">
                    {
                        WALLETS_CONFIG.map(item =>
                            <div
                                key={item.type}
                                onClick={() => onLogin(item.type)}
                                className="modal__list__item"
                            >
                                <div className="modal__list__item__icon">
                                    {item.icon}
                                </div>
                                <span className="modal__list__item__name">
                                    {item.name}
                                </span>
                                {
                                    item.label && <span className="modal__list__item__installed">
                                        {item.label}
                                    </span>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};
