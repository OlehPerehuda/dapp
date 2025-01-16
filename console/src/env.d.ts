/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_MESSAGE: string;
    readonly VITE_COINGECKO_KEY: string;
    readonly VITE_COINGECKO_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
