// adapted from https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da

function adjustCanvas(canvas: HTMLCanvasElement) {
  //get DPI
  const dpi = window.devicePixelRatio; //get canvas
  fix_dpi(canvas, dpi);
}

function fix_dpi(canvas: HTMLCanvasElement, dpi: number) {
  //get CSS height
  //the + prefix casts it to an integer
  //the slice method gets rid of "px"
  const style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2); //get CSS width
  const style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2); //scale the canvas
  canvas.setAttribute("height", `${style_height * dpi}`);
  canvas.setAttribute("width", `${style_width * dpi}`);
}

export default adjustCanvas;
