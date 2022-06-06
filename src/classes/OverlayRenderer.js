class OverlayRenderer {
  constructor() {
    this.ctx;
    this.canvasWidth;
    this.canvasHeight;
    this.scaleCenter = 0;
    this.scaleDelta = 0;
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

  // Get price from cursor coordinates
  getPriceFromCoords(e) {
    const scaleMin = this.scaleCenter-this.scaleDelta;
    const scaleMax = this.scaleCenter+this.scaleDelta;
    const oldRange = scaleMax - scaleMin;
    const newRange = -this.canvasHeight;
    //return ((((value - scaleMin) * newRange) / oldRange) + 0)+this.canvasHeight;

    return ((e.offsetY-this.canvasHeight-0)*oldRange)/newRange+scaleMin;

    //console.log(e.offsetY, this.canvasHeight)
  }

  // Draw OHLC in top corner
  drawOHLC() {

    // TODO: This can probably be optimized later on
    this.ctx.fillStyle = '#444a9e'
    this.ctx.fillText(`O`, 10, 20)
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(`29673.0`, 20, 20)

    this.ctx.fillStyle = '#444a9e'
    this.ctx.fillText(`H`, 70, 20)
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(`29673.0`, 80, 20)

    this.ctx.fillStyle = '#444a9e'
    this.ctx.fillText(`L`, 130, 20)
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(`29673.0`, 140, 20)

    this.ctx.fillStyle = '#444a9e'
    this.ctx.fillText(`C`, 190, 20)
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(`29673.0`, 200, 20)
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

    // Draw OHLC
    this.drawOHLC();

    // Draw price near crosshair
    this.ctx.fillText(this.getPriceFromCoords(e), 10, this.canvasHeight-10)

    // DRAW!!
    this.ctx.draw;
  }

  // Sets candlestick data 
  setData(data) {
    this.data = data;
  }

  // Adjusts chart scale
  setScaleCenter(value) {
    this.scaleCenter = value;
  }

  // Set canvas Width
  setWidth(width) {
    this.canvasWidth = width;
  }

  // Set canvas Width
  setHeight(height) {
    this.canvasHeight = height;
  }

  // Set ctx
  setCtx(ctx) {
    this.ctx = ctx;
  }

  setScaleDelta(value) {
    this.scaleDelta = value;
  }
}

export default OverlayRenderer;
