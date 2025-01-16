import { Buffer } from "buffer";

type ProviderType = "solana" | "solflare";

export class SolanaProvider {
    public PUBLIC_KEY: string | null = null;

    private provider(providerType: ProviderType) {
        return window[providerType];
    };

    public async connnectPhantomWallet() {
        const { publicKey } = await this.provider('solana').connect();
        this.PUBLIC_KEY = publicKey.toString();
    };

    public async connectSolflareWallet() {
        await this.provider('solflare').connect();
        this.PUBLIC_KEY = window.solflare.publicKey.toString();
    };

    public async connect(providerType: ProviderType) {
        providerType === 'solana' ?
            await this.connnectPhantomWallet() : await this.connectSolflareWallet();
    };

    public async signMessage(providerType: ProviderType): Promise<string> {
        const provider = this.provider(providerType);
        console.log('provider: ', provider);
        const message = new TextEncoder().encode('TEST MESSAGE');
        const { signature } = await provider.signMessage(message, 'utf8');

        return Buffer.from(signature).toString('base64');
    };
};
