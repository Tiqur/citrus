import { useRef, useEffect, useState, setState } from 'react';

function Price_scale(props) {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(0);
  const width = 60;
  const height = props.height;

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.style.cursor='row-resize';
    
    ctx.fillStyle = '#151924'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#2a2e39'
    ctx.fillRect(0, 0, 1, canvas.height)


    ctx.fillStyle = '#ffffff'
    ctx.fillText("50000", 10, canvas.height/2)


    let mouseDown = false;
    let startPosY = 0;

    canvas.addEventListener('mousedown', function() { 
      console.log('mousedown')
      let rect = canvas.getBoundingClientRect();
      startPosY=event.clientY - rect.top;
      mouseDown=true;
    }, false);

    canvas.addEventListener('mouseup', function() {
      console.log('mouseup')
      mouseDown=false;
      console.log(scale)
    }, false);

    canvas.addEventListener('mousemove', function() {
      if (mouseDown) {
        //console.log('mousemove')
      let rect = canvas.getBoundingClientRect();
        setScale(scale+event.clientY - rect.top - startPosY);
      }
    }, false);

    ctx.draw
  })

  return (
    <canvas ref={canvasRef} width={width} height={height}/>
  )
}

export default Price_scale
