import { JSX, useMemo, useRef } from "react";

import { SolanaProvider } from "@/providers/solana";

import { PhatomWalletIcon } from '@/app/static/icons/phantomWallet';
import { SolfareWalletIcon } from '@/app/static/icons/solfareWallet';
import { CloseIcon } from '@/app/static/icons/close';
// import { NotificationsPlugin } from '@/app/utils/notifications';
// import messages from '@/app/configs/messages.json';

import './index.scss';

type WalletConfigItem = {
    name: string;
    icon: JSX.Element;
    label: string;
};

type Wallets = "phantom" | "solflare";

export const walletIconsConfig: { [key in Wallets]: JSX.Element } = {
    "phantom": <PhatomWalletIcon />,
    "solflare": <SolfareWalletIcon />,
};

type ModalProps = {
    onClose: () => void;
};

export function Modal({ onClose }: ModalProps) {
    const provider = useMemo(() => new SolanaProvider(), []);

    const selectWalletModalRef = useRef<HTMLDivElement | null>(null);
    // @ts-ignore
    const isPhantomWalletInstalled = Boolean(window.solana && window.solana?.isPhantom);
    // @ts-ignore
    const isSolflareWalletInstalled = Boolean(window.solflare && window.solflare.isSolflare);

    const WALLETS_CONFIG: WalletConfigItem[] = [
        {
            name: 'Phantom wallet',
            icon: walletIconsConfig['phantom'],
            label: isPhantomWalletInstalled ? 'installed' : 'not installed',
        },
        {
            name: 'Solflare',
            icon: walletIconsConfig['solflare'],
            label: isSolflareWalletInstalled ? 'installed' : 'not installed',
        },
    ];

    const onLogin = async () => {
        try {
            await provider.connect();
            onClose();
            const signature = await provider.signMessage();
        } catch (error) {
            console.log('error: ', error);
        }
    };

    // TODO: detect if EVM wallet installed.
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
                                key={item.name}
                                onClick={onLogin}
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
