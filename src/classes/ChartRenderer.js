import Bar from './Bar.js'

class ChartRenderer {
  constructor(ctx, barSpacing, barWidth, backgroundColor, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.barSpacing = barSpacing;
    this.barWidth = barWidth;
    this.backgroundColor = backgroundColor;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.data = [];
  }

  // Clears canvas
  clearCanvas() {
    //ctx.clearRect(0, 0, canvas.width, canvas.heigth)
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.restore();
  }

  // Convert data values to chart coordinates
  priceToCoordinates(value) {
    const scaleMin = 150.0
    const scaleMax = 200.0
    const oldRange = (scaleMax - scaleMin)
    const newRange = (this.canvasHeight - 0)
    return (((value - scaleMin) * newRange) / oldRange) + 0;

  }

  barToCoordinates(b) {
    return {
      open: this.priceToCoordinates(b.open),
      high: this.priceToCoordinates(b.high),
      low: this.priceToCoordinates(b.low),
      close: this.priceToCoordinates(b.close)
    }
  }

  // Draws candles
  drawCandles() {
    this.ctx.fillStyle = '#5966e1';
    for (let i = 0; i < this.data.length; i++) {
      const coords = this.barToCoordinates(this.data[i]);
      this.ctx.fillRect(i*15, coords.open, 10, coords.close-coords.open)
      //this.ctx.fillStyle = '#5db97c'
      //this.ctx.fillRect(i*15, coords.high, 1, coords.close-coords.open)
      //console.log(this.data[i], coords)
    }
  }

  // Draws everything on main chart
  draw() {
    // Exit context
    this.ctx.save();
    this.ctx.setTransform(1,0,0,1,0,0)

    // Clear canvas
    this.clearCanvas();

    // Draw Candles
    this.drawCandles();

    // FOR TESTING
    //this.ctx.fillStyle = '#ec3a21'
    //this.ctx.fillRect(this.canvasWidth/2, this.canvasHeight/2, 50, 50)

    // DRAW!!
    this.ctx.draw;
  }

  // Sets candlestick data 
  setData(data) {
    this.data = data;
  }
}

export default ChartRenderer;
