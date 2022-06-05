import { useRef, useEffect, useState, setState } from 'react';
import ChartRenderer from './classes/ChartRenderer.js';
import OverlayRenderer from './classes/OverlayRenderer.js';
import Bar from './classes/Bar.js';

function getTransformedPoint(ctx, x, y) {
    const transform = ctx.getTransform();
    const inverseZoom = 1 / transform.a;
    
    const transformedX = inverseZoom * x - inverseZoom * transform.e;
    const transformedY = inverseZoom * y - inverseZoom * transform.f;
    return { x: transformedX, y: transformedY };
}

// TEMP FOR TESTING
// TEMP FOR TESTING
// TEMP FOR TESTING
// TEMP FOR TESTING
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

for (let i=0; i<0; i++) {
  bars.push(new Bar(...gen()))
}

bars.push(new Bar(0, 29661.9, 29666.6, 29592.4, 29655.2))
bars.push(new Bar(0, 29655.3, 29661.4, 29630.5, 29642.4))
bars.push(new Bar(0, 29642.5, 29658.9, 29638.3, 29641.0))
bars.push(new Bar(0, 29641.0, 29687.3, 29592.4, 29686.0))
bars.push(new Bar(0, 29685.9, 29714.0, 29664.5, 29682.1))
bars.push(new Bar(0, 29682.1, 29690.3, 29654.9, 29672.9))
bars.push(new Bar(0, 29673.0, 29700.0, 29671.7, 29682.0))
bars.push(new Bar(0, 29999.0, 30000.0, 30000.0, 30001.0))
// TEMP FOR TESTING
// TEMP FOR TESTING
// TEMP FOR TESTING
// TEMP FOR TESTING



function Chart(props) {
  const overlayRef = useRef(null);
  const chartRef = useRef(null);
  const canvasWidth = props.width;
  const canvasHeight = props.height;

  useEffect(() => {
    // Overlay
    const overlayCanvas = overlayRef.current
    const overlayCtx = overlayCanvas.getContext('2d')

    // Chart
    const chartCanvas = chartRef.current
    const chartCtx = chartCanvas.getContext('2d', {alpha: false})

    // Panning and zoom variables
    let isDragging = false;
    let dragStartPosition = {x: 0, y: 0};
    let currentTransformedCursor;

    // Initialize Renderer Classes
    const overlayRenderer = new OverlayRenderer(overlayCtx, canvasWidth, canvasHeight);
    const chartRenderer = new ChartRenderer(chartCtx, 10, 50, '#151924', canvasWidth, canvasHeight);
    chartRenderer.setData(bars);
    
    // TODO: Auto scale on first load later
    chartRenderer.setScaleCenter(props.scaleCenter);
    chartRenderer.setScaleDelta(props.scaleDelta);
    overlayRenderer.setScaleCenter(props.scaleCenter);
    overlayRenderer.setScaleDelta(props.scaleDelta);

    // Set overlay cursor style
    overlayCanvas.style.cursor='crosshair';

    // Draw chart on initial load
    chartRenderer.draw();

    function mouseDown(e) {
      isDragging=true;
      dragStartPosition = getTransformedPoint(chartCtx, e.offsetX, e.offsetY)
    }

    function mouseMove(e) {
      currentTransformedCursor = getTransformedPoint(chartCtx, e.offsetX, e.offsetY);
      if (isDragging) {
        chartCtx.translate(currentTransformedCursor.x - dragStartPosition.x, currentTransformedCursor.y - dragStartPosition.y)
        overlayCanvas.style.cursor='grab';
        // Draw chart
        chartRenderer.draw();
      }

      // Draw overlay
      overlayRenderer.draw(e);
    }

    function mouseUp() {
      isDragging=false
      overlayCanvas.style.cursor='crosshair';
    } 

    function onWheel(e) {
      const zoom = event.deltaY < 0 ? 1.1 : 0.9;
    
      chartCtx.translate(currentTransformedCursor.x, currentTransformedCursor.y);
      chartCtx.scale(zoom, zoom);
      chartCtx.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);
      event.preventDefault();

      chartRenderer.draw();
      overlayRenderer.draw(e);
    }

    overlayCanvas.addEventListener('mousedown', mouseDown);
    overlayCanvas.addEventListener('mousemove', mouseMove);
    overlayCanvas.addEventListener('mouseup', mouseUp);
    overlayCanvas.addEventListener('mouseout', mouseUp);
    overlayCanvas.addEventListener('wheel', onWheel);
  })

  return (
    <div>
      <canvas style={{position: "absolute"}} ref={chartRef} width={canvasWidth} height={canvasHeight}/>
      <canvas style={{position: "absolute"}} ref={overlayRef} width={canvasWidth} height={canvasHeight}/>
    </div>
  )
}

export default Chart
