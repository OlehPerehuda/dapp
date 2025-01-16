import { JSX } from "react";

import { PhatomWalletIcon } from "@/app/static/icons/phantomWallet";
import { SolfareWalletIcon } from "@/app/static/icons/solfareWallet";

const isPhantomWalletInstalled = Boolean(window.solana && window.solana.isPhantom);
const isSolflareWalletInstalled = Boolean(window.solflare && window.solflare.isSolflare);

export type Wallets = "phantom" | "solflare";

const walletIconsConfig: { [key in Wallets]: JSX.Element } = {
    "phantom": <PhatomWalletIcon />,
    "solflare": <SolfareWalletIcon />,
};

type WalletConfigItem = {
    name: string;
    icon: JSX.Element;
    label: string;
    type: Wallets;
};

export const WALLETS_CONFIG: WalletConfigItem[] = [
    {
        name: 'Phantom wallet',
        icon: walletIconsConfig['phantom'],
        label: isPhantomWalletInstalled ? 'installed' : 'not installed',
        type: 'phantom',
    },
    {
        name: 'Solflare',
        icon: walletIconsConfig['solflare'],
        label: isSolflareWalletInstalled ? 'installed' : 'not installed',
        type: 'solflare',
    },
];