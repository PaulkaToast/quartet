//variables//

//Classes//


//functions//
function initcanvas() {

    canvas = document.getElementById('tutorial');
    ctx = canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    draw();
}

function draw() {
   
    var stage = new createjs.Stage(canvas);
    var list = new Array();
   
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        
        var curr = new createjs.Shape();
        curr.graphics.beginStroke('rgba(0,'+ Math.floor(255 - 25 * i) + ',' 
                                        + Math.floor(255 - 25 * j) + ','
                                        + '0.5)').drawCircle(0, 0, 30);
        curr.x = 40 + j *70;
        curr.y = 40 + i *80;
        stage.addChild(curr);
        list.push(curr);
        stage.update();
      }
    }
}
