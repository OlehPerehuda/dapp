import { Doughnut } from "react-chartjs-2";

import { MarketCapPercentages } from "@/types";

import "./index.scss";

type PercentagesProps = {
    percentages: MarketCapPercentages
};

export function Percentages({ percentages }: PercentagesProps) {
    const labels = Object.keys(percentages).map(label => label.toUpperCase());
    const values = Object.values(percentages).map(value => Math.round(value * 100) / 100);

    const DOUGHNUT_CONFIG = {
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

    const DOUGHNUT_OPTIONS = {
        plugins:
        {
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: (item: any) => `${item.formattedValue}%`
                }
            }
        }
    };

    return (
        <div className="percentages">
            <h3 className="percentages__title">
                Market Cap Dominance
            </h3>
            <Doughnut data={DOUGHNUT_CONFIG} options={DOUGHNUT_OPTIONS} />
        </div>
    );
};
