import Price_scale from './Price_scale.jsx';
import Time_scale from './Time_scale.jsx';
import Chart from './Chart.jsx';
import Toolbar_top from './Toolbar_top.jsx';
import Toolbar_side from './Toolbar_side.jsx';
import styles from './styles.module.scss';
import { useRef, useEffect, useState } from 'react';

function Container() {

  let container_ref = useRef(0);
  let [canvasHeight, setCanvasHeight] = useState(0);
  let [canvasWidth, setCanvasWidth] = useState(0);

  // Time axis
  let [candleWidth, setCandleWidth] = useState(21);

  // TODO: AUTO SCALE 
  let [scaleCenter, setScaleCenter] = useState(100);
  let [scaleDelta, setScaleDelta] = useState(1000);
  
  useEffect(() => {
    setCanvasHeight(container_ref.current.clientHeight-80)
    setCanvasWidth(container_ref.current.clientWidth-40)
  }, [])

  return (
    <div className={styles.container} ref={container_ref}>  
      <Toolbar_top className={styles.toolbar_top}/>
      <Toolbar_side className={styles.toolbar_side}/>
      <Chart className={styles.chart} candleWidth={candleWidth} setCandleWidth={setCandleWidth} scaleDelta={scaleDelta} scaleCenter={scaleCenter} width={canvasWidth} height={canvasHeight}/>
      <Price_scale className={styles.price_scale} scaleDelta={scaleDelta} setScaleDelta={setScaleDelta} height={canvasHeight}/>
      <Time_scale className={styles.time_scale} width={canvasWidth}/>
      <div className={styles.corner1}/>
      <div className={styles.corner2}/>
    </div>
  )
}

export default Container;
