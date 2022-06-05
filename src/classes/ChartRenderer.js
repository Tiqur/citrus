import { setState, useState } from 'react';
import Bar from './Bar.js'

class ChartRenderer {
  constructor(ctx, barSpacing, barWidth, backgroundColor, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.barSpacing = barSpacing;
    this.barWidth = barWidth;
    this.backgroundColor = backgroundColor;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.scaleCenter = 0;
    this.scaleDelta = 0;
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
    const bar_gap = 25;
    const right_margin = 100;
    const candleWidth = 21;
    const wickOffset = Math.floor(candleWidth/2);

    for (let i = 0; i < this.data.length; i++) {
      const coords = this.barToCoordinates(this.data[i]);
      const accumulation = this.data[i].close >= this.data[i].open;

      const xLoc = -i*bar_gap+this.canvasWidth-right_margin-candleWidth;

      // Set candle color
      this.ctx.fillStyle = accumulation ? "#ffffff" : "#5966e1"

      // Draw candle body
      this.ctx.fillRect(xLoc, coords.open, 21, coords.close-coords.open)

      // Draw wicks
      if (accumulation) {
        //console.log(this.data[i], coords)
        this.ctx.fillRect(xLoc+wickOffset, coords.low, 1, coords.open-coords.close+coords.high-coords.low)
        //console.log(coords)
      } else {
        this.ctx.fillRect(xLoc+wickOffset, coords.low, 1, coords.open-coords.close+coords.high-coords.low)
      }
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

  // Adjusts chart scale
  setScaleCenter(value) {
    this.scaleCenter = value;
  }

  setScaleDelta(value) {
    this.scaleDelta = value;
  }
}

export default ChartRenderer;
