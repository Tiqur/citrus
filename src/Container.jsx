import Price_scale from './Price_scale.jsx';
import Time_scale from './Time_scale.jsx';
import Chart from './Chart.jsx';
import Toolbar_top from './Toolbar_top.jsx';
import Toolbar_side from './Toolbar_side.jsx';
import Bar from './classes/Bar.js';
import ChartRenderer from './classes/ChartRenderer.js';
import OverlayRenderer from './classes/OverlayRenderer.js';
import { useRef, useEffect, useState } from 'react';
import styles from './styles.module.scss';

let last = [0, 169, 420, 121, 321];
const bars = [];

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}


function gen() {
  const open = last[4]
  const high = getRandomArbitrary(open+1, open+100);
  const low = getRandomArbitrary(open-1, open-100);
  const close = getRandomArbitrary(open+100, open-100);

  const ohlc = [
    0, open, high, low, close
  ]

  last = ohlc;

  return ohlc;
}

for (let i=0; i<10000; i++) {
  bars.push(new Bar(...gen()))
}

//bars.push(new Bar(0, 29661.9, 29666.6, 29592.4, 29655.2))
//bars.push(new Bar(0, 29655.3, 29661.4, 29630.5, 29642.4))
//bars.push(new Bar(0, 29642.5, 29658.9, 29638.3, 29641.0))
//bars.push(new Bar(0, 29641.0, 29687.3, 29592.4, 29686.0))
//bars.push(new Bar(0, 29685.9, 29714.0, 29664.5, 29682.1))
//bars.push(new Bar(0, 29682.1, 29690.3, 29654.9, 29672.9))
//bars.push(new Bar(0, 29673.0, 29700.0, 29671.7, 29682.0))
//bars.push(new Bar(0, 29999.0, 30000.0, 30000.0, 30001.0))


function Container(props) {

  let container_ref = useRef(0);
  let [canvasHeight, setCanvasHeight] = useState(0);
  let [canvasWidth, setCanvasWidth] = useState(0);

  // Time axis
  let [candleWidth, setCandleWidth] = useState(21);

  // TODO: AUTO SCALE 
  let [scaleCenter, setScaleCenter] = useState(100);
  let [scaleDelta, setScaleDelta] = useState(1000);

  const overlayRenderer = props.overlayRenderer;
  const chartRenderer = props.chartRenderer;

  // First load
  useEffect(() => {
    setCanvasHeight(container_ref.current.clientHeight-80)
    setCanvasWidth(container_ref.current.clientWidth-40)
    chartRenderer.setData(bars);
  }, [])

  // After canvas size is set
  useEffect(() => {
    chartRenderer.setWidth(canvasWidth);
    chartRenderer.setHeight(canvasHeight);
    overlayRenderer.setWidth(canvasWidth);
    overlayRenderer.setHeight(canvasHeight);
  }, [canvasWidth, canvasHeight])

  // TODO: Auto scale on first load later
  useEffect(() => {
    chartRenderer.setScaleCenter(scaleCenter);
    overlayRenderer.setScaleCenter(scaleCenter);
  }, [scaleCenter])

  // TODO: Auto scale on first load later
  useEffect(() => {
    chartRenderer.setScaleDelta(scaleDelta);
    overlayRenderer.setScaleDelta(scaleDelta);
  }, [scaleDelta])

  useEffect(() => {
    chartRenderer.setCandleWidth(candleWidth);
    overlayRenderer.setCandleWidth(candleWidth);
  }, [candleWidth])




  return (
    <div className={styles.container} ref={container_ref}>  
      <Toolbar_top className={styles.toolbar_top}/>
      <Toolbar_side className={styles.toolbar_side}/>
      <Chart className={styles.chart} overlayRenderer={overlayRenderer} chartRenderer={chartRenderer} candleWidth={candleWidth} setCandleWidth={setCandleWidth} scaleDelta={scaleDelta} scaleCenter={scaleCenter} width={canvasWidth} height={canvasHeight}/>
      <Price_scale className={styles.price_scale} scaleDelta={scaleDelta} setScaleDelta={setScaleDelta} height={canvasHeight}/>
      <Time_scale className={styles.time_scale} width={canvasWidth}/>
      <div className={styles.corner1}/>
      <div className={styles.corner2}/>
    </div>
  )
}

export default Container;
