

//Special thanks to Ted Hopp for the move towards point code: https://stackoverflow.com/questions/8537202/how-to-make-a-entity-move-towards-a-x-and-y
//Also thanks to Golan Levin
//Credit to Florence Caillon for "Duo" or Katz Beat loop
//sheep 2018
var    listUpListen2 =[];
var    listDownListen2 = [];
var    listRightListen2 = [];
var    listLeftListen2 = [];
var fallback = false;
var enemySpeed = .05;
var xSpeed = 0;
var ySpeed = 0;
var factor = 0;
var fastX = 0;
var fastY = 0;
var mySpeechRecog;
var speech;
var confidence;
var voicesynthesizer;
var you;
var it;
var land;
var song;
var caught;
var restartState = false;
var upPosition;
var downPosition;
var leftPosition;
var rightPosition
var listenDist = 10;
var listAngle = [];
var listWasCoords = [];
var listDist = [];
var listDirs = [];
var listUpListen = [];
var listUpDistListen = [];
var listUpDistListen2 = [];
var listDownListen = [];
var listDownDistListen = [];
var listDownDistListen2 = [];
var listRightListen = [];
var listRightDistListen = [];
var listRightDistListen2 = [];
var listLeftListen = [];
var listLeftDistListen = [];
var listLeftDistListen2 = [];
var rightDistance = "";
var leftDistance = "";
var upDistance = "";
var downDistance = "";

function preload() {
  song = loadSound('assets/monster1.mp3');
  caught = loadSound('assets/bonecrunch.mp3');
}

function setup() {
  createCanvas(800, 800);
  confidence = 0;
  speech = "";
  initializeMySpeechRecognizer();
  voicesynthesizer = new p5.Speech();
  you = new Char();
  it = new Monster();
  land = new Arr();
  song.loop();
  voicesynthesizer.setVoice(4);
  console.log(voicesynthesizer.listVoices());
  voicesynthesizer.speak("The voice commmands are north, south, east, west, and listen. Say these and evade the large, hungry black cat that is hunting you. ")
}
//=========================================
function initializeMySpeechRecognizer() {
  mySpeechRecog = new p5.SpeechRec('en-US');

  mySpeechRecog.continuous = true; // do continuous recognition
  mySpeechRecog.interimResults = false; // allow partial recognition 
  mySpeechRecog.onResult = parseResult; // recognition callback
  mySpeechRecog.start(); // start engine

  
}

function parseResult() {
	confidence = mySpeechRecog.resultConfidence;
	if (confidence > 0.5){
		console.log(mySpeechRecog.resultString);
		speech = mySpeechRecog.resultString.split(' ').pop();

	if (speech == "up" || speech =="north" || speech == "North") {
	  	
	    you.up();
	    if (enemySpeed < .15){
	    enemySpeed +=.001;
		}
	    you.mudLose();
	    fallback = true;

	  }
	  if (speech == "down" || speech == "south" || speech == "South") {
	    you.down();
	    	    if (enemySpeed < .15){
	    enemySpeed +=.001;
		}
	    fallback = true;
	    you.mudLose();
	  }
	  if (speech== "right" || speech == "rite" || speech == "East" || speech == "east") {
	    you.right();
	    	    if (enemySpeed < .15){
	    enemySpeed +=.003;
		}
		fallback = true;
	    you.mudLose();
	  }
	  if (speech == "left"|| speech =="west" || speech == "West" ) {
	    you.left();
	    	    if (enemySpeed < .15){
	    enemySpeed +=.001;
		}
		fallback = true;
		you.mudLose();
	}
	if (speech == "listen"){
		you.listen();
	}
}
}
//====================================
function draw() {

  background(255-frameCount);

  if (restartState === true) {
    background(255);
    speech = "";
    confidence = 0;
    you = new Char();
    it = new Monster();
    land = new Arr();
    caught.play();
    song.stop();
  
    song.loop();

    restartState = false;
    upPosition = 0;
    downPosition = 0;
    leftPosition = 0;
    rightPosition = 0;
    listenDist = 10;

    listWasCoords = [];
    listDist = [];
    listDirs = [];
    listUpListen = [];
        listAngle = [];
    listUpDistListen = [];
    listUpDistListen2 = [];
    listDownListen = [];
    listDownDistListen = [];
    listDownDistListen2 = [];
    listRightListen = [];
        listUpListen2 =[];
    listDownListen2 = [];
    listRightListen2 = [];
    listLeftListen2 = [];
    listRightDistListen = [];
    listRightDistListen2 = [];
    listLeftListen = [];
    listLeftDistListen = [];
    listLeftDistListen2 = [];
    rightDistance = "";
    leftDistance = "";
    upDistance = "";
    downDistance = "";
    restartState = false;
    enemySpeed = .05;
    xSpeed = 0;
	ySpeed = 0;
	factor = 0;
	fastX = 0;
	fastY = 0;
  }



  it.move();
  song.setVolume(2/you.monsterdistance());




}

function Char() {
  this.x = 400;
  this.y = 400;

  this.func;
  this.speed = 30;
  this.mudon = 0;

  this.display = function() {
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 10, 10);
  };

  this.up = function() {
    land.landShift("up");
    this.func = land.check();
        if (this.func == "storm"){
    	you.storm();
    }
    if (this.func == "mud"){
    	you.mud();
    }
        if (this.func == "dont"){
    	you.doNothing();
    }
    fastX = 0;
    fastY = this.speed;
    this.func = "";
    it.fallback();
  };

  this.down = function() {
    land.landShift("down");
    this.func = land.check();
    if (this.func == "storm"){
    	you.storm();
    }
    if (this.func == "mud"){
    	you.mud();
    }
        if (this.func == "dont"){
    	you.doNothing();
    }
    fastX = 0;

    fastY = -this.speed;
    this.func = "";
     it.fallback();
  };

  this.left = function() {
    land.landShift("left");
    this.func = land.check();
        if (this.func == "storm"){
    	you.storm();
    }
    if (this.func == "mud"){
    	you.mud();
    }
        if (this.func == "dont"){
    	you.doNothing();
    }
    
    fastX = this.speed;
    fastY = 0;
    this.func = "";
     it.fallback();
  };

  this.right = function() {
    land.landShift("right");

    this.func = land.check();
        if (this.func == "storm"){
    	you.storm();
    }
    if (this.func == "mud"){
    	you.mud();
    }
        if (this.func == "dont"){
    	you.doNothing();
    }
    fastX = -this.speed;
    fastY = 0;
    this.func = "";
     it.fallback();
  };

  this.listen = function() {
    land.listen();

  };

  this.mudLose = function() {
    if (this.mudon > 0) {
      this.mudon -= 1;
    }
    if (this.mudon === 0) {
      this.speed = 30;
    }
  };

  this.mud = function() {
    this.speed = 5;
    this.mudon = 3;
    voicesynthesizer.speak("You fell into a mud pit. your speed is lowered.");
  };

  this.storm = function() {
    listenDist = 0;
    voicesynthesizer.speak("You are in a storm. the rain and thunder blocks out most sounds.");
  };

  this.doNothing = function() {
  	listenDist = 10;
    voicesynthesizer.speak("Nothing is happening here.");
  };

  this.monsterdistance = function() {
  	if ((round(((sqrt(sq(it.x - this.x)) + sqrt(sq(it.y - this.y)))))) < 2) {
  		restartState = true;
  	}
    return (round(((sqrt(sq(it.x - this.x)) + sqrt(sq(it.y - this.y))))));
  }
};


function Monster() {
  this.x = 700;
  this.y = 400;

  this.speed = enemySpeed;
  this.display = function() {
    fill(0);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 10, 10);

  };
  this.showX = function() {
  	return this.x;
  }
    this.showY = function() {
  	return this.y;
  }
  this.move = function() {
  	this.speed = enemySpeed;
    xSpeed = (this.x - you.x) / 2;
    ySpeed = (this.y - you.y) / 2;
    factor = this.speed / sqrt(xSpeed * xSpeed + ySpeed * ySpeed);
    xSpeed *= factor;
    ySpeed *= factor;
    this.x -= xSpeed;
    this.y -= ySpeed;



  }
  this.fallback = function() {
  	this.x += fastX;
  	this.y += fastY;
  }


};

function Arr() {
  this.x = 340;
  this.y = 340;
  this.list = [];
  this.words = ['dont', 'dont','dont','dont','dont','mud','mud', 'mud','storm'];
  for (g = 0; g < 12; g++) {
    append(this.list, []);
    for (c = 0; c < 12; c++) {
      append(this.list[g], random(this.words));
    }
  }

  this.display = function() {
    for (c = 0; c < this.list.length; c++) {
      for (h = 0; h < this.list[c].length; h++) {
        text(""+(this.list[c][h]) + "",this.x + (10 * h), this.y + (10 * c));
      }
    }
  };

  this.listen = function() {


  	 var speak = true;
    for (v = 0; v < this.list.length-1; v++){
    	for (i = 0; i < this.list.length-1;i++){
    		if (speak == true){
    			console.log(this.x + (10 * i)-you.x);
    		
    			var angle =  (atan2(this.y + (10 * v)-you.y,this.x + (10 * i)-you.x));

    			var distance = sqrt(sq(this.x + (10 * i)-you.x)+sq(this.y+(10 * v)-you.y));
    			console.log(distance);

    			if (angle== (3*PI)/2 && distance <= listenDist && distance!=0 && this.list[v][i]!= "dont"){
    				voicesynthesizer.speak("You can hear the " + this.list[v][i] + " to your North");
    				speak = false;
    	}
    	    	else if (angle==PI && distance <= listenDist&&  distance!=0 &&this.list[v][i]!= "dont"){
    		voicesynthesizer.speak("You can hear the bubbling of the " + this.list[v][i] + " to your Left");
    		speak = false;
    	}
    	    	else if (angle==(PI)/2 && distance <= listenDist &&  distance!=0 &&this.list[v][i]!= "dont"){
    		voicesynthesizer.speak("You can hear the sloshing of the " + this.list[v][i] + " down south");
    		speak = false;
    	}
    	    	else if (angle==0 && distance <= listenDist &&  distance!=0 &&this.list[v][i]!= "dont"){
    		voicesynthesizer.speak("You can hear rushing of the " + this.list[v][i] + " to your Right");
    		speak = false;
    	}

    		}

    	}
    	}
    
    voicesynthesizer.speak("You can't hear anything else.");
    		speak = false;
   
  };

  this.check = function() {
    for (c = 0; c < this.list.length; c++) {
      for (h = 0; h < this.list[c].length; h++) {
        if (this.x + (10 * h) == you.x && this.y + (10 * c) == you.y) {

          	return this.list[c][h];
        }
      }
    }
  };

  this.landShift = function(dir) {
    if (dir == "down") {
      for (g = 0; g < this.list.length-1; g++) {
        this.list[g] = this.list[g + 1];
      }
     this.list.splice(this.list.length-1,1);
     var list1 = [];
     for (h = 0; h < 12;h++){
     	append(list1, random(this.words));
     }
     append(this.list, list1);
     
      

    }

    if (dir == "up") {
      for (g = 0; g < this.list.length - 1; g++) {
        this.list[this.list.length - g-1] = this.list[this.list.length -g-2];

      }
      var list2 = [];
		for (h = 0; h < 12;h++){
		append(list2, random(this.words));
		 }
      this.list[0] = list2;
      


    }
    if (dir == "left") {
      for (h = 0; h < this.list.length - 1; h++) {
        for (g = 0; g < this.list.length - 2; g++) {
          this.list[h][this.list.length - 1 - g] = this.list[h][this.list.length- 2 - g];

        }
      }
      var list3 = [];
      for (h = 0; h < 12;h++){
		append(list3, random(this.words));
		 }
      for (h = 0; h < this.list.length - 1; h++) {
        this.list[0][h] = list3[h];
        }
      }


      if (dir == "right") {
        for (g = 0; g < this.list.length - 1; g++) {
          for (c = 0; c < 12; c++) {
            this.list[g][c] = this.list[g][c + 1];
          }
        }
         var list4 = [];
      for (h = 0; h < 12;h++){
		append(list4, random(this.words));
		 }
      for (h = 0; h < this.list.length - 1; h++) {
        this.list[h][this.list.length-1] = list4[h];
        }

      }

    }

}


/*
var my speech recog
var speech
var confidence
var voicesynthesizer
var you
var it
var land
var upPosition
var downPosition
var leftPosition
var listenDist = 120
var rightPosition
preload() {
	song = loadsound(monster.mp3)
}

setup {
	canvas
	confidence = 0
	speech = ""
	initializespeechrecog();
	voicesynthesizer = new p5.speech
	setvoice (0)
	you = new char(400,400)
	it = new monster(700,400)
	land = new arr (160,160) 
	song.loop();

}

initializespeechrecog(){
	
}

draw {
	background(0);
	song.setVolume(you.monsterdistance())
	you.display()
	it.display()
	it.move();
	land.display()
	if restartstate ==true{
	every variable is made new again
	}

	every time tell to move also call function mudlose
}
char (x,y){
	this.x = x;
	this.y = y;

	this.func = donothing()
	this.speed = 30;
	this.mudon = 0;
	function display() {
	fill(255)
	ellipseMode(CENTER);
	ellipse(this.x,this.y,10,10);
	listendist = 120

	function up {
	landshift(down)
	this.func=land.check(this.x,this.y)
	you.this.func
	it.fallback(0,speed)
	}
	function mudlose {
		if mudon > 0 )
		mudon -=1;
	}
	if mudon == 0 {
	speed = 30
	}
	}
	function down {
	landshift(down)
	this.func=land.check(this.x,this.y)
	you.this.func
	it.fallback(0,-speed)
	}
	function left {
	landshift(right)
	this.func=land.check(this.x,this.y)
	you.this.func
	it.fallback(-speed,0)
	}
	function right {
	landshift(left)
	this.func=land.check(this.x,this.y)
	you.this.func
	it.fallback(speed,0)
	}
	function listen {

		120 is equal to listenDist

		start at the point that is 120 up and 120 left, checking by ten then move right until reached point that is 120 up and 120 right, continue
		until all radius
		if anything was not donothing add what it was and its coordinates to a list (listWasCoords)
		then find the distances of all objects in the list from the player (listDist)
		then find the angle of all objects in the list from the player (listDirs)
		go through angles- if an objects angle is between 225 and 315 add what it was to (listUpListen) - in addition, add the distance from listDist to something called listUpDistListen and listDownDistListen2
		if an objects angle is between 135 and 225 add what it was to (listLeftListen) - in addition, add the distance from listDist to something called listLeftDistListen and listDownDistListen2
		if angle between 45 and 135 then add whatitwas to (listDownListen) - in addition, add the distance from listDist to something called listDownDistListen and listDownDistListen2
		if angle between 315 and 405 then add whatitwas to (listRightListen) - in addition, add the distance from listDist to something called listRightDistListen and listRightDistListen2
		sort list(dir)distListen2 and once sorted, find the first number in  list(dir)distListen
		whatever that number's position  is, find the same position (var UpPosition) on listUpListen and the same for listUpDistListen setting it (var UpDistance)
	whatever that number's position  is, find the same position (var downPosition) on listdownListen  and the same for listdownDistListen setting it (var downDistance)
	whatever that number's position  is, find the same position (var leftPosition) on listleftListen  and the same for listLeftDistListen setting it (var leftDistance)
	whatever that number's position  is, find the same position (var rightPosition) on listrightListen  and the same for listRightDistListen setting it (var rightDistance) (its not a number, if its more than or equal to 90 = "distant" more than or equal to 60 its "close" more than or equal to 30 its "very close" more than or equal to 10 its "incredibly close" )
	if var listUpListen was mud say "You heard the "upDistance "sound of mud bubbling"
	if var listUpListen was storm say "You heard the "upDistance "sound of mud bubbling"
	if there was nothing in the radius
	return - "there was nothing to be heard"
	}
	function mud {
	makes char slow down to 10
	mudon = 3;
	say "You fell into a mud pit- your speed is lowered"
	}
	function storm {
	make listendist = 30 
	say "You are in a storm- the rain and thunder blocks out most sounds"
	}
	function donothing {
	makes char do nothing
	}
	function monsterVolume {
	find distance to monster and map from 500 to 0 the volume of a thing which is playing
	}
}
monster (x,y){
	this.x = x
	this.y = y
	function display() {
	fill(0)
	ellipseMode(CENTER)
	ellipse(this.x,this.y,10,10)
	}
	function move() {
	move towards char if points not match char
	if points match char then play horrible sounds and once horrible sounds done restartstate = true
	
	}

}
arr (x,y){
	this.x = x
	this.y = y
	this. list = []
	words = [nothing,nothing,nothing,nothing,nothing,nothin,storm,storm,mud,mud,mud]
	for (g = 0; g < 48; g++){
		for (c = y; c < 48; c++){
		append(this.list[g],random(words));
		}
	}
	function display {
	for (c = 0;c<this.list.length();c++){
		for (h = 0; h < this.list[c].length();h++){
			text(this.x + (10*h),this.y + (10*c),this.list[c][h])
		}
	}
	}
	function landCheck() {
	for (c = 0;c<this.list.length();c++){
		for (h = 0; h < this.list[c].length();h++){
			if (this.x + (10*h) == char.x && this.y + (10*c) == char.y){
				return this.list[c][h]
			}
		}
	}
	} 
	function landShift(dir){
	if dir = "down"{
		for (g = 0; g <this.list.length()-1;g++){
			this.list[g] = this.list[g+1];

		}
		for (c = 0; c < 48;g++){
			append(this.list[this.list.legnth()-1],random(words));
		}
	}
		if dir = "up"{
		for (g = 0; g <this.list.length()-2;g++){
			this.list[this.list.length()-1-g] = this.list[this.list.length()-2-g];

		}
		for (c = 0; c < 48;g++){
			append(this.list[0],random(words));
		}
	}
			if dir = "left"{
				for (h = 0; h < this.list.length()-1;h++ ){
		for (g = 0; g <this.list.length()-2;g++){
			this.list[h][this.list.length()-1-g] = this.list[h][this.list.length()-2-g];

		}
		}
		for (h = 0; h < this.list.length()-1; h++)
		for (c = 0; c < 48;g++){
			append(this.list[h][0],random(words));
		}
	}
	}
}

































// A program that says a word which rhymes 
// with the most recent word you said. 
 
// The speech recognizer
var mySpeechRecognizer; // The command your issuing, makes the algorithm do something
var 
var mostRecentSpokenWord;
var mostRecentConfidence;
 
// The speech synthesizer
var myVoiceSynthesizer;
 
// The RiTa Lexicon
var myRitaLexicon;
var bFoundRhymeWithMostRecentWord = true;
var aWordThatRhymesWithMostRecentWord = "";
var arrayOfRhymingWords = [];
 
//=========================================
function setup() {
	createCanvas(320, 320);
 
	// Make the speech recognizer
	mostRecentConfidence = 0;
	mostRecentSpokenWord = "";
	initializeMySpeechRecognizer(); 
 
	// Make the speech synthesizer
	myVoiceSynthesizer = new p5.Speech();
	myVoiceSynthesizer.setVoice(0);
 
	// Create the RiTa lexicon (for rhyming)
	myRitaLexicon = new RiLexicon();
}
 
//=========================================
function initializeMySpeechRecognizer(){
	mySpeechRecognizer = new p5.SpeechRec('en-US'); 
 
	mySpeechRecognizer.continuous = true; // do continuous recognition
	mySpeechRecognizer.interimResults = false; // allow partial recognition 
	mySpeechRecognizer.onResult = parseResult; // recognition callback
	mySpeechRecognizer.start(); // start engine
 
	console.log(mySpeechRecognizer);
}
 
//=========================================
function draw() {
	background(0, 200, 255);
 
	// Draw detected speech:
	fill(255);
	rect(0,0, 319,62);
 
	fill(0);
	textFont("Georgia");
	textSize(18);
	textAlign(LEFT);
	text("You said: \"" + mostRecentSpokenWord + "\"", 10, 25);
	text("I rhymed: \"" + aWordThatRhymesWithMostRecentWord + "\"", 10, 50); 
 
	findRhymeWithMostRecentWord();
 
	fill(0,115,150); 
	text(arrayOfRhymingWords, 10, 90); 
}
 
//=========================================
function keyPressed(){
	if (key === ' '){
		// Press the spacebar to reinitialize the recognizer.
		// This is helpful in case it freezes up for some reason.
		// If you have a lot of freezes, consider automating this.
		initializeMySpeechRecognizer();
	}
}
 
//=========================================
function parseResult() {
	mostRecentConfidence = mySpeechRecognizer.resultConfidence;
	if (mostRecentConfidence > 0.5){ // some confidence threshold...
		console.log (mySpeechRecognizer.resultString);
 
		// The Recognition system will often append words into phrases.
		// So the hack here is to only use the last word:
		mostRecentSpokenWord = mySpeechRecognizer.resultString;
		bFoundRhymeWithMostRecentWord = false;
	}
}
 
//=========================================
function findRhymeWithMostRecentWord(){
 
	if ((bFoundRhymeWithMostRecentWord === false) && 
		(mostRecentSpokenWord.length > 0)){
 
		// Ask RiTa which words rhyme with mostRecentSpokenWord
		var rhymes = myRitaLexicon.rhymes(mostRecentSpokenWord);
 
		// If there are any words that rhyme,
		var nRhymes = rhymes.length;
		if (nRhymes > 0){
 
			// Select a random one from the returned list, and speak it.
	   		aWordThatRhymesWithMostRecentWord = rhymes[floor(random(nRhymes))];
	  		myVoiceSynthesizer.speak( aWordThatRhymesWithMostRecentWord);
 
	  		// Keep the first 10 rhyming words; insert some newline characters
	  		var arr = subset(rhymes, 0, min(nRhymes, 10)); // max of 10 words
  			arrayOfRhymingWords = arr.join("\n");
 
	  	} else {
	  		// But if there are no rhymes, blank it. 
			aWordThatRhymesWithMostRecentWord = "";
			arrayOfRhymingWords = [];
	  	}
  		bFoundRhymeWithMostRecentWord = true;
	}
}
*/