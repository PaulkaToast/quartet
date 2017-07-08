//variables//

//Classes//
class Circle {

    constructor(x, y) {
        this.radius = 30; //radius 
        this.x = 40 + x * 80; //x cordinate
        this.y = 40 + y * 70; //y cordinate
        this.r = 0; //red
        this.b = Math.floor(255 - 25 * x); //blue
        this.g = Math.floor(255 - 25 * y); //green
        this.a = 0.5; //aplha
    }

    draw() {
        ctx.strokeStyle = 'rgba('     + this.r 
                                + ',' + this.b 
                                + ',' + this.g 
                                + ',' + this.a 
                                + ')';
        ctx.beginPath();
        ctx.arc(this.y, this.x, this.radius, 0, Math.PI * 2, true);
        ctx.stroke(); 
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

    var list = new Array();
   
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        
        var curr = new Circle(i,j);
        curr.draw();
        list.push(curr);

      }
    }
}

/*canvas.addEventListener('click', function(e) {
    
})*/