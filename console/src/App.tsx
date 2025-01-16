import { Header } from "@/app/components/common/Header";
import { Notification } from "@/app/components/common/Notification";

import { AppContext } from "@/app/context/app";

import "./App.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { CoingeckoClient } from "@/api/coingecko";

function App() {
    const client = new CoingeckoClient();

    useEffect(() => {
        (async() => {
            await client.coinInfo();
        })();
    }, []);

    return (
        <AppContext>
            <Notification />
            <Header />
        </AppContext>
    );
};

export default App;
