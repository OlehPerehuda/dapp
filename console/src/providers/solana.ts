import { Buffer } from "buffer";

export class SolanaProvider {
    public PUBLIC_KEY: string | null = null;

    private provider() {
        //@ts-ignore
        return window.solana;
    };

    public async connect() {
        const { publicKey } = await this.provider().connect();
        this.PUBLIC_KEY = publicKey.toString();
    };

    public async signMessage(): Promise<string> {
        const provider = this.provider();
        // const message = "TEST_MESSAGE";
        const message = new TextEncoder().encode('TEST MESSAGE');
        const { signature } = await provider.signMessage(message, 'utf8');

        return Buffer.from(signature).toString('base64');
    };
};
