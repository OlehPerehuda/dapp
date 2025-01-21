import { useContext } from "react";

import { Coin } from "@/app/components/Coin";
import { Percentages } from "@/app/components/Percentages";

import { AppState } from "@/app/context/app";

import "./index.scss";

function Root() {
    const { coin, percentages } = useContext(AppState);

    return (
        <div className="root">
            {
                percentages && <Percentages percentages={percentages} />
            }
            {
                coin && <Coin coin={coin} />
            }
        </div>
    );
};

export default Root;