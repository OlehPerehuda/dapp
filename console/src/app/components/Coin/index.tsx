import { CoinInfo } from "@/types";

import "./index.scss";

type CoinProps = {
    coin: CoinInfo;
};

export function Coin({ coin }: CoinProps) {
    const {
        name,
        description,
        image,
        links,
        marketData: {
            currentPrice,
            rank,
            ath,
            marketCap,
            totalVolume,
        }
    } = coin;

    return (
        <div className="coin">
            <span className="coin__title">
                {name} #{rank}
            </span>
            <span className="coin__description">
                {description}
            </span>
            <div className="coin__market">
                <span className="coin__market__title">Market Stats</span>
                <div className="coin__market__item">
                    <div className="coin__label">
                        Price
                    </div>
                    <div className="coin__value">
                        {currentPrice} $
                    </div>
                </div>
                <div className="coin__market__item">
                    <div className="coin__label">
                        Market Cap
                    </div>
                    <div className="coin__value">
                        {marketCap} $
                    </div>
                </div>
                <div className="coin__market__item">
                    <div className="coin__label">
                        Volume
                    </div>
                    <div className="coin__value">
                        {totalVolume} $
                    </div>
                </div>
            </div>
        </div>
    );
};
