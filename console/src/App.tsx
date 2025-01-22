import { Chart, ArcElement, Tooltip } from "chart.js";
import { useEffect } from "react";

import { Header } from "@/app/components/common/Header";
import { Notification } from "@/app/components/common/Notification";
import Root from "@/app/views/Root";

import { AppContext } from "@/app/context/app";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
    useEffect(() => {
        Chart.register(ArcElement, Tooltip);
    }, []);

    return (
        <AppContext>
            <Header />
            <Notification />
            <Root />
        </AppContext>
    );
};

export default App;
