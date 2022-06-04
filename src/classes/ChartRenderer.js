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

  // Draws candles obviously
  drawCandles() {
    this.ctx.fillStyle = '#3179f5'
    for (let i=0; i<this.data.length; i++) {
      this.ctx.fillRect(i*10, this.data[i].open, 10, this.data[i].close)
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
    this.ctx.fillStyle = '#ec3a21'
    this.ctx.fillRect(this.canvasWidth/2, this.canvasHeight/2, 50, 50)

    // DRAW!!
    this.ctx.draw;
  }

  // Sets candlestick data 
  setData(data) {
    this.data = data;
  }
}

export default ChartRenderer;
