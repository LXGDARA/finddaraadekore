window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-100px";
  }
}



var canvas = document.querySelector('canvas');


canvas.height = window.outerHeight;
canvas.width = window.outerWidth;

var ctx = canvas.getContext('2d');
var linLength = 100;
var lin = [];
window.addEventListener('resize', function(){
    canvas.width = window.outerWidth;
    canvas.height = window.outerHeight;
});
var color = [

    "#BDC5F2",
    "#C9DFF2",
    "#C4EEF2",
    "#DAF2C2",
    "#DBF288"

];

function line(xCoor, yCoor , dx, dy , length, colorIndex){ // Line object

    this.xCoor = xCoor;
    this.yCoor = yCoor;
    this.dx = dx;
    this.dy = dy;
    this.linLength = length;
    ctx.strokeStyle = color[colorIndex];
    this.draw = function(){ // We draw our line
        // Creating Lines
        
        ctx.beginPath();
        ctx.moveTo(this.xCoor, this.yCoor);
        ctx.lineTo(this.xCoor+this.linLength, this.yCoor+this.linLength);
        ctx.stroke();
    }

    this.update = function(){ // we check if each line is in the screen's boundary or not
        
        ctx.strokeStyle = color[colorIndex];
        if( this.xCoor  <= -150){
           this.xCoor = outerWidth;
        }
       
        
        if(this.yCoor <=-150){
            this.yCoor = outerHeight;
        }
        this.xCoor += this.dx;
        this.yCoor += this.dy;

        //console.log(this.xCoor + " , " + this.yCoor);
        this.draw();
    }

}

function init(){
    for(var i = 0; i<100 ; i++){
        var length = (Math.random() * 100) + 30;
        var x = Math.random() *((innerWidth-30) - length*2) + length;
        var y = Math.random() * (outerHeight - length * 2) + length;
        var dx= Math.random()  - 0.5 * 8;
        var dy= Math.random() - 0.5 * 8;
        var colorIndex = Math.floor(Math.random() * 5);
        console.log(colorIndex);
        
        lin.push(new line(x, y, dx, dy, length, colorIndex));
        
    }
    //console.log(lin.length + ' lines created!');// debugging
}

function animate(){
    requestAnimationFrame(animate);
    //console.log('animating!');// debugging
    ctx.clearRect(0, 0, outerWidth, outerHeight);
   // console.log('screen cleared!');//debugging
    for(var i = 0; i<lin.length; i++){
        lin[i].update();
    }

    
    
}
init();
animate();

