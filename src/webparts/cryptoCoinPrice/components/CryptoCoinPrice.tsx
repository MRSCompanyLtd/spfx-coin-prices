import * as React from 'react';
import styles from './CryptoCoinPrice.module.scss';
import { ICryptoCoinPriceProps } from './ICryptoCoinPriceProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICoinDetails, getCoinPrice } from "../api/getCoinPrice";

const CryptoCoinPrice = (props: ICryptoCoinPriceProps) => {
  const [state, setState] = React.useState<ICoinDetails | string> ('');
  const [showRefresh, setShowRefresh] = React.useState<boolean> (false);

  async function getData() {
    let data = await getCoinPrice(props.coin);
    setState(data);
    setShowRefresh(false);
  }

  React.useEffect(() => {
    setState('');
    setShowRefresh(true);
  }, [props.coin]);

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.cryptoCoinPrice}>
    <div className={styles.container}>
    {!state || typeof state === 'string' ?
    <div className={styles.title}>
      {!props.coin ? 'Enter coin name' : props.coin + ' ' + state}
      </div>
    :
    <>
    <div className={styles.title}>
      {props.coin} {state.symbol && `(${state.symbol})`}
    </div>
    {state.priceUsd &&
      <div className={styles.subTitle}>
        <h3>${Number(state.priceUsd).toFixed(2)} USD</h3>
      </div>
    }
    </>
    }
    {showRefresh && <button className={styles.button} onClick={getData}>Refresh</button>}
    </div>
    </div>
  );
};

export default CryptoCoinPrice;