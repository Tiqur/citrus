import { useRef, useEffect, useState, setState } from 'react';

function Price_scale(props) {
  const canvasRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastY, setLastY] = useState(0);
  const width = 60;
  const height = props.height;

  const handleMouseDown = () => setMouseDown(true);
  const handleMouseUp = () => setMouseDown(false);
  const handleMouseMove = (canvas) => {
    if (mouseDown) {
      let rect = canvas.getBoundingClientRect();
      const currentY = event.clientY - rect.top;
      const scale = currentY > lastY ? 1.03 : 0.97;

      props.setScaleDelta(props.scaleDelta*scale);
      setLastY(currentY);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.style.cursor='row-resize';
    
    ctx.fillStyle = '#151924'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#2a2e39'
    ctx.fillRect(0, 0, 1, canvas.height)

    ctx.fillStyle = '#ffffff'
    ctx.fillText("50000", 10, canvas.height/2)

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', () => handleMouseMove(canvas));
    canvas.addEventListener('mouseout', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', () => handleMouseMove(canvas));
      canvas.removeEventListener('mouseout', handleMouseUp);
    }
  }, [handleMouseDown, handleMouseUp, handleMouseMove])

  return (
    <canvas ref={canvasRef} width={width} height={height}/>
  )
}

export default Price_scale
