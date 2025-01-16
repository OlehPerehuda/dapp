import { PublicKey } from "@solana/web3.js";

export { };

declare global {
    interface Window {
        solana: {
            isPhantom: boolean;
            connect: () => Promise<{ publicKey: PublicKey }>;
            signMessage: (messsage: Uint8Array, format: string) => Promise<{ signature: Uint8Array }>;
        };
        solflare: {
            isSolflare: boolean;
            publicKey: PublicKey;
            connect: () => Promise<{ publicKey: PublicKey }>;
            signMessage: (messsage: Uint8Array, format: string) => Promise<{ signature: Uint8Array }>;
        };
    }
};
