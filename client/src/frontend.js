import createjs from 'createjs';
import Tone from 'tone';
import Color from './color';

const http = require('http');
const querystring = require('querystring');

// variables//
let speed;
let stage;
let ctx;
let canvas;

let play;
let pause;
let line;
let stop;
let cSize;

let tempoInput;

const circles = [];
// const sounds = ['bang', 'clap', 'ding', 'ding2', 'pop', 'shutter', 'tap', 'valve'];
const sounds = ['A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5', 'C6', 'Db6'];
const rowNum = sounds.length;
const colNum = 16;
const synth = new Tone.PolySynth(rowNum, Tone.Synth).toMaster();

const noteRadius = 30;
const noteMargin = 10;
const sizeRatio = 1300;

// Classes//
class PauseButton {
    constructor() {
        this.color = new Color(247, 239, 0, 0.5);

        this.alphaStroke = 0.5;
        this.alphaFill = 0.1; // aplha fill
        this.clicked = false;

        this.shape = new createjs.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        stage.addChild(this.shape);
        this.shape.on('click', this.onClick.bind(this));
        this.shape.on('mouseover', this.mouseOver.bind(this));
        this.shape.on('mouseout', this.mouseOut.bind(this));
    }
    draw() {
        this.x = 150 * (cSize / sizeRatio);
        this.y = cSize - (70 * (cSize / sizeRatio));
        this.length = 51 * (cSize / sizeRatio);
        this.width = 17 * (cSize / sizeRatio);
        this.shape.graphics.clear()
            .beginFill(this.color.setAlpha(this.alphaFill).toString())
            .setStrokeStyle(3 * (cSize / sizeRatio), 'round', 'round')
            .beginStroke(this.color.setAlpha(this.alphaStroke).toString())
            .drawRect(this.x + (this.width * 2), this.y, this.width, this.length)
            .drawRect(this.x + (this.width * 4), this.y, this.width, this.length)
            .endFill()
            .endStroke();
    }
    drawAndUpdate() {
        this.draw();
        stage.update();
    }
    unclick() {
        if (this.clicked) {
            this.alphaFill = 0.1;
        }
        this.clicked = false;
        this.drawAndUpdate();
    }
    onClick() {
        if (!this.clicked) {
            this.alphaFill = 0.5;
        } else {
            this.alphaFill = 0.1;
        }
        play.unclick();
        stop.unclick();
        this.clicked = !this.clicked;
        this.drawAndUpdate();
        line.drawAndUpdate();
    }
    mouseOver() {
        this.alphaStroke = 1;
        this.drawAndUpdate();
    }
    mouseOut() {
        this.alphaStroke = 0.5;
        this.drawAndUpdate();
    }
}
class StopButton {
    constructor() {
        this.color = new Color(247, 0, 0, 0.5);

        this.alphaStroke = 0.5;
        this.alphaFill = 0.1;
        this.clicked = false;

        this.shape = new createjs.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        stage.addChild(this.shape);
        this.shape.on('click', this.onClick.bind(this));
        this.shape.on('mouseover', this.mouseOver.bind(this));
        this.shape.on('mouseout', this.mouseOut.bind(this));
    }
    draw() {
        this.x = 20 * (cSize / sizeRatio);
        this.y = cSize - (70 * (cSize / sizeRatio));
        this.side = 51 * (cSize / sizeRatio);

        this.shape.graphics.clear()
            .beginFill(this.color.setAlpha(this.alphaFill).toString())
            .setStrokeStyle(3 * (cSize / sizeRatio), 'round', 'round')
            .beginStroke(this.color.setAlpha(this.alphaStroke).toString())
            .drawRect(this.x, this.y, this.side, this.side)
            .endFill()
            .endStroke();
    }
    drawAndUpdate() {
        this.draw();
        stage.update();
    }
    unclick() {
        if (this.clicked) {
            this.alphaFill = 0.1;
        }
        this.clicked = false;
        this.drawAndUpdate();
    }
    onClick() {
        if (!this.clicked) {
            this.alphaFill = 0.5;
        } else {
            this.alphaFill = 0.1;
        }
        play.unclick();
        pause.unclick();
        this.clicked = !this.clicked;
        this.drawAndUpdate();
        line.drawAndUpdate();
    }
    mouseOver() {
        this.alphaStroke = 1;
        this.drawAndUpdate();
    }
    mouseOut() {
        this.alphaStroke = 0.5;
        this.drawAndUpdate();
    }
}
class PlayButton {
    constructor() {
        this.color = new Color(0, 237, 27, 0.5);

        this.alphaStroke = 0.5; // aplha
        this.alphaFill = 0.1; // aplha fill
        this.clicked = false;

        this.shape = new createjs.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        stage.addChild(this.shape);
        this.shape.on('click', this.onClick.bind(this));
        this.shape.on('mouseover', this.mouseOver.bind(this));
        this.shape.on('mouseout', this.mouseOut.bind(this));
    }
    draw() {
        this.x = 100 * (cSize / sizeRatio);
        this.y = cSize - (70 * (cSize / sizeRatio));
        this.side = 51 * (cSize / sizeRatio);

        this.shape.graphics.clear()
            .beginFill(this.color.setAlpha(this.alphaFill).toString())
            .setStrokeStyle(3 * (cSize / sizeRatio), 'round', 'round')
            .beginStroke(this.color.setAlpha(this.alphaStroke).toString())
            .moveTo(this.x, this.y)
            .lineTo(this.x, this.y + this.side)
            .lineTo(this.x + this.side, this.y + (this.side / 2))
            .lineTo(this.x, this.y)
            .endFill()
            .endStroke();
    }
    drawAndUpdate() {
        this.draw();
        stage.update();
    }
    unclick() {
        if (this.clicked) {
            this.alphaFill = 0.1;
        }
        this.clicked = false;
        this.drawAndUpdate();
    }
    onClick() {
        if (!this.clicked) {
            this.alphaFill = 0.5;
        } else {
            this.alphaFill = 0.1;
        }
        stop.unclick();
        pause.unclick();
        this.clicked = !this.clicked;
        this.drawAndUpdate();
        line.drawAndUpdate();
    }
    mouseOver() {
        this.alphaStroke = 1;
        this.drawAndUpdate();
    }
    mouseOut() {
        this.alphaStroke = 0.5;
        this.drawAndUpdate();
    }
}

class Circle {
    constructor(i, j, s) {
        this.sound = s;
        this.column = i;
        this.row = j;
        this.color = new Color(
            0,
            Math.floor(255 - (5 * j)),
            Math.floor(255 - (25 * i)),
            0.5);

        this.alphaStroke = 0.5; // aplha
        this.clicked = false;
        this.played = false;

        this.shape = new createjs.Shape();

        this.text = new createjs.Text(this.sound, `${cSize / 80}px Helvetica`, this.color);
        this.text.textAlign = 'center';

        stage.addChild(this.shape);
        stage.addChild(this.text);
        this.shape.on('click', this.onClick.bind(this));
        this.shape.on('mouseover', this.mouseOver.bind(this));
        this.shape.on('mouseout', this.mouseOut.bind(this));
    }

    draw() {
        this.radius = noteRadius * (cSize / sizeRatio); // radius
        this.x = (noteRadius + noteMargin + this.column * (noteRadius * 2 + noteMargin)) * (cSize / sizeRatio); // x cordinate
        this.y = (noteRadius + noteMargin + this.row * (noteRadius * 2 + noteMargin)) * (cSize / sizeRatio); // y cordinate
        this.shape.x = this.x;
        this.shape.y = this.y;
        this.text.x = this.x;
        this.text.y = this.y - (cSize / 160);
        this.text.font = `${cSize / 80}px Helvetica`;

        this.shape.graphics.clear()
            .beginFill(this.color.setAlpha(this.clicked ? 0.5 : 0.1).toString())
            .setStrokeStyle(3 * (cSize / sizeRatio), 'round', 'round')
            .beginStroke(this.color.setAlpha(this.alphaStroke).toString())
            .drawCircle(0, 0, this.radius)
            .endFill()
            .endStroke();
    }
    drawAndUpdate() {
        this.draw();
        stage.update();
    }
    onClick() {
        this.clicked = !this.clicked;
        if (this.clicked) playSound(this.sound);

        const data = querystring.stringify({
            row: this.row,
            col: this.column,
            toggle: this.clicked,
        });
        const params = {
            hostname: window.location.hostname,
            port: window.location.port,
            path: '/state',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length,
            },
        };
        const request = http.request(params, () => { });
        request.write(data);
        request.end();

        this.drawAndUpdate();
    }
    mouseOver() {
        this.alphaStroke = 1;
        this.drawAndUpdate();
    }
    mouseOut() {
        this.alphaStroke = 0.5;
        this.drawAndUpdate();
    }
}
class Line {
    constructor() {
        this.x = 0; // x cordinate
        this.y = 0; // y cordinate
        this.color = new Color(255, 0, 0, 0.5);
        this.moving = false;

        this.shape = new createjs.Shape();
        this.shape.x = this.x;
        this.shape.y = this.y;
        stage.addChild(this.shape);
    }

    draw() {
        this.length = (noteRadius * 2 * rowNum + noteMargin * (rowNum + 1)) * (cSize / sizeRatio);

        if (stop.clicked) {
            this.color = new Color(255, 0, 0, 0.5);
            this.x = 0;
        }
        if (play.clicked) {
            this.color = new Color(0, 237, 27, 0.5);
        }
        if (pause.clicked) {
            this.color = new Color(247, 239, 0, 0.5);
        }
        this.shape.graphics.clear()
            .setStrokeStyle(15 * (cSize / sizeRatio), 'round', 'round')
            .beginStroke(this.color.toString())
            .moveTo(this.x, this.y)
            .lineTo(this.x, this.length)
            .endStroke();
    }
    drawAndUpdate() {
        this.draw();
        stage.update();
    }
}


// functions//
function loadSound() {
    createjs.Sound.registerSound('sounds/A4.wav', sounds[0]);
    createjs.Sound.registerSound('sounds/As4.wav', sounds[1]);
    createjs.Sound.registerSound('sounds/B4.wav', sounds[2]);
    createjs.Sound.registerSound('sounds/C5.wav', sounds[3]);
    createjs.Sound.registerSound('sounds/Cs5.wav', sounds[4]);
    createjs.Sound.registerSound('sounds/D5.wav', sounds[5]);
    createjs.Sound.registerSound('sounds/Ds5.wav', sounds[6]);
    createjs.Sound.registerSound('sounds/E5.wav', sounds[7]);
}
function playSound(s) {
    synth.triggerAttackRelease(s, `${1 / speed}s`);
    // createjs.Sound.play(s);
}

const clicked = [];

function draw() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].draw();
    }
    play.draw();
    stop.draw();
    pause.draw();
    line.draw();

    stage.update();
}
function initCanvas() {
    loadSound();
    canvas = document.getElementById('tutorial');
    ctx = canvas.getContext('2d');
    tempoInput = document.getElementById('tempo-input');
    updateSpeed();

    const params = {
        hostname: window.location.hostname,
        port: window.location.port,
        path: '/state',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': 0,
        },
    };
    const request = http.request(params, (response) => {
        response.on('data', (chunk) => {
            for (let i = 0; i < chunk.length; i++) {
                clicked.push(chunk[i]);
            }
        });
        response.on('end', () => {
            stage = new createjs.Stage(canvas);
            stage.enableMouseOver(30);

            for (let j = 0; j < rowNum; j++) {
                for (let i = 0; i < colNum; i++) {
                    const curr = new Circle(i, j, sounds[j]);
                    if (clicked[i + j * colNum] === 116) {
                        curr.clicked = true;
                    }
                    circles.push(curr);
                }
            }

            play = new PlayButton();
            stop = new StopButton();
            pause = new PauseButton();
            line = new Line();
            createjs.Ticker.interval = 1;
            createjs.Ticker.framerate = 30;
            createjs.Ticker.addEventListener('tick', tick);

            window.reInitCanvas();
        });
    });
    request.end();
}
window.initCanvas = initCanvas;
function reInitCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    cSize = 0;
    if (ctx.canvas.width > ctx.canvas.height) {
        cSize = ctx.canvas.height;
    } else {
        cSize = ctx.canvas.width;
    }

    draw();
}
window.reInitCanvas = reInitCanvas;
function tick(/* e */) {
    if (play.clicked) {
        for (const c of circles) {
            if (line.x < c.x + c.radius && line.x > c.x - c.radius) {
                if (c.clicked && !c.played) {
                    playSound(c.sound);
                    c.played = true;
                }
            } else {
                c.played = false;
            }
        }
        if (line.x < (colNum * (noteMargin + noteRadius * 2) * (cSize / sizeRatio))) {
            line.x += speed * 2.5 * (cSize / sizeRatio);
            line.draw();
            stage.update();
        } else {
            line.x = 0;
        }
    }
}

function updateSpeed() {
    speed = Math.abs(parseFloat(tempoInput.value));
    tempoInput.value = speed;
}
window.updateSpeed = updateSpeed;

