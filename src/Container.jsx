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
let bars = [];

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

for (let i=0; i<0; i++) {
  bars.push(new Bar(...gen()))
}

bars.push(new Bar(0, 29643.0, 30246.7, 29330.0, 29536.7))
bars.push(new Bar(0, 29536.7, 29877.0, 27952.1, 29194.0))
bars.push(new Bar(0, 29194.0, 29387.0, 28259.6, 28623.2))
bars.push(new Bar(0, 28623.3, 29265.7, 28520.0, 29018.8))
bars.push(new Bar(0, 29018.8, 29595.2, 28825.0, 29452.8))
bars.push(new Bar(0, 29452.6, 32307.6, 29301.1, 31726.5))

// TODO: Fix this later
bars = bars.reverse();


function Container(props) {

  let container_ref = useRef(0);
  let [canvasHeight, setCanvasHeight] = useState(0);
  let [canvasWidth, setCanvasWidth] = useState(0);

  // Time axis
  let [candleWidth, setCandleWidth] = useState(21);

  // TODO: AUTO SCALE 
  let [scaleCenter, setScaleCenter] = useState(29600);
  let [scaleDelta, setScaleDelta] = useState(5000);

  // TODO: Add button / hotkey
  let [magnetMode, setMagnetMode] = useState(false);

  let [data, setData] = useState([]);

  const overlayRenderer = props.overlayRenderer;
  const chartRenderer = props.chartRenderer;


  // First load
  useEffect(() => {
    setCanvasHeight(container_ref.current.clientHeight-40-40)
    setCanvasWidth(container_ref.current.clientWidth-40-60)
    setData(bars);
  }, [])

  useEffect(() => {
    chartRenderer.setData(bars);
    overlayRenderer.setData(bars);
  }, [data])

  useEffect(() => {
    overlayRenderer.setMagnetMode(magnetMode);
  }, [magnetMode])

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
      <Chart className={styles.chart} setData={setData} overlayRenderer={overlayRenderer} chartRenderer={chartRenderer} candleWidth={candleWidth} setCandleWidth={setCandleWidth} scaleDelta={scaleDelta} scaleCenter={scaleCenter} width={canvasWidth} height={canvasHeight}/>
      <Price_scale className={styles.price_scale} scaleDelta={scaleDelta} setScaleDelta={setScaleDelta} height={canvasHeight}/>
      <Time_scale className={styles.time_scale} width={canvasWidth}/>
      <div className={styles.corner1}/>
      <div className={styles.corner2}/>
    </div>
  )
}

export default Container;
