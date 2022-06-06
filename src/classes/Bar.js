class Bar {
  constructor(time, open, high, low, close) {
    this.time = time;
    this.open = open;
    this.high = high;
    this.low = low;
    this.close = close;
    this.coords;
  }

  setCoords(coords) {
    this.coords = coords;
  }
}
export default Bar;

