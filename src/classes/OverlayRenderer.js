class OverlayRenderer {
  constructor(ctx, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  // Clears canvas
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.ctx.restore();
  }

  // Draw crosshair
  drawCrosshair(e) {
    // Draw vertical and horizontal lines
    this.ctx.fillStyle = '#444a9e'
    this.ctx.fillRect(e.offsetX-this.canvasWidth, e.offsetY, this.canvasWidth*2, 1)
    this.ctx.fillRect(e.offsetX, e.offsetY-this.canvasHeight, 1, this.canvasHeight*2)
  }

  // Draws everything on main chart
  draw(e) {
    // Exit context
    this.ctx.save();
    this.ctx.setTransform(1,0,0,1,0,0)

    // Clear canvas
    this.clearCanvas();

    // Draw crosshair
    this.drawCrosshair(e);

    // DRAW!!
    this.ctx.draw;
  }

  // Sets candlestick data 
  setData(data) {
    this.data = data;
  }
}

export default OverlayRenderer;
