import { useRef, useEffect, useState, setState } from 'react';
import ChartRenderer from './classes/ChartRenderer.js';

function getTransformedPoint(ctx, x, y) {
    const transform = ctx.getTransform();
    const inverseZoom = 1 / transform.a;
    
    const transformedX = inverseZoom * x - inverseZoom * transform.e;
    const transformedY = inverseZoom * y - inverseZoom * transform.f;
    return { x: transformedX, y: transformedY };
}


class OverlayRenderer {
  constructor(ctx) {

  }
  draw() {

  }
}



function Chart(props) {
  const overlayRef = useRef(null);
  const chartRef = useRef(null);
  const canvasWidth = props.width;
  const canvasHeight = props.height;
  let scale = 1.0;

  useEffect(() => {
    // Overlay
    const overlayCanvas = overlayRef.current
    const overlayCtx = overlayCanvas.getContext('2d')

    // Chart
    const chartCanvas = chartRef.current
    const chartCtx = chartCanvas.getContext('2d')

    overlayCanvas.style.cursor='crosshair';

    let isDragging = false;
    let dragStartPosition = {x: 0, y: 0};
    let currentTransformedCursor;

    const chartRenderer = new ChartRenderer(chartCtx, 10, 50, '#151924', canvasWidth, canvasHeight);
    chartRenderer.draw();

    // Draw chart on initial load
    chartRenderer.draw();

    function mouseDown(e) {
      isDragging=true;
      dragStartPosition = getTransformedPoint(chartCtx, e.offsetX, e.offsetY)
    }

    // Draw overlay
    function drawOverlay(e) {
      // Clear OVERLAY canvas
      overlayCtx.clearRect(0, 0, canvasWidth, canvasHeight)
      overlayCtx.restore();

      // Draw vertical and horizontal lines on OVERLAY
      overlayCtx.fillStyle = '#444a9e'
      overlayCtx.fillRect(e.offsetX-canvasWidth, e.offsetY, canvasWidth*2, 1)
      overlayCtx.fillRect(e.offsetX, e.offsetY-canvasHeight, 1, canvasHeight*2)
      overlayCtx.draw
    }

    function mouseMove(e) {
      // Draw overlay
      drawOverlay(e);

      currentTransformedCursor = getTransformedPoint(chartCtx, e.offsetX, e.offsetY);
      if (isDragging) {
        chartCtx.translate(currentTransformedCursor.x - dragStartPosition.x, currentTransformedCursor.y - dragStartPosition.y)
        overlayCanvas.style.cursor='grab';
        // Draw chart
        chartRenderer.draw();
      }
    }

    function mouseUp() {
      isDragging=false
      overlayCanvas.style.cursor='crosshair';
    } 

    function onWheel(e) {
      scale*=e.deltaY < 0 ? 1.1 : 0.9;
      chartRenderer.draw();
      drawOverlay(e);
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
