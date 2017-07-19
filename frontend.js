//variables//

//Classes//
class Circle {

    constructor(x, y, cSize) {
        this.radius = 30*(cSize/570); //radius
        this.x = (40 + x * 70)*(cSize/570); //x cordinate
        this.y = (40 + y * 70)*(cSize/570); //y cordinate
        this.r = 0; //red
        this.b = Math.floor(255 - 25 * x); //blue
        this.g = Math.floor(255 - 5 * y); //green
        this.a = 0.5; //aplha
        this.af = 0.1; //aplha fill
        this.cSize = cSize;
        this.clicked = false;

        this.shape = new createjs.Shape();
        this.shape.x = this.x;
        this.shape.y = this.y;
        stage.addChild(this.shape);
        this.shape.on("click", this.onClick.bind(this));
        this.shape.on("mouseover", this.mouseOver.bind(this));
        this.shape.on("mouseout", this.mouseOut.bind(this));
    }

    draw() {
        this.shape.graphics.clear()
        .beginFill('rgba('
            + this.r + ','
            + this.g + ','
            + this.b + ','
            + this.af + ')')
        .setStrokeStyle(3*(this.cSize/570), 'round', 'round')
        .beginStroke('rgba('
            + this.r + ','
            + this.g + ','
            + this.b + ','
            + this.a + ')')
        .drawCircle(0, 0, this.radius);
    }
    drawAndUpdate(){
        this.draw();
        stage.update();
    }
    onClick(e) {
        if (!this.clicked) {
            this.a = 1;
        } else {
            this.a = 0.5;
        }
        this.clicked = !this.clicked;
        this.drawAndUpdate();
    }
    mouseOver(e) {
        this.af = 0.3;
        this.drawAndUpdate();
    }
    mouseOut(e) {
        this.af = 0.1;
        this.drawAndUpdate();
    }
}

//functions//
function initcanvas() {
    canvas = document.getElementById('tutorial');
    ctx = canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    draw();
}

function draw() {
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(30);
    var list = new Array();
    var cSize = 0;
    if( ctx.canvas.width > ctx.canvas.height){
      cSize = ctx.canvas.height;
    }else{
      cSize = ctx.canvas.width;
    }

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var curr = new Circle(i, j, cSize);
        curr.draw();
        list.push(curr);
      }
    }
    stage.update();
}
