(function(){
  var cav=document.getElementById("countDown")
  const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
  //set cav's width and height 
  cav.width=1690
  cav.height=980
  var ctx=cav.getContext("2d");
  //define circle radius
  var radius=13;
  //define color 
  var color="#aaa";
  //define speed
  const SPEEDX=[-4,-2,3,5]
//define total balls
  const ballsNumber=1000
  //define location
   var hourBegin=50
   var hourBegin2=275
   var firstColonBegin=500
   var minuteBegin=650
   var minuteBegin2=875
   var lastColonBegin=1100
   var secondBegin=1250
   var secondBegin2=1475
   var verticalBegin=50


  /*param:coordinates(x,y)
   *return:null
   *result:draw a circle
   */
   function drawCircle(aguX,aguY,aguColor){
   	 ctx.beginPath();
   	 ctx.arc(aguX,aguY,radius,0,2*Math.PI)
   	 if (typeof aguColor == 'undefined') {
   	 	aguColor=color;
   	 }
  	 ctx.fillStyle=aguColor;
  	 ctx.closePath();
  	 ctx.fill();
   }
   drawCircle(980,20);
   

   /*param1:number or colon
	*param2:begin position 
    */
    function drawNumber(number,beginPos,aguColor) {
    	var x=number;
    	for(var i=0,len=data[x].length;i<len;i++){
    		for(var j=0,lens=data[x][i].length;j<lens;j++){
    			if(data[x][i][j]){
    				var posX=beginPos+30*j;
    				var posY=verticalBegin+30*i;
    				drawCircle(posX,posY,aguColor);
    			}
    		}
    	}
    }//end fun

   

    /*function draw timer
    *param:hour,minute,second
    */
    function drawTimer(hour,minute,second) {
    	var hour1=parseInt(hour/10);
    	var hour2=hour%10;
    	var minute1=parseInt(minute/10);
    	var minute2=minute%10;
    	var second1=parseInt(second/10);
    	var second2=second%10;
    	// console.log('result'+hour1+hour2+minute1+minute2+second1+second2);
    	// ctx.save();
    	// ctx.clearRect(0,0,1690,980);
    	drawNumber(hour1,hourBegin);
    	drawNumber(hour2,hourBegin2);
    	drawNumber(10,firstColonBegin);
    	drawNumber(minute1,minuteBegin);
    	drawNumber(minute2,minuteBegin2);
    	drawNumber(10,lastColonBegin);
    	drawNumber(second1,secondBegin);
    	drawNumber(second2,secondBegin2);
    	// ctx.restore();
    }

    //define array which for information of balls
     var balls=[]

    /*
	*function get moveing balls into array
    */
    function getMovingBalls(number,beginPos) {
    	var x=number;
    	for(var i=0,len=data[x].length;i<len;i++){
    		for(var j=0,lens=data[x][i].length;j<lens;j++){
    			if(data[x][i][j]){
    				var posX=beginPos+30*j;
    				var posY=verticalBegin+30*i;
    				// drawCircle(posX,posY,aguColor);
    				var colorIndex=parseInt(Math.random()*10)
    			    var color=colors[colorIndex]
    			    var speedXIndex=parseInt(Math.random()*4)
    			    var ballSpeedX=SPEEDX[speedXIndex]

    			    var point={X:posX,
    			    		   Y:posY,
    			    		   C:color,
    			    		   SX:ballSpeedX,
    			    		   SY:-10}
    			    balls.push(point)
    			    if(balls.length>ballsNumber){
			  			balls.shift()
			  		}
			  		console.log(balls.length)
    			}
    		}
    	}
    }//end function

     /*
	*function draw moving balls
    */
    function drawMovingBalls() {
    	for(var i=0,len=balls.length;i<len;i++){
    		ctx.save()
    		drawCircle(balls[i].X,balls[i].Y,balls[i].C)
    		ctx.restore()
    		if(balls[i].Y>965){
    			balls[i].SY=-balls[i].SY*0.5
    		}
    		balls[i].X+=balls[i].SX
    		balls[i].Y+=balls[i].SY
    		balls[i].SY+=2
    	}
    }

     function drawHeart(color) {
     	ctx.clearRect(0,0,1690,980)
     	ctx.save();
	    drawNumber(13,hourBegin,color);
		drawNumber(14,hourBegin2,color);
		// drawNumber(10,firstColonBegin);
		drawNumber(13,minuteBegin,color);
		drawNumber(14,minuteBegin2,color);
		// drawNumber(10,lastColonBegin);
		drawNumber(13,secondBegin,color);
		drawNumber(14,secondBegin2,color);
		ctx.restore();
     }
    

    //define the old time
    var oldHour=10000
    var oldMinute=10000
    var oldSecond=10000

    //define timer begin
    var timerBegin=false
    /*
    *add enevt listen
    */
    document.getElementById('starButton').addEventListener("click",function () {
    	// if(!timerBegin){
    	// 	timerBegin=true
    		//get input
		  var inputHour=document.getElementsByTagName('input')[0].value;
		  var inputMinute=document.getElementsByTagName('input')[1].value;
		  var inputSecond=document.getElementsByTagName('input')[2].value;
		  var deadline="/"+inputHour+":"+inputMinute+":"+inputSecond;
		  var now=new Date();
		  var nowT=Date.parse(now);

		  var deadlineT=Date.parse(new Date(now.toLocaleDateString()+deadline))
		  var diffT=deadlineT-nowT;

		  // console.log(deadline);
		   var timer=setInterval(function () {
		  	  diffT-=60;
		  	  if (diffT<1000) {
		  	  	drawHeart('pink');
		  	  	window.clearInterval(timer);

		  	  }
			  var leftHour=parseInt(diffT/(60*60*1000));
			  var leftMinute=parseInt((diffT-leftHour*1000*60*60)/(1000*60));
			  var leftSecond=parseInt((diffT-leftHour*1000*60*60-leftMinute*1000*60)/1000);
			  //judge the number change
			  if (leftHour!=oldHour) {
			  	oldHour=leftHour
			  	getMovingBalls(parseInt(oldHour/10),hourBegin)
			  	getMovingBalls((oldHour%10),hourBegin2)
			  }
			  if (leftMinute!=oldMinute) {
			  	oldMinute=leftMinute
			  	getMovingBalls(parseInt(oldMinute/10),minuteBegin)
			  	getMovingBalls((oldMinute%10),minuteBegin2)
			  }
			  if (leftSecond!=oldSecond) {
			  	oldSecond=leftSecond
			  	getMovingBalls(parseInt(leftSecond/10),secondBegin)
			  	getMovingBalls(parseInt(leftSecond%10),secondBegin2)
			  }
			  	
			  ctx.clearRect(0,0,1690,980);
			  drawTimer(leftHour,leftMinute,leftSecond);
			  drawMovingBalls()

		  },60)
	  

    	// }//end if
    	
    })//end event
     

     //sructure data for numbers and colon
  //new data
   var data=[
        [
            [0,0,1,1,1,0,0],
            [0,1,1,0,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,0,1,1,0],
            [0,0,1,1,1,0,0]
        ],//0
        [
            [0,0,0,1,1,0,0],
            [0,1,1,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [1,1,1,1,1,1,1]
        ],//1
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,0,0,0],
            [0,1,1,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,0,0,0,1,1],
            [1,1,1,1,1,1,1]
        ],//2
        [
            [1,1,1,1,1,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,1,0,0],
            [0,0,0,0,1,1,0],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//3
        [
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,1,0],
            [0,0,1,1,1,1,0],
            [0,1,1,0,1,1,0],
            [1,1,0,0,1,1,0],
            [1,1,1,1,1,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,1,1]
        ],//4
        [
            [1,1,1,1,1,1,1],
            [1,1,0,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,1,1,1,1,0],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//5
        [
            [0,0,0,0,1,1,0],
            [0,0,1,1,0,0,0],
            [0,1,1,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,0,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//6
        [
            [1,1,1,1,1,1,1],
            [1,1,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0]
        ],//7
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//8
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,1,1,0,0,0,0]
        ],//9
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ],//left
        [
            [0,0,1,1,1,0,0],
            [1,1,0,0,0,1,0],
            [1,0,0,0,0,0,1],
            [1,1,0,0,0,0,0],
            [0,1,0,0,0,0,0],
            [0,0,1,0,0,0,0],
            [0,0,0,1,0,0,0],
            [0,0,0,0,1,0,0],
            [0,0,0,0,0,1,0],
            [0,0,0,0,0,0,1]
        ],//rigth
        [
            [0,0,1,1,1,0,0],
            [0,1,0,0,0,1,1],
            [1,0,0,0,0,0,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,0],
            [0,0,0,0,0,1,0],
            [0,0,0,0,1,0,0],
            [0,0,0,1,0,0,0],
            [0,0,1,0,0,0,0],
            [1,1,0,0,0,0,0]
        ],//left
        [
            [0,0,1,1,1,0,0],
            [1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1],
            [0,0,1,1,1,1,1],
            [0,0,0,1,1,1,1],
            [0,0,0,0,1,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,0,1]
        ],//rigth
        [
            [0,0,1,1,1,0,0],
            [0,1,1,1,1,1,1],
            [1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1],
            [1,1,1,1,1,1,0],
            [1,1,1,1,1,0,0],
            [1,1,1,1,0,0,0],
            [1,1,1,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,0,0,0,0,0,0]
        ]

    ]
 
    //test code
    // drawTimer(12,34,56);
    drawHeart('pink');
    // getMovingBalls(13,30)
    // getMovingBalls(14,150)
    // drawMovingBalls()
    // console.log(balls)
})()