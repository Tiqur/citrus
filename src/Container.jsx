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
import Magnet from '../assets/magnet.svg?component';


const data = [ { time: 1654606980, open: 29510.9, high: 29510.91, low: 29488.6, close: 29494.18 }, { time: 1654607040, open: 29494.17, high: 29498, low: 29492.72, close: 29497.05 }, { time: 1654607100, open: 29497.06, high: 29515.35, low: 29495.57, close: 29506.73 }, { time: 1654607160, open: 29506.73, high: 29521.95, low: 29506.72, close: 29517.55 }, { time: 1654607220, open: 29517.55, high: 29523.7, low: 29517.55, close: 29517.71 }, { time: 1654607280, open: 29517.7, high: 29522.89, low: 29517.6, close: 29522.88 }, { time: 1654607340, open: 29522.88, high: 29522.89, low: 29520, close: 29522.73 }, { time: 1654607400, open: 29522.72, high: 29530, low: 29521.84, close: 29524.89 }, { time: 1654607460, open: 29524.88, high: 29529.62, low: 29524.88, close: 29529.62 }, { time: 1654607520, open: 29529.61, high: 29536.03, low: 29522.27, close: 29522.27 }, { time: 1654607580, open: 29522.28, high: 29522.28, low: 29489.07, close: 29489.08 }, { time: 1654607640, open: 29489.08, high: 29489.08, low: 29475.45, close: 29478.21 }, { time: 1654607700, open: 29478.21, high: 29514, low: 29477.58, close: 29513.99 }, { time: 1654607760, open: 29513.99, high: 29514, low: 29498.8, close: 29505.16 }, { time: 1654607820, open: 29505.16, high: 29510.05, low: 29496.61, close: 29510.05 }, { time: 1654607880, open: 29510.04, high: 29517.79, low: 29510.04, close: 29517.79 }, { time: 1654607940, open: 29517.79, high: 29520, low: 29515, close: 29515.33 }, { time: 1654608000, open: 29515.32, high: 29520, low: 29512.49, close: 29519.99 }, { time: 1654608060, open: 29520, high: 29520.02, low: 29513.84, close: 29517.88 }, { time: 1654608120, open: 29517.88, high: 29517.89, low: 29509.65, close: 29509.65 }, { time: 1654608180, open: 29509.65, high: 29520.01, low: 29503.7, close: 29520 }, { time: 1654608240, open: 29520.01, high: 29536.97, low: 29519.99, close: 29532.42 }, { time: 1654608300, open: 29532.41, high: 29535, low: 29532.41, close: 29533.97 }, { time: 1654608360, open: 29533.97, high: 29533.97, low: 29522.74, close: 29522.75 }, { time: 1654608420, open: 29522.74, high: 29535.43, low: 29522.74, close: 29535.43 }, { time: 1654608480, open: 29535.43, high: 29562.9, low: 29535.42, close: 29558.91 }, { time: 1654608540, open: 29558.91, high: 29558.92, low: 29535.71, close: 29542.48 }, { time: 1654608600, open: 29542.48, high: 29553.79, low: 29524.16, close: 29536.64 }, { time: 1654608660, open: 29536.63, high: 29548.87, low: 29500.01, close: 29503.13 }, { time: 1654608720, open: 29503.12, high: 29537.38, low: 29430.01, close: 29537.38 }, { time: 1654608780, open: 29537.38, high: 29630.01, low: 29535.31, close: 29578.53 }, { time: 1654608840, open: 29578.53, high: 29658.05, low: 29578.53, close: 29603.24 }, { time: 1654608900, open: 29603.23, high: 29622.94, low: 29559.14, close: 29592.61 }, { time: 1654608960, open: 29592.62, high: 29619.13, low: 29568.37, close: 29617.27 }, { time: 1654609020, open: 29617.28, high: 29622.32, low: 29594.83, close: 29618.49 }, { time: 1654609080, open: 29618.5, high: 29630.71, low: 29594.06, close: 29611.4 }, { time: 1654609140, open: 29611.39, high: 29618.35, low: 29572.79, close: 29606.29 }, { time: 1654609200, open: 29606.28, high: 29638.43, low: 29594.82, close: 29638.43 }, { time: 1654609260, open: 29638.42, high: 29643.5, low: 29614.35, close: 29629.3 }, { time: 1654609320, open: 29629.31, high: 29653.32, low: 29600.31, close: 29609.63 }, { time: 1654609380, open: 29609.63, high: 29626.27, low: 29607.53, close: 29621.88 }, { time: 1654609440, open: 29621.89, high: 29632.27, low: 29606.04, close: 29620.23 }, { time: 1654609500, open: 29620.24, high: 29639.98, low: 29604.88, close: 29639.97 }, { time: 1654609560, open: 29639.98, high: 29656.48, low: 29625.03, close: 29640.89 }, { time: 1654609620, open: 29640.89, high: 29642.37, low: 29611.32, close: 29612.11 }, { time: 1654609680, open: 29612.11, high: 29613.58, low: 29578.01, close: 29598.3 }, { time: 1654609740, open: 29598.3, high: 29622.54, low: 29598.3, close: 29622.53 }, { time: 1654609800, open: 29622.53, high: 29641.28, low: 29621.39, close: 29631.46 }, { time: 1654609860, open: 29631.45, high: 29715.57, low: 29631.45, close: 29674.6 }, { time: 1654609920, open: 29674.59, high: 29699.9, low: 29657.4, close: 29661.8 }, { time: 1654609980, open: 29661.8, high: 29667.74, low: 29640, close: 29640.01 }, { time: 1654610040, open: 29640.01, high: 29653.26, low: 29623.94, close: 29627.75 }, { time: 1654610100, open: 29627.75, high: 29665.1, low: 29627.74, close: 29665.09 }, { time: 1654610160, open: 29665.09, high: 29665.1, low: 29633.25, close: 29633.26 }, { time: 1654610220, open: 29633.25, high: 29639.51, low: 29553.89, close: 29559.33 }, { time: 1654610280, open: 29559.32, high: 29582.81, low: 29550.25, close: 29570.36 }, { time: 1654610340, open: 29570.36, high: 29573.44, low: 29552.9, close: 29564.48 }, { time: 1654610400, open: 29564.47, high: 29573.47, low: 29529.19, close: 29545.22 }, { time: 1654610460, open: 29545.21, high: 29587.3, low: 29542.63, close: 29585.95 }, { time: 1654610520, open: 29585.95, high: 29592.12, low: 29567.15, close: 29578.94 }, { time: 1654610580, open: 29578.95, high: 29584.9, low: 29568.14, close: 29573.03 }, { time: 1654610640, open: 29573.03, high: 29620.24, low: 29560.69, close: 29599.97 }, { time: 1654610700, open: 29599.96, high: 29650, low: 29594.95, close: 29621.12 }, { time: 1654610760, open: 29621.11, high: 29633.74, low: 29600, close: 29601.52 }, { time: 1654610820, open: 29601.53, high: 29604.27, low: 29578.2, close: 29578.2 }, { time: 1654610880, open: 29578.21, high: 29591.57, low: 29552.4, close: 29555.59 }, { time: 1654610940, open: 29555.58, high: 29572.78, low: 29555.58, close: 29558.3 }, { time: 1654611000, open: 29558.29, high: 29581.78, low: 29537.19, close: 29537.19 }, { time: 1654611060, open: 29537.2, high: 29537.2, low: 29506.33, close: 29518.3 }, { time: 1654611120, open: 29518.3, high: 29550.32, low: 29518.3, close: 29550.31 }, { time: 1654611180, open: 29550.32, high: 29552.73, low: 29533.29, close: 29552.57 }, { time: 1654611240, open: 29552.57, high: 29577.42, low: 29548.72, close: 29575.05 }, { time: 1654611300, open: 29575.04, high: 29577.42, low: 29541.44, close: 29572.66 }, { time: 1654611360, open: 29572.67, high: 29619.73, low: 29566.17, close: 29591.19 }, { time: 1654611420, open: 29591.19, high: 29618.06, low: 29587.03, close: 29616.3 }, { time: 1654611480, open: 29616.3, high: 29617.36, low: 29595.23, close: 29596.12 }, { time: 1654611540, open: 29596.12, high: 29596.13, low: 29563.2, close: 29581.57 }, { time: 1654611600, open: 29581.58, high: 29604.92, low: 29558.01, close: 29595.58 }, { time: 1654611660, open: 29595.59, high: 29619.45, low: 29593.2, close: 29615.34 }, { time: 1654611720, open: 29615.33, high: 29650, low: 29604.81, close: 29644.19 }, { time: 1654611780, open: 29644.2, high: 29660, low: 29621.1, close: 29656.46 }, { time: 1654611840, open: 29656.46, high: 29658.74, low: 29632.32, close: 29639.03 }, { time: 1654611900, open: 29639.02, high: 29642.79, low: 29617.48, close: 29642.78 }, { time: 1654611960, open: 29642.79, high: 29650, low: 29618.91, close: 29633.08 }, { time: 1654612020, open: 29633.08, high: 29633.09, low: 29620.39, close: 29632.5 }, { time: 1654612080, open: 29632.49, high: 29674.52, low: 29632.49, close: 29674.51 }, { time: 1654612140, open: 29674.51, high: 29694.22, low: 29674.51, close: 29693.17 }, { time: 1654612200, open: 29693.17, high: 29705, low: 29690, close: 29700.02 }, { time: 1654612260, open: 29700.02, high: 29706, low: 29668.74, close: 29671.27 }, { time: 1654612320, open: 29671.27, high: 29711, low: 29668.75, close: 29699.3 }, { time: 1654612380, open: 29699.3, high: 29745.5, low: 29699.3, close: 29733.9 }, { time: 1654612440, open: 29733.91, high: 29863.12, low: 29724.17, close: 29835.06 }, { time: 1654612500, open: 29835.06, high: 29835.06, low: 29779.95, close: 29814.82 }, { time: 1654612560, open: 29814.83, high: 29874.93, low: 29814.82, close: 29864.74 }, { time: 1654612620, open: 29864.74, high: 29900, low: 29839.04, close: 29888.01 }, { time: 1654612680, open: 29888, high: 29893.78, low: 29859.19, close: 29879.02 }, { time: 1654612740, open: 29879.01, high: 29894.09, low: 29859.81, close: 29870.56 }, { time: 1654612800, open: 29870.56, high: 29871.84, low: 29805.13, close: 29818.97 }, { time: 1654612860, open: 29818.98, high: 29873.65, low: 29816.95, close: 29861.25 }, { time: 1654612920, open: 29861.25, high: 29863.08, low: 29861.25, close: 29863.08 } ]
let bars = [];

data.forEach(d => {
  bars.push(new Bar(d.time, d.open, d.high, d.low, d.close))
})

//bars.push(new Bar(0, 29643.0, 30246.7, 29330.0, 29536.7))
//bars.push(new Bar(0, 29536.7, 29877.0, 27952.1, 29194.0))
//bars.push(new Bar(0, 29194.0, 29387.0, 28259.6, 28623.2))
//bars.push(new Bar(0, 28623.3, 29265.7, 28520.0, 29018.8))
//bars.push(new Bar(0, 29018.8, 29595.2, 28825.0, 29452.8))
//bars.push(new Bar(0, 29452.6, 32307.6, 29301.1, 31726.5))

// TODO: Fix this later
bars = bars.reverse();


function Container(props) {

  let container_ref = useRef(0);
  let [canvasHeight, setCanvasHeight] = useState(0);
  let [canvasWidth, setCanvasWidth] = useState(0);

  // Time axis
  let [candleWidth, setCandleWidth] = useState(21);

  // TODO: AUTO SCALE 
  let [scaleCenter, setScaleCenter] = useState(bars[0].open);
  let [scaleDelta, setScaleDelta] = useState(1000);

  // TODO: Add button / hotkey
  let [drawingMode, setDrawingMode] = useState(false);
  let [magnetMode, setMagnetMode] = useState(false);
  let [measureTool, setMeasureTool] = useState(false);

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

  useEffect(() => {
    setDrawingMode(measureTool);
    overlayRenderer.setMeasureTool(measureTool);
  }, [measureTool])

  // After canvas size is set
  useEffect(() => {
    chartRenderer.setWidth(canvasWidth);
    chartRenderer.setHeight(canvasHeight);
    overlayRenderer.setWidth(canvasWidth);
    overlayRenderer.setHeight(canvasHeight);

    // Draw on initial load
    chartRenderer.draw();
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


  // Disable drawing mode and all tools
  function disableDrawingMode() {
    setMeasureTool(false);
  }


  
  return (
    <div className={styles.container} ref={container_ref}>  
      <Toolbar_top className={styles.toolbar_top}/>
      <Toolbar_side className={styles.toolbar_side}>
        <div>
          <div onClick={() => {disableDrawingMode()}}>
            <svg viewBox='0 0 28 28' width='28' height='28'>
              <g fill={!drawingMode ? '#1E53E5' : '#ffffff'} fillRule='evenodd'>
                <path d="M18 15h8v-1h-8z"/>
                <path d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"/>
              </g>
            </svg>
          </div>
          <div onClick={() => {setMeasureTool(!measureTool)}}>
            <svg viewBox='0 0 28 28' width='28' height='28'>
              <g fill={measureTool ? '#1E53E5' : '#ffffff'} fillRule='evenodd'>
                <path d="M2 9.75a1.5 1.5 0 0 0-1.5 1.5v5.5a1.5 1.5 0 0 0 1.5 1.5h24a1.5 1.5 0 0 0 1.5-1.5v-5.5a1.5 1.5 0 0 0-1.5-1.5zm0 1h3v2.5h1v-2.5h3.25v3.9h1v-3.9h3.25v2.5h1v-2.5h3.25v3.9h1v-3.9H22v2.5h1v-2.5h3a.5.5 0 0 1 .5.5v5.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-5.5a.5.5 0 0 1 .5-.5z" transform="rotate(-45 14 14)"/>
              </g>
            </svg>
          </div>
          <div onClick={() => {setMagnetMode(!magnetMode)}} style={{background: magnetMode ? '#1E53E5' : ''}}>
            <svg viewBox='0 0 28 28' width='28' height='28'>
              <g fill='#ffffff' fillRule='evenodd'>
                <path d="M14 10a2 2 0 0 0-2 2v11H6V12c0-4.416 3.584-8 8-8s8 3.584 8 8v11h-6V12a2 2 0 0 0-2-2zm-3 2a3 3 0 0 1 6 0v10h4V12c0-3.864-3.136-7-7-7s-7 3.136-7 7v10h4V12z"/>
                <path d="M6.5 18h5v1h-5zm10 0h5v1h-5z"/>
              </g>
            </svg>
          </div>
        </div>
      </Toolbar_side>
      <Chart drawingMode={drawingMode} className={styles.chart} setData={setData} overlayRenderer={overlayRenderer} chartRenderer={chartRenderer} candleWidth={candleWidth} setCandleWidth={setCandleWidth} scaleDelta={scaleDelta} scaleCenter={scaleCenter} width={canvasWidth} height={canvasHeight}/>
      <Price_scale className={styles.price_scale} scaleDelta={scaleDelta} setScaleDelta={setScaleDelta} height={canvasHeight}/>
      <Time_scale className={styles.time_scale} width={canvasWidth}/>
      <div className={styles.corner1}/>
      <div className={styles.corner2}/>
    </div>
  )
}

export default Container;
