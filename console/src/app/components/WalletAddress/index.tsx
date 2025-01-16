import { useContext, useEffect, useMemo } from "react";

import { ProfileClient } from "@/api/profile";
import { AppState } from "@/app/context/app";

import "./index.scss";

export function WalletAddress() {
    const { address, setAddress } = useContext(AppState);
    const profileClient = useMemo(() => new ProfileClient(), []);

    useEffect(() => {
        (async () => {
            const { address } = await profileClient.profile();
            setAddress(address);
        })();
    }, []);

    return (
        <div className="wallet-address">
            <span className="wallet-address__label">
                {address}
            </span>
        </div>
    );
};
