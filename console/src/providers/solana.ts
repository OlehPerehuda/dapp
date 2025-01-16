import { Buffer } from "buffer";

export class SolanaProvider {
    public PUBLIC_KEY: string | null = null;

    private provider() {
        if ('phantom' in window) {
            //@ts-ignore
            const provider = window.phantom?.solana;

            if (provider?.isPhantom) {
                return provider;
            }
        }
    };

    public async connect() {
        const { publicKey } = await this.provider().connect();
        this.PUBLIC_KEY = publicKey.toString();
    };

    public async signMessage(): Promise<string> {
        const provider = this.provider();
        // const message = "TEST_MESSAGE";
        const MESSAGE = Buffer.from('TEST_MESSAGE', 'utf8');
        const signedMessage = await provider.signMessage(MESSAGE, "utf8");

        return signedMessage;
    };
};
