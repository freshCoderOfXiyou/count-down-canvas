(function(){
  console.log(1);
  var cav=document.getElementById("countDown")
  //set cav's width and height 
  cav.width=1000
  cav.height=580
  var ctx=cav.getContext("2d");
  // ctx.fillStyle='red'
  // ctx.fillRect(0,0,990,570)

  //define circle radius
  var radius=10;
  //define color 
  var color='gray';
  
  //sructure data for numbers and colon
  var data=[
  		[
          [0,1,1,0],
          [1,0,0,1],
          [1,0,0,1],
          [1,0,0,1],
          [1,0,0,1],
          [1,0,0,1],
          [0,1,1,0]
  		],
  		[
          [0,1,1,0],
          [0,0,1,0],
          [0,0,1,0],
          [0,0,1,0],
          [0,0,1,0],
          [0,0,1,0],
          [1,1,1,1]
  		],
  		[
          [1,1,1,1],
          [0,0,0,1],
          [0,0,0,1],
          [1,1,1,1],
          [1,0,0,0],
          [1,0,0,0],
          [1,1,1,1]
  		]
  		,
  		[
          [1,1,1,1],
          [0,0,0,1],
          [0,0,0,1],
          [1,1,1,1],
          [0,0,0,1],
          [0,0,0,1],
          [1,1,1,1]
  		],
  		[
          [1,0,0,1],
          [1,0,0,1],
          [1,0,0,1],
          [1,1,1,1],
          [0,0,0,1],
          [0,0,0,1],
          [0,0,0,1]
  		],
  		[
          [1,1,1,1],
          [1,0,0,0],
          [1,0,0,0],
          [1,1,1,1],
          [0,0,0,1],
          [0,0,0,1],
          [1,1,1,1]
  		],
  		[
          [1,1,1,1],
          [1,0,0,0],
          [1,0,0,0],
          [1,1,1,1],
          [1,0,0,1],
          [1,0,0,1],
          [1,1,1,1]
  		],
  		[
          [1,1,1,1],
          [0,0,0,1],
          [0,0,1,0],
          [0,0,1,0],
          [0,0,1,0],
          [0,0,1,0],
          [0,0,1,0]
  		],
  		[
          [1,1,1,1],
          [1,0,0,1],
          [1,0,0,1],
          [1,1,1,1],
          [1,0,0,1],
          [1,0,0,1],
          [1,1,1,1]
  		],
  		[
          [1,1,1,1],
          [1,0,0,1],
          [1,0,0,1],
          [1,1,1,1],
          [0,0,0,1],
          [0,0,0,1],
          [1,1,1,1]
  		],
  		[
          [0,0],
          [1,1],
          [1,1],
          [0,0],
          [1,1],
          [1,1],
          [0,0]
  		],
  		[
          [0,1,1,0],
          [1,0,0,1],
          [1,0,0,0],
          [1,0,0,0],
          [0,1,0,0],
          [0,0,1,0],
          [0,0,0,1]
  		],
  		[
          [0,1,1,0],
          [1,0,0,1],
          [0,0,0,1],
          [0,0,0,1],
          [0,0,1,0],
          [0,1,0,0],
          [1,0,0,0]
  		]
  ]
   var hourBegin=30
   var hourBegin2=160
   var firstColonBegin=290
   var minuteBegin=360
   var minuteBegin2=490
   var lastColonBegin=620
   var secondBegin=690
   var secondBegin2=820
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
    	ctx.save();
    	ctx.clearRect(0,0,1000,580);
    	drawNumber(hour1,hourBegin);
    	drawNumber(hour2,hourBegin2);
    	drawNumber(10,firstColonBegin);
    	drawNumber(minute1,minuteBegin);
    	drawNumber(minute2,minuteBegin2);
    	drawNumber(10,lastColonBegin);
    	drawNumber(second1,secondBegin);
    	drawNumber(second2,secondBegin2);
    	ctx.restore();
    }


     function drawHeart(color) {

	    drawNumber(11,hourBegin,color);
		drawNumber(12,hourBegin2,color);
		// drawNumber(10,firstColonBegin);
		drawNumber(11,minuteBegin,color);
		drawNumber(12,minuteBegin2,color);
		// drawNumber(10,lastColonBegin);
		drawNumber(11,secondBegin,color);
		drawNumber(12,secondBegin2,color);
		ctx.save();
     }
    

    /*function caculate how much time left
    *
    */
    function caculateTime(argument) {
    	// body...
    }

    /*
    *add enevt listen
    */
    document.getElementById('starButton').addEventListener("click",function () {
    	//get input
	  var inputHour=document.getElementsByTagName('input')[0].value;
	  var inputMinute=document.getElementsByTagName('input')[1].value;
	  var inputSecond=document.getElementsByTagName('input')[2].value;
	  var deadline="/"+inputHour+":"+inputMinute+":"+inputSecond;
	  var now=new Date();
	  var nowT=Date.parse(now);

	  var deadlineT=Date.parse(new Date(now.toLocaleDateString()+deadline))
	  var diffT=deadlineT-nowT;;

	  // console.log(deadline);
	   var timer=setInterval(function () {
	  	  diffT-=1000;
	  	  if (diffT<1000) {
	  	  	drawHeart('pink');
	  	  	window.clearInterval(timer);

	  	  }
		  var leftHour=parseInt(diffT/(60*60*1000));
		  var leftMinute=parseInt((diffT-leftHour*1000*60*60)/(1000*60));
		  var leftSecond=parseInt((diffT-leftHour*1000*60*60-leftMinute*1000*60)/1000);
		  
		  drawTimer(leftHour,leftMinute,leftSecond);
		  console.log(leftHour,leftMinute,leftSecond);
	  },1000)
	  
    })//end event

    //test code
    // drawTimer(12,34,56);
    drawHeart('pink');




})()