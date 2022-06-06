import { setState, useState } from 'react';
import Bar from './Bar.js'

class ChartRenderer {
  constructor(barSpacing, backgroundColor) {
    this.barSpacing = barSpacing;
    this.backgroundColor = backgroundColor;
    this.canvasWidth;
    this.canvasHeight;
    this.candleWidth;
    this.scaleCenter = 0;
    this.scaleDelta = 0;
    this.ctx;
    this.data = [];
  }

  // Clears canvas
  clearCanvas() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.restore();
  }

  // Convert data values to chart coordinates
  priceToCoordinates(value) {
    const scaleMin = this.scaleCenter-this.scaleDelta;
    const scaleMax = this.scaleCenter+this.scaleDelta;
    const oldRange = scaleMax - scaleMin;
    const newRange = -this.canvasHeight;
    return Math.floor((((value - scaleMin) * newRange) / oldRange) + 0)+this.canvasHeight;
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
    const right_margin = 100;
    const candleWidth = this.candleWidth;
    const wickWidth = 1
    const bar_gap = Math.floor(candleWidth*1.2);
    const wickOffset = Math.floor(candleWidth/2);

    for (let i = 0; i < this.data.length; i++) {
      const coords = this.barToCoordinates(this.data[i]);
      const accumulation = this.data[i].close >= this.data[i].open;

      const xLoc = -i*bar_gap+this.canvasWidth-right_margin-candleWidth;

      // Set candle color
      this.ctx.fillStyle = accumulation ? "#ffffff" : "#5966e1"

      // Draw candle body
      this.ctx.fillRect(xLoc, coords.open, candleWidth, coords.close-coords.open)

      // Draw candle wick
      this.ctx.fillRect(xLoc+wickOffset, coords.low, wickWidth, coords.open-coords.close+coords.high-coords.low)

      this.data[i].setCoords({time: xLoc, open: coords.open, high: coords.high, low: coords.low, close: coords.close})
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

  // Set ctx
  setCtx(ctx) {
    this.ctx = ctx;
  }

  // Set canvas Width
  setWidth(width) {
    this.canvasWidth = width;
  }

  // Set canvas Width
  setHeight(height) {
    this.canvasHeight = height;
  }

  // Adjusts chart scale
  setScaleCenter(value) {
    this.scaleCenter = value;
  }

  setScaleDelta(value) {
    this.scaleDelta = value;
  }

  setCandleWidth(value) {
    this.candleWidth = value;
  }
}

export default ChartRenderer;
