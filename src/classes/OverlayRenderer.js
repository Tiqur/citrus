class OverlayRenderer {
  constructor() {
    this.ctx;
    this.candleWidth;
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

  // Convert cursor X coordinates 
  convertToDateAxis(e) {
    const bar_gap = Math.floor(this.candleWidth*1.2);
    const bar_gapd2 = Math.floor(bar_gap/2);
    for (let i = 0; i < 100; i++) {
        const xLoc = -i*bar_gap+this.canvasWidth-100-this.candleWidth-bar_gapd2+this.candleWidth/2;

        // For debugging
        // Between candlesticks
        //if (e.offsetX > xLoc) this.ctx.fillStyle = '#444a9e'
        //if (e.offsetX < xLoc) this.ctx.fillStyle = '#ffffff'
        //this.ctx.fillRect(xLoc, 0, 1, this.canvasHeight)

        // Middle of candlestick
        const xLocAfter = (-i+1)*bar_gap+this.canvasWidth-100-this.candleWidth-bar_gapd2+this.candleWidth/2;
        if (e.offsetX > xLoc && e.offsetX < xLocAfter) {
          // Debugging
          //this.ctx.fillRect(xLoc+bar_gapd2, 0, 1, this.canvasHeight)
          return xLoc+bar_gapd2;
        }
    }
    //cause error so I dont forget where to code
  }

  // Draw crosshair
  drawCrosshair(e) {
    // Draw vertical and horizontal lines
    this.ctx.fillStyle = '#444a9e'
    const middleOfCandle = this.convertToDateAxis(e);
    this.ctx.fillRect(e.offsetX-this.canvasWidth, e.offsetY, this.canvasWidth*2, 1)
    this.ctx.fillRect(middleOfCandle, e.offsetY-this.canvasHeight, 1, this.canvasHeight*2)
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

    this.convertToDateAxis(e);

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

  // Set candleWidth
  setCandleWidth(candleWidth) {
    this.candleWidth = candleWidth;
  }
  setScaleDelta(value) {
    this.scaleDelta = value;
  }
}

export default OverlayRenderer;
