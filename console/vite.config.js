const path = require("path");
const zlib = require("zlib");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

const PRODUCTION_PLUGINS = [
    react(),
    viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
        compressionOptions: {
            params: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
        },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
    }),
];

const DEVELOPMENT_PLUGINS = [react()];

export default ({ mode }) => {
    const isProduction = mode === "production";

    return defineConfig({
        base: "/",
        root: path.join(__dirname, "/"),
        build: {
            minify: "esbuild",
            outDir: path.resolve(__dirname, "dist/"),
            cssCodeSplit: false,
        },
        plugins: isProduction ? PRODUCTION_PLUGINS : DEVELOPMENT_PLUGINS,
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src/"),
                crypto: "empty-module",
                assert: "empty-module",
                http: "empty-module",
                https: "empty-module",
                os: "empty-module",
                url: "empty-module",
                zlib: "empty-module",
                stream: "empty-module",
                _stream_duplex: "empty-module",
                _stream_passthrough: "empty-module",
                _stream_readable: "empty-module",
                _stream_writable: "empty-module",
                _stream_transform: "empty-module",
            },
        },
        server: {
            port: 3000,
            host: true,
        },
        preview: {
            port: 3000,
            strictPort: true,
        },
        clean: true,
        minify: true,
    });
};
