class OverlayRenderer {
  constructor() {
    this.ctx;
    this.data;
    this.candleWidth;
    this.canvasWidth;
    this.canvasHeight;
    this.barHover; // What bar is being hovered over atm
    this.scaleCenter = 0;
    this.scaleDelta = 0;
  }

  // Clears canvas
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.ctx.restore();
  }

  // Convert cursor X coordinates 
  convertToDateAxis(xPos) {
    const wickOffset = Math.floor(this.candleWidth/2);
    const bar_gap = Math.floor(this.candleWidth*1.2);

    // FOR DEBUGGING ( between candlesticks )
    //for (let i = 0; i < this.data.length; i++) {
    //    const coords = this.data[i].coords;
    //    const middle = coords.time+Math.floor((this.candleWidth-bar_gap)/2);
    //    if (e.offsetX > middle) this.ctx.fillStyle = '#444a9e'
    //    if (e.offsetX < middle) this.ctx.fillStyle = '#ffffff'
    //    this.ctx.fillRect(middle, 0, 1, this.canvasHeight)
    //}

    for (let i = 0; i < this.data.length; i++) {
        const coords = this.data[i].coords;
        const middle = coords.time + Math.floor((this.candleWidth-bar_gap)/2);

        // Middle of candlestick
        if (xPos > middle) {
          this.barHover = this.data[i];
          return coords.time+wickOffset;
        }
    }
  }

  // Draw crosshair
  drawCrosshair(e) {
    console.log(this.ctx)
    const ctxOffsetX = this.ctx.mozCurrentTransformInverse[4];
    const ctxOffsetY = this.ctx.mozCurrentTransformInverse[5];
    const middleOfCandle = this.convertToDateAxis(e.offsetX+ctxOffsetX);

    // Draw vertical and horizontal lines
    this.ctx.strokeStyle = '#ffffff'
    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();
    this.ctx.setLineDash([6, 6])

    // Vertical
    this.ctx.moveTo(middleOfCandle, ctxOffsetY);
    this.ctx.lineTo(middleOfCandle, this.canvasHeight+ctxOffsetY);
    this.ctx.stroke();

    // Horizontal
    this.ctx.moveTo(ctxOffsetX, e.offsetY+ctxOffsetY);
    this.ctx.lineTo(this.canvasWidth+ctxOffsetX, e.offsetY+ctxOffsetY);
    this.ctx.stroke();
  }

  // Get price from cursor coordinates
  getPriceFromCoords(e) {
    const scaleMin = this.scaleCenter-this.scaleDelta;
    const scaleMax = this.scaleCenter+this.scaleDelta;
    const oldRange = scaleMax - scaleMin;
    const newRange = -this.canvasHeight;
    return ((e.offsetY-this.canvasHeight-0)*oldRange)/newRange+scaleMin;
  }

  // Draw OHLC in top corner
  drawOHLC() {
    // TODO: This can probably be optimized later on
    this.ctx.fillStyle = '#444a9e'
    this.ctx.fillText(`O`, 10, 20)
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(this.barHover.open, 20, 20)

    this.ctx.fillStyle = '#444a9e'
    this.ctx.fillText(`H`, 70, 20)
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(this.barHover.high, 80, 20)

    this.ctx.fillStyle = '#444a9e'
    this.ctx.fillText(`L`, 130, 20)
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(this.barHover.low, 140, 20)

    this.ctx.fillStyle = '#444a9e'
    this.ctx.fillText(`C`, 190, 20)
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(this.barHover.close, 200, 20)
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

  // Set data
  setData(data) {
    this.data = data;
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
