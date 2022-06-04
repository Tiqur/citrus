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

    // Panning and zoom variables
    let isDragging = false;
    let dragStartPosition = {x: 0, y: 0};
    let currentTransformedCursor;

    // Initialize Renderer Classes
    const overlayRenderer = new OverlayRenderer(overlayCtx, canvasWidth, canvasHeight);
    const chartRenderer = new ChartRenderer(chartCtx, 10, 50, '#151924', canvasWidth, canvasHeight);

    chartRenderer.setData([new Bar(0, 29766.2, 29766.7, 29750.5, 29750.5), new Bar(0, 29750.5, 29750.5, 29729.0, 29732.8), new Bar(0, 29732.7, 29755.0, 29732.7, 29754.2), new Bar(0, 29754.3, 29779.7, 29754.2, 29773.5)])

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
