iter_threshold = 100;
zoom = 300;
y_offset_px = -300;
x_offset_px = -500;

mandelbrot_canvas;

function registerCanvas(canvas){
    mandelbrot_canvas = canvas
}

function isPartOfMandelbrot(real, imaginary){
    c = [real, imaginary];
    k = calcIteration([0, 0], [real, imaginary]);
    first_k = k;
    i = 0;
    for(i; i < iter_threshold; i++){
        k = calcIteration(k, c);
        if(absoluteOfComplexNum(k) > 2){
            return false;
        }
        if(k == first_k){
          break;
        }
    }
    return [true,i];
}

function calcIteration(k, c){
    realPart      = ((k[0] ** 2) - (k[1] ** 2)) + c[0];
    imaginaryPart = (2 * k[0] * k[1]) + c[1];
    return [realPart, imaginaryPart];
}

function absoluteOfComplexNum(cplx){
    return Math.sqrt((cplx[0]**2) + (cplx[1]**2));
}

function zoomIn(percentage){
  zoom = zoom * (1 + percentage);
  fillCanvas()
}

function zoomOut(percentage){
  zoom = zoom * (1 - percentage);
  fillCanvas();
}

function moveLeft(px){
  x_offset_px = x_offset_px - px;
  fillCanvas();
}

function moveRight(px){
  x_offset_px = x_offset_px + px;
  fillCanvas();
}

function moveUp(px){
  y_offset_px = y_offset_px - px;
  fillCanvas();
}

function moveDown(px){
  y_offset_px = y_offset_px + px;
  fillCanvas();
}

function fillCanvas(){
  context = mandelbrot_canvas.getContext('2d');
  context.clearRect(0, 0, mandelbrot_canvas.width, mandelbrot_canvas.height);
  width = mandelbrot_canvas.width;
  height = mandelbrot_canvas.height;


  for(row = 0; row < height; row++){
    for(col = 0; col < width; col++){
      res = isPartOfMandelbrot((col+ x_offset_px)/zoom, (row + y_offset_px)/zoom);
      iters = res[1];

      if(res[0]){
        //context.fillStyle = hslToHex(hsl(120, 100, 50));
        context.fillRect( col, row, 1, 1);
      }
    }
  }
}
