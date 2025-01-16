import { useEffect, useMemo, useState } from "react";

import { Client } from "@/api/client";
import { SolanaProvider } from "@/providers/solana";

import { Button } from "@/app/components/common/Button";
import { Modal } from "@/app/components/common/Modal";

import "./App.css";

function App() {
    const client = useMemo(() => new Client(), []);
    const [isModalShown, setIsModalShown] = useState<Boolean>(false);

    const toggleModalVisibility = () => setIsModalShown(!isModalShown);

    useEffect(() => {
        (async () => {
            await client.profile();
        })();
    }, []);

    return (
        <>
            <h1>
                Hello world
            </h1>
            <Button label="Connect" onClick={toggleModalVisibility} />
            {
                isModalShown && <Modal onClose={toggleModalVisibility} />
            }
        </>
    );
};

export default App;
