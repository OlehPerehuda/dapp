import { useContext, useEffect, useMemo } from "react";

import { CopyIcon } from "@/app/static/icons/copy";

import { ProfileClient } from "@/api/profile";
import { AppState } from "@/app/context/app";
import { NotificationsPlugin } from "@/app/utils/notifications";
import messages from "@/app/configs/messages.json";

import "./index.scss";

export function WalletAddress() {
    const { address, setAddress } = useContext(AppState);
    const profileClient = useMemo(() => new ProfileClient(), []);

    const onCopy = () => {
        navigator.clipboard.writeText(address);
        NotificationsPlugin.info(messages.walletAddress.copied);
    };

    useEffect(() => {
        (async () => {
            const { address } = await profileClient.profile();
            setAddress(address);
        })();
    }, []);

    return (
        <div className="wallet-address">
            <span className="wallet-address__label">
                {address.slice(0, 3)}...{address.slice(-3)}
            </span>
            <div className="wallet-address__copy" onClick={onCopy}>
                <CopyIcon />
            </div>
        </div>
    );
};
