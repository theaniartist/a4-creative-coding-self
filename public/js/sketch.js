window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

document.onselectstart = function() {
  return false;
};
const secCanvas = document.getElementById('secCanvas');
var contx = secCanvas.getContext('2d');
var dpr = window.devicePixelRatio;
var cw = window.innerWidth;
var ch = window.innerHeight;
secCanvas.width = cw * dpr;
secCanvas.height = ch * dpr;
contx.scale(dpr, dpr);
var rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}
contx.lineCap = 'round';
var orbs = [];
var orbCount = 30;
var radius;

function createOrb(mx,my){
  var dx = (cw/2) - mx;
	var dy = (ch/2) - my;
	var dist = Math.sqrt(dx * dx + dy * dy);
	var angle = Math.atan2(dy, dx);
	orbs.push({
		x: mx,
		y: my,
		lastX: mx,
		lastY: my,
		hue: 0,
		colorAngle: 0,
		angle: angle + Math.PI/2,
		//size: .5+dist/250,
		size: rand(1,3)/2,
		centerX: cw/2,
		centerY: ch/2,		
		radius: dist,
		speed: (rand(5,10)/1000)*(dist/750)+.015,
		alpha: 1 - Math.abs(dist)/cw,
		draw: function() {			
			contx.strokeStyle = 'hsla('+this.colorAngle+',100%,50%,1)';	
			contx.lineWidth = this.size;			
			contx.beginPath();
			contx.moveTo(this.lastX, this.lastY);
			contx.lineTo(this.x, this.y);
			contx.stroke();
		},	
		update: function(){
			var mx = this.x;
			var my = this.y;	
			this.lastX = this.x;
			this.lastY = this.y;
			var x1 = cw/2;
			var y1 = ch/2;
			var x2 = mx;
			var y2 = my;		
			var rise = y1-y2;
			var run = x1-x2;
			var slope = -(rise/run);
			var radian = Math.atan(slope);
			var angleH = Math.floor(radian*(180/Math.PI));		
			if(x2 < x1 && y2 < y1){angleH += 180;}		
			if(x2 < x1 && y2 > y1){angleH += 180;}		
			if(x2 > x1 && y2 > y1){angleH += 360;}		
			if(y2 < y1 && slope =='-Infinity'){angleH = 90;}		
			if(y2 > y1 && slope =='Infinity'){angleH = 270;}		
			if(x2 < x1 && slope =='0'){angleH = 180;}
			if(isNaN(angleH)){angleH = 0;}
			
			this.colorAngle = angleH;
			this.x = this.centerX + Math.sin(this.angle*-1) * this.radius;
			this.y = this.centerY + Math.cos(this.angle*-1) * this.radius;
			this.angle += this.speed;
		
		}
	});
}

function orbGo(e){
	var mx = e.pageX - secCanvas.offsetLeft;
	var my = e.pageY - secCanvas.offsetTop;		
	createOrb(mx,my);
}

function turnOnMove(){
	secCanvas.addEventListener('mousemove', orbGo, false);	
}

function turnOffMove(){
	secCanvas.removeEventListener('mousemove', orbGo, false);	
}


function clear(){
 orbs = []; 
}

secCanvas.addEventListener('mousedown', orbGo, false);
secCanvas.addEventListener('mousedown', turnOnMove, false);
secCanvas.addEventListener('mouseup', turnOffMove, false);

var count = 100;
while(count--){
		createOrb(cw/2, ch/2+(count*2));
}

var loop = function(){
  window.requestAnimFrame(loop);
	
	contx.clearRect(0,0,cw,ch);
	
	var i = orbs.length;
	while(i--){	
		var orb = orbs[i];	
		var updateCount = 3;
		while(updateCount--){
		orb.update();		
		orb.draw(contx);
		}
		
	}
}
            
loop();