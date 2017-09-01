var simonLeader = [];
var simonFollower = [];
var timeOuts = [];
var timeOuts1 = [];
var startSwitch = false;
var simonLeaderTurn = true;
var simonFollowerTurn = false;
var isStrict = false;

var timeDelay2 = 500;  
var simonNumber = 1;
var position = {
	x : -1,
	y : -1,
};


var Yoffset;
var Xoffset;


var simonObjectArray = [  { lightColor: '#ff1723', darkColor: '#9F0F17', freq: 300, waveForm: 'sawtooth'} , 
		                  { lightColor: '#00ff70', darkColor:'#00A74A' , freq: 400, waveForm: 'sawtooth'} , 
				          { lightColor: '#ffd109', darkColor: '#CCA707' , freq: 500, waveForm: 'sawtooth'} , 
				          { lightColor: '#1084ff', darkColor: '#094A8F' , freq: 600, waveForm: 'sawtooth'} ];


simonGameNameSpace = function(){	
	this.osc;
	this.audioCtx;
	this.quadrant;
	function getQuadrantOfSimon() { return  this.quadrant; }
	function setQuadrantOfSimon(quadrant) { this.quadrant = quadrant; }
	function getBeepObject(){ return { osc: this.osc, audioCtx: this.audioCtx }; }
	function setBeepObject(beepObject){ this.osc = beepObject.osc; this.audioCtx = beepObject.audioCtx; }
	return {
	   	 getBeepObject:  getBeepObject,
		 setBeepObject: setBeepObject,
		 getQuadrantOfSimon: getQuadrantOfSimon,
		 setQuadrantOfSimon: setQuadrantOfSimon
	}
}();

function getBeep( frequency = 100, waveForm = 'square' ){
	this.audioCtx = new (window.AudioContext || window.webkit.AudioContext)();
	this.osc = this.audioCtx.createOscillator();
	this.osc.connect(this.audioCtx.destination);
	this.osc.type = waveForm;
	this.osc.frequency.value = frequency;
	return {osc: this.osc, audioCtx: this.audioCtx};
}


document.getElementById('useOff').addEventListener('click', function() {

    var textView = document.getElementById('showCount');
    var test = document.getElementById('switchBtn');

    if ( !startSwitch ){		
		test.setAttribute('x','350');
		textView.innerHTML = '--';
        startSwitch = true;
    } else {
		history.go(0);
    }
});

document.getElementById('startSimon').addEventListener ('click', function(center) {
	
   if ( startSwitch )  {
	Xoffset = center.pageX;   
	Yoffset = center.pageY;
	myTurn();
	var textViewStyle = document.getElementById('showCount').style;
	textViewStyle.fontSize = '46px';
	textViewStyle.letterSpacing = '6px';
	textViewStyle.fontWeight = '900';
	textViewStyle.fontStyle = 'normal';
	textViewStyle.fontFamily = '"San Serif"';
	 
	 if (simonLeader.length ){
		clearSimon();
	  }
	   
	  var timeDelay3 = 1000;
	  var multFactor = 5;
	  var multFactor1 = 2;
	   
	  initiateDisplay();
	  setTimeout(simonsTurn, timeDelay3);
      setTimeout(firstIdleWaiting1, simonNumber * 1000 * multFactor);
	    
   function initiateDisplay(){
		   
    var i, timeDelay4 = 0;
		   
         for (i = 0; i <2; i++){
		    setTimeout(displayBlink, timeDelay4);
		    timeDelay4+=100;
	        setTimeout(displayDash,  timeDelay4);
		    timeDelay4+=100;
	     }
		   
          function displayBlink(){
	         var textView = document.getElementById('showCount');
             textView.innerHTML = '';
	    }
		   
	     function displayDash(){
		    var textView = document.getElementById('showCount');
		    textView.innerHTML = '--';
	    }   
    }
	   
    function firstIdleWaiting(){
        errorStatus();
		
		if ( isStrict ){
			simonLeader = [];
		}
        setTimeout(simonsTurn, timeDelay2 * multFactor1);
    }
    function firstIdleWaiting1() {
         var intervalWaiting = setInterval(firstIdleWaiting, simonNumber * 1000 * multFactor);
         timeOuts1.push(intervalWaiting);
     }
   }
});


document.getElementById('strictButton').addEventListener ('click', function() {
     if ( startSwitch ) { 
	     var strictSwitch = document.getElementById('strictStatus');
	     if ( !isStrict ){
		 strictSwitch.style.fill = "red";
		 isStrict = true;
	     } 
	     else{
		     strictSwitch.style.fill = "black";
		     isStrict = false;
	     }
	 }
});


function clearSimon(){
	purgeIntervals();
	purgeTimeOuts();
	simonLeaderTurn = true;
	simonFollowerTurn = false;
	simonFollower = [];
	simonLeader = [];
	simonNumber = 1;
}


function getLightingTime(someInt){
	
	var timeDelay1;
	
	if (someInt < 5){
		timeDelay1 = 750;
	}
	
	else if (someInt > 4 && someInt < 9){
		timeDelay1 = 500;
	}
	else if (someInt > 8 && someInt < 13){
		timeDelay1 = 375;
	}
	else {
		timeDelay1 = 250;
	}
	return timeDelay1;
}


function simonsTurn(){
	var timeDelay1 = getLightingTime(simonNumber);                   
	var timeFactor4 = 2.15;
	
	var timeDelay5=0, timeDelay6 = 350;
	myTurn();
	printSimonCount();
	nextMove();
	simonLightDisplay();
	setTimeout(yourTurn, timeDelay5 + timeDelay6);

	function printSimonCount(){
	   var textView = document.getElementById('showCount');
    
	   if (simonNumber < 10){
	      textView.innerHTML = '0' + simonNumber;
	   }
	   else {
	      textView.innerHTML = simonNumber;
	   }
    }
	
	function nextMove() {
	var quarterPie = Math.floor((Math.random()*4) + 1); 
	simonLeader.push(quarterPie);		
    }
	
	
	function simonLightDisplay() {
	   var i, len = simonNumber;
	
	   for (i =0; i < len; i++){
	      simonDisplayLight(simonLeader[i], timeDelay5);
		   
		  if ( i !== len - 1){ 
		  timeDelay5+=timeDelay1 * timeFactor4;
		  }
	   }
		   function simonDisplayLight(someColor, index){
			   
			var colorChange = setTimeout(turnOnColor1, index, someColor);    
			   timeOuts.push(colorChange);
		   }
    }

	
	function turnOnColor1( someNumber){
		 document.getElementById(someNumber.toString()).style.fill = simonObjectArray[someNumber - 1].lightColor;
		 var beep1 = getBeep( simonObjectArray[someNumber - 1].freq, simonObjectArray[someNumber - 1].waveForm);
		 beep1.osc.start(0);
		 setTimeout(turnOnColor, timeDelay1, someNumber);
		 beep1.osc.stop(timeDelay1 * 1000);
		 setTimeout(function(){beep1.audioCtx.close();}, timeDelay1);
		 
		      function turnOnColor(someNumber){
		      document.getElementById(someNumber.toString()).style.fill = simonObjectArray[someNumber - 1].darkColor;	
		      }
		
	     }
}


function myTurn(){
	simonLeaderTurn = true;
    simonFollowerTurn = false;
}

 function yourTurn(){
	simonLeaderTurn = false;
	simonFollowerTurn = true;
}  

function purgeIntervals() {
	
	var i;
	for (i = 0; i < timeOuts1.length; i++){
		clearInterval(timeOuts1[i]);
	}
}

function purgeTimeOuts() {
	
	var i;
	for (i = 0; i < timeOuts.length; i++){
		clearTimeout(timeOuts[i]);
	}
}



function revertColor(someId, someColor){
	document.getElementById(someId).style.fill=someColor;
}

              
   document.getElementById('quarter_pies').addEventListener('mousedown', function(e) {

	
	if (startSwitch && simonFollowerTurn ){
		purgeIntervals();
		purgeTimeOuts();
		
		var soundTimeDelay = 2;
        var quadrant;		
        position.x = e.pageX - Xoffset;  
	    position.y = e.pageY - Yoffset;
	
		if (position.x > 0 && position.y < 0){
	         quadrant = 1;
	      }
	    else if (position.x < 0 && position.y < 0){
	         quadrant = 2;
	     }
	     else if (position.x < 0 && position.y > 0){
	        quadrant = 3;
	     }
	     else if (position.x > 0 && position.y > 0){
		    quadrant = 4;
	     }
		var getId = quadrant.toString(); 
		simonGameNameSpace.setQuadrantOfSimon(quadrant);
		document.getElementById(getId).style.fill = simonObjectArray[quadrant - 1].lightColor;
		simonFollower.push(quadrant);
		
		var testResult = testWrong();
		var beep;
	    if ( !testResult ){
		    beep = getBeep(simonObjectArray[quadrant-1].freq, simonObjectArray[quadrant - 1].waveForm);
		}
		else {
			beep = getBeep();
		}
		simonGameNameSpace.setBeepObject(beep);
		beep.osc.start(0);
		beep.osc.stop(soundTimeDelay);
		setTimeout(revertColor, soundTimeDelay * 1000, getId,  simonObjectArray[quadrant - 1].darkColor);
		setTimeout(function(){ beep.audioCtx.close();}, (soundTimeDelay * 1000) + 10 );	
	}
	    	
});

      
document.getElementById('quarter_pies').addEventListener('mouseup', function(e) {
	if  (startSwitch  && simonFollowerTurn ){
		  var quadrant = simonGameNameSpace.getQuadrantOfSimon();
		  var getId = quadrant.toString();
		  document.getElementById(getId).style.fill = simonObjectArray[quadrant - 1].darkColor;
		  var beep = simonGameNameSpace.getBeepObject();
		  beep.osc.stop(0);
		  beep.audioCtx.close();
	      verify();
	}
});

function testWrong(){
	
	var checkPoint = simonFollower.length - 1;
	var wrongButton = (simonFollower[checkPoint] !== simonLeader[checkPoint] );
	return wrongButton;
}


function verify(){
	
	var timeDelay1 = getLightingTime(simonNumber);
	
	var sumOfTime;
	var len = simonFollower.length;
	var finishVerification = ( len === simonNumber);
	var valuesMatch = (simonFollower[len - 1] === simonLeader[len - 1]);
	var multFactor; 
	var multFactor1 = 2;  
	var multFactor2 = 1.2;   
    var multFactor3;	
	var beginOffSet = 1000;  // was 600
	if (finishVerification === true && valuesMatch === true ){
		myTurn();
		setTimeout(winningHand,beginOffSet);
		multFactor = getMultFactor(simonNumber);
		multFactor3 = getMultFactor3(simonNumber);
		var timeOutsWaiting1 = setTimeout(idleWaiting1, simonNumber * 1000 * multFactor3);
		timeOuts.push(timeOutsWaiting1);
	}
	
	else if ( valuesMatch === true){
	     multFactor = getMultFactor(simonNumber);
		 sumOfTime = getSumOfTimes(simonNumber);
	     var intervalWaiting = setInterval(idleWaiting, sumOfTime * multFactor);
	     timeOuts1.push(intervalWaiting);  
	} 
	else {
		    myTurn();
		    setTimeout(tryAgain,beginOffSet);
		    multFactor3 = getMultFactor3(simonNumber);
		    multFactor = getMultFactor(simonNumber);
		    var timeOutsWaiting = setTimeout(idleWaiting1, simonNumber * 1000 * multFactor3);
		    timeOuts.push(timeOutsWaiting);	
	}
	
	function winningHand(){
	    simonFollower = [];
		if (simonNumber === 20){
			simonFollowerTurn = false;
			 var textView = document.getElementById('showCount');
			 textView.style.font = "italic bold 30px arial,serif";
		     textView.innerHTML = 'WIN';
			 setTimeout(showBlank, 5000);
			 var terminator = setTimeout(theEnd, 5000);

		}
		else {
            simonNumber++;
	        var timeOutsWaiting2 = setTimeout(simonsTurn, timeDelay2 * multFactor1 * multFactor2);
		    timeOuts.push(timeOutsWaiting2);
		}
	}
	
	function theEnd(){
	var textViewStyle = document.getElementById('showCount').style;
	textViewStyle.fontSize = '46px';
	textViewStyle.letterSpacing = '6px';
	textViewStyle.fontWeight = '900';
	textViewStyle.fontStyle = 'normal';
	textViewStyle.fontFamily = '"San Serif"';
	simonNumber = 1;
	simonLeader = [];
	setTimeout(simonsTurn, 1000);
	
	}

	function showBlank(){
		     var textView = document.getElementById('showCount');
			 textView.innerHTML = '';
		}	
	
	function idleWaiting(){
		errorStatus();
		simonFollower = [];
		var intervalWaiting1;
		if ( isStrict ){
			simonNumber = 1;
			simonLeader = [];
			intervalWaiting1 = setTimeout(simonsTurn, timeDelay2 * 2);
		} else {
	
		    intervalWaiting1 = setTimeout(simonsTurn, timeDelay2 * multFactor1);
		}
		timeOuts1.push(intervalWaiting1);
	}
	
	function idleWaiting1() {
	
		sumOfTime = getSumOfTimes(simonNumber);
		var intervalWaiting = setInterval(idleWaiting, sumOfTime * multFactor);
		timeOuts1.push(intervalWaiting);
	}
	
	function tryAgain(){
		errorStatus();
		simonFollower = [];
		if (isStrict === true){
			simonNumber = 1;
			simonLeader = [];
		}
		setTimeout(simonsTurn, timeDelay2* multFactor1);	
	}

	
	function getMultFactor(someInt1){
	
	var multFactor1;
	  
		switch (someInt1) {
				
			case 1:	
				multFactor1 = 5.0;
				break;
			case 2:
				multFactor1 = 4.5;  
				break;
			case 3:
				multFactor1 = 4.5;  
				break;
			case 4:
				multFactor1 = 3.5;  
				break;
			case 5:
				multFactor1 = 3;
				break;	
			case 6:
				multFactor1 = 3;
				break;
			case 7:
				multFactor1 = 3;
				break;
			case 8:
				multFactor1 = 3;
				break;	
			case 9:
				multFactor1 = 2.8;
				break;
			case 10:
				multFactor1 = 2.7;
				break;
			case 11:
				multFactor1 = 2.7;
				break;
			case 12:
				multFactor1 = 2.6;
				break;
			case 13:
				multFactor1 = 2.6;
				break;
			case 14:
				multFactor1 = 2.45;
				break;	
			case 15:
				multFactor1 = 2.4;
				break;
			case 16:
				multFactor1 = 2.3;
				break;
			case 17:
				multFactor1 = 2.3;
				break;	
			case 18:
				multFactor1 = 2.3;
				break;
			case 19:
				multFactor1 = 2.2;
				break;
			case 20:
				multFactor1 = 2.2;
			    break;
		}
	 return multFactor1;
    }
	
	
	function getMultFactor3(someInt2){
	
	var multFactor2;
	  
		switch (someInt2) {
				
			case 1:	
				multFactor2 = 2;
				break;
			case 2:
				multFactor2 = 2;
				break;
			case 3:
				multFactor2 = 2.2; 
				break;
			case 4:
				multFactor2 = 2.0;  
				break;
			case 5:
				multFactor2 = 1.6;
				break;	
			case 6:
				multFactor2 = 1.4;
				break;
			case 7:
				multFactor2 = 1.2;
				break;
			case 8:
				multFactor2 = 1.2;
				break;	
			case 9:
				multFactor2 = 1.1;
				break;
			case 10:
				multFactor2 = 1.1;
				break;
			case 11:
				multFactor2 = 1.0;
				break;
			case 12:
				multFactor2 = 1.0;
				break;
			case 13:
				multFactor2 = 0.9;
				break;
			case 14:
				multFactor2 = 0.8;
				break;	
			case 15:
				multFactor2 = 0.75;
				break;
			case 16:
				multFactor2 = 0.75;
				break;
			case 17:
				multFactor2 = 0.7;
				break;	
			case 18:
				multFactor2 = 0.7;
				break;
			case 19:
				multFactor2 = 0.6;
				break;
			case 20:
				multFactor2 = 0.6;
			    break;			
		}
	
	 return multFactor2;
    }
	
	function getSumOfTimes(someInt2) {
		
		var i, sumOfTime = 0;
	
	       for (i = 1; i <= someInt2; i++){
		     sumOfTime+=getLightingTime(i);
	       }
		return sumOfTime;
	 }
	
} 


function errorStatus(){
		var i, timeDelay7 = 0;
		for (i = 0; i <2; i++){
			setTimeout(displayError, timeDelay7);
			timeDelay7+=100;
			setTimeout(displayBlink,  timeDelay7);
			timeDelay7+=100;
		}
		function displayError(){
		   var textView = document.getElementById('showCount');
		   textView.innerHTML = '!!';
	    } 
		function displayBlink(){
		   var textView = document.getElementById('showCount');
		   textView.innerHTML = '';
	   }		
}