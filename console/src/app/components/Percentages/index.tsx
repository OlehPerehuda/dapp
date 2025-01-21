import { Doughnut } from "react-chartjs-2";

import { MarketCapPercentages } from "@/types";

import "./index.scss";

type PercentagesProps = {
    percentages: MarketCapPercentages
};

export function Percentages({ percentages }: PercentagesProps) {
    const labels = Object.keys(percentages);
    const values = Object.values(percentages);

    const PERCENTAGES_CONFIG = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    '#f5426f',
                    '#0b0017',
                    '#2b0210',
                    '#bf42f5',
                    '#4e42f5',
                    '#4299f5',
                    '#42f5bf',
                    '#63f542',
                    '#4f2f4d',
                    '#f58742',
                ],
            }
        ]
    };

    return (
        <div className="percentages">
            <h3 className="percentages__title">
                Market Cap Dominance
            </h3>
            <Doughnut data={PERCENTAGES_CONFIG} />
        </div>
    );
};
