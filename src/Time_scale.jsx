import { useRef, useEffect, useState } from 'react';

function Time_scale(props) {
  const canvasRef = useRef(null);
  const width = props.width;
  const height = 40;

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.style.cursor='col-resize';
    
    ctx.fillStyle = '#151924'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#2a2e39'
    ctx.fillRect(0, 0, canvas.width, 1)
    ctx.draw
  })

  return (
    <canvas ref={canvasRef} width={width} height={height}/>
  )
}

export default Time_scale
