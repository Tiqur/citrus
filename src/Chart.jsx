import { useRef, useEffect, useState, setState } from 'react';

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

    // Set CTX
    props.overlayRenderer.setCtx(overlayCtx);
    props.chartRenderer.setCtx(chartCtx);
    
    // Set overlay cursor style
    overlayCanvas.style.cursor='crosshair';

    // Draw chart on initial load
    props.chartRenderer.draw();

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
        props.chartRenderer.draw();
      }

      // Draw overlay
      props.overlayRenderer.draw(e);
    }

    function mouseUp() {
      isDragging=false
      overlayCanvas.style.cursor='crosshair';
    } 

    function onWheel(e) {
      const up = event.deltaY < 0;
      const zoomIn = props.candleWidth + (props.candleWidth >= 100 ? 0 : 1);
      const zoomOut = props.candleWidth - (props.candleWidth <= 3 ? 0 : 1);
      props.setCandleWidth(up ? zoomIn : zoomOut)

      props.chartRenderer.draw();
      props.overlayRenderer.draw(e);
    }

    overlayCanvas.addEventListener('mousedown', mouseDown);
    overlayCanvas.addEventListener('mousemove', mouseMove);
    overlayCanvas.addEventListener('mouseup', mouseUp);
    overlayCanvas.addEventListener('mouseout', mouseUp);
    overlayCanvas.addEventListener('wheel', onWheel);

    return () => {
      overlayCanvas.removeEventListener('mousedown', mouseDown);
      overlayCanvas.removeEventListener('mousemove', mouseMove);
      overlayCanvas.removeEventListener('mouseup', mouseUp);
      overlayCanvas.removeEventListener('mouseout', mouseUp);
      overlayCanvas.removeEventListener('wheel', onWheel);
    }
  })

  return (
    <div>
      <canvas style={{position: "absolute"}} ref={chartRef} width={canvasWidth} height={canvasHeight}/>
      <canvas style={{position: "absolute"}} ref={overlayRef} width={canvasWidth} height={canvasHeight}/>
    </div>
  )
}

export default Chart
