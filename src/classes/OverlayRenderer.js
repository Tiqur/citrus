class OverlayRenderer {
  constructor() {
    this.ctx;
    this.data;
    this.candleWidth;
    this.canvasWidth;
    this.canvasHeight;
    this.magnetMode;
    this.measureTool;
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

    this.barHover = null;
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

  // Return mouse X pos or middle of candle ( if any )
  getCrosshairX(e) {
    const ctxOffsetX = -this.ctx.getTransform().e
    const middleOfCandle = this.convertToDateAxis(e.offsetX+ctxOffsetX);
    return middleOfCandle || e.offsetX+ctxOffsetX;
  }

  // Return mouse Y pos or OHLC if magnet mode enabled ( or any )
  getCrosshairY(e) {
    const ctxOffsetY = -this.ctx.getTransform().f;
    const mouseYPos = e.offsetY+ctxOffsetY;
    let y;

    // Horizontal line
    if (this.magnetMode && this.barHover) {
      const accumulation = this.barHover.open >= this.barHover.close;
      const middleTop = this.barHover.coords.high-(this.barHover.coords.high-(accumulation ? this.barHover.coords.open : this.barHover.coords.close))/2;
      const middleBottom = this.barHover.coords.low-(this.barHover.coords.low-(accumulation ? this.barHover.coords.close : this.barHover.coords.open))/2;
      const middle = this.barHover.coords.close-(this.barHover.coords.close-this.barHover.coords.open)/2;

      // Debugging
      //this.ctx.fillStyle = '#32CD32'
      //const ctxOffsetX = -this.ctx.getTransform().e
      //const middleOfCandle = this.convertToDateAxis(e.offsetX+ctxOffsetX);
      //this.ctx.fillRect(middleOfCandle-20, this.barHover.coords.open, 40, 2);
      //this.ctx.fillRect(middleOfCandle-20, this.barHover.coords.high, 40, 2);
      //this.ctx.fillRect(middleOfCandle-20, this.barHover.coords.low, 40, 2);
      //this.ctx.fillRect(middleOfCandle-20, this.barHover.coords.close, 40, 2);
      //this.ctx.fillStyle = '#ff0000'
      //this.ctx.fillRect(middleOfCandle-20, middleTop, 40, 2);
      //this.ctx.fillRect(middleOfCandle-20, middleBottom, 40, 2);
      //this.ctx.fillStyle = '#32CD32'
      //this.ctx.fillRect(middleOfCandle-20, middle, 40, 2);

      if (mouseYPos <= middleTop) {
        y = this.barHover.coords.high;
      } else if (mouseYPos > middleTop && mouseYPos <= middle) {
        y = accumulation ? this.barHover.coords.open : this.barHover.coords.close;
      } else if (mouseYPos > middle && mouseYPos <= middleBottom) {
        y = accumulation ? this.barHover.coords.close : this.barHover.coords.open;
      } else if (mouseYPos > middleBottom) {
        y = this.barHover.coords.low;
      } 
    }
    return y || mouseYPos;
  }

  // Draw crosshair
  drawCrosshair(e) {
    const [ctxOffsetX, ctxOffsetY] = [-this.ctx.getTransform().e, -this.ctx.getTransform().f]
    const x = this.getCrosshairX(e);
    const y = this.getCrosshairY(e);

    // Draw vertical and horizontal lines
    this.ctx.strokeStyle = '#ffffff'
    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();
    this.ctx.setLineDash([6, 6])

    // Vertical
    this.ctx.moveTo(x, ctxOffsetY);
    this.ctx.lineTo(x, this.canvasHeight+ctxOffsetY);

    // Horizontal
    this.ctx.moveTo(ctxOffsetX, y);
    this.ctx.lineTo(this.canvasWidth+ctxOffsetX, y);
    this.ctx.stroke();
  }

  // Get price from cursor coordinates
  getPriceFromCoords(e) {
    const scaleMin = this.scaleCenter-this.scaleDelta;
    const scaleMax = this.scaleCenter+this.scaleDelta;
    const oldRange = scaleMax - scaleMin;
    const newRange = -this.canvasHeight;
    return ((e.offsetY-this.ctx.getTransform().f-this.canvasHeight-0)*oldRange)/newRange+scaleMin;
  }

  // Draw OHLC in top corner
  drawOHLC() {
    if (this.barHover) {
      const [cX, cY] = [-this.ctx.getTransform().e, -this.ctx.getTransform().f]

      // TODO: This can probably be optimized later on
      this.ctx.fillStyle = '#444a9e'
      this.ctx.fillText(`O`, 10+cX, 20+cY)
      this.ctx.fillStyle = '#ffffff'
      this.ctx.fillText(this.barHover.open, 20+cX, 20+cY)

      this.ctx.fillStyle = '#444a9e'
      this.ctx.fillText(`H`, 70+cX, 20+cY)
      this.ctx.fillStyle = '#ffffff'
      this.ctx.fillText(this.barHover.high, 80+cX, 20+cY)

      this.ctx.fillStyle = '#444a9e'
      this.ctx.fillText(`L`, 130+cX, 20+cY)
      this.ctx.fillStyle = '#ffffff'
      this.ctx.fillText(this.barHover.low, 140+cX, 20+cY)

      this.ctx.fillStyle = '#444a9e'
      this.ctx.fillText(`C`, 190+cX, 20+cY)
      this.ctx.fillStyle = '#ffffff'
      this.ctx.fillText(this.barHover.close, 200+cX, 20+cY)
    }
  }

  drawPrice(e) {
    const [cX, cY] = [-this.ctx.getTransform().e, -this.ctx.getTransform().f]

    // Draw price near crosshair
    this.ctx.fillText(this.getPriceFromCoords(e), 10+cX, this.canvasHeight-10+cY)
  }

  // Draws everything on main chart
  draw(e) {
    // Exit context
    this.ctx.save();
    this.ctx.setTransform(1,0,0,1,0,0)

    // Clear canvas
    this.clearCanvas();

    // Draw OHLC
    this.drawOHLC();

    if (!e) return this.ctx.draw;

    this.convertToDateAxis(e);

    // Draw crosshair
    this.drawCrosshair(e);

    // Draw price
    this.drawPrice(e);

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

  setMagnetMode(magnetMode) {
    this.magnetMode = magnetMode;
  }

  setMeasureTool(measureTool) {
    this.measureTool = measureTool;
  }

  // Set data
  setData(data) {
    this.data = data;
  }

  // Set candleWidth
  setCandleWidth(candleWidth) {
    this.candleWidth = candleWidth;
    this.draw();
  }
  setScaleDelta(value) {
    this.scaleDelta = value;
  }
}

export default OverlayRenderer;
