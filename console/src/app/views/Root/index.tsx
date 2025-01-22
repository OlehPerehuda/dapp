import { useContext, useState } from "react";

import { Coin } from "@/app/components/Coin";
import { Percentages } from "@/app/components/Percentages";
import { Select } from "@/app/components/common/Select";

import { AppState } from "@/app/context/app";
import { CRYPTOCURRENCIES } from "@/app/configs/app";

import "./index.scss";

function Root() {
    const { coin, percentages, cryptocurrency, setCryptocurrency, isLoggedIn } = useContext(AppState);

    const onSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCryptoCurrency = CRYPTOCURRENCIES.find(cryptocurrency => cryptocurrency.value === e.target.value);

        setCryptocurrency({
            id: selectedCryptoCurrency && selectedCryptoCurrency.id || '',
            value: e.target.value,
        });
    };

    return (
        <div className="root">
            {
                percentages && <Percentages percentages={percentages} />
            }
            {
                coin && <div className="root__cryptocurrencies">
                    {
                        isLoggedIn && <Select
                            value={cryptocurrency.value}
                            items={CRYPTOCURRENCIES}
                            label="Select cryptocurrency"
                            onSelect={onSelectValue}
                        />
                    }
                    <Coin coin={coin} />
                </div>
            }

        </div>
    );
};

export default Root;