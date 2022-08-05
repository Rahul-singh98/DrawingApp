document.onkeydown = keydown;
function keydown(evt){
    if (evt.ctrlKey && (evt.keyCode == 122 || evt.keyCode == 90 )){ 
      undo();
    }
}

var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var restore_array = [];
index = -1;

var col = "black",
    size = 2;

function init() {
    var candiv = document.getElementById('candiv');
    var candivHeight = candiv.offsetHeight;
    var candivWidth = candiv.offsetWidth;
    console.log(candivWidth, candivHeight);

    canvas = document.createElement('canvas');
    canvas.height = candivHeight;
    canvas.width = candivWidth;
    canvas.classList.add('border');
    canvas.style.cursor = 'crosshair';
    canvas.style

    candiv.appendChild(canvas);

    ctx = canvas.getContext("2d");

    w = canvas.width;
    h = canvas.height;


    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);

    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);

    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);

    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = col;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }

    if (res == 'up' || res == "out") {
        flag = false;
        
        if (e.type != 'mouseout') {
            restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            index += 1;
        }
    }

    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw(e);
        }
    }
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = col;
    ctx.lineWidth = size;
    ctx.stroke();
    ctx.closePath();
}



function color(obj) {
    switch (obj.id) {
        case "green":
            col = "green";
            break;
        case "blue":
            col = "blue";
            break;
        case "red":
            col = "red";
            break;
        case "yellow":
            col = "yellow";
            break;
        case "orange":
            col = "orange";
            break;
        case "black":
            col = "black";
            break;
        case "white":
            col = "white";
            break;
    }
    if (col == "white"){
        size = 20;
        // canvas.style.cursor = ;
    } 
    else size = 2;
}


function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        restore_array = [];
        index = -1;
    }
}

function undo() {
    if (index <= 0) {
        ctx.clearRect(0, 0, w, h);
        restore_array = [];
        index = -1;
    }
    else {
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index], 0, 0);
    }
}