/* List of all cards */
var cards = ["fa-camera","fa-camera","fa-car","fa-car","fa-anchor","fa-anchor","fa-bomb","fa-bomb","fa-diamond","fa-diamond","fa-heart","fa-heart","fa-lightbulb-o","fa-lightbulb-o","fa-plane","fa-plane"];

/* Shuffles and adds cards to screen */
shuffle(cards);

for (var i = cards.length - 1; i >= 0; i--) {
    $(".deck").append(`<li class="card">
                <i id= `+ i +`   class="fa `+cards[i]+`"></i>
            </li>`);
 };

/* shuffle function - function from http://stackoverflow.com/a/2450976 */ 
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/* */
let move = 1;
let turnedCard = [];    
let compared = false;
let timer = false;
let time ;		
let starsEarned ;   

var modal = document.getElementById('completeModal');
var span = document.getElementsByClassName("close")[0];

/* Close modal */
span.onclick = function() {
    modal.style.display = "none";
}

myTimer();

/* Displayes flipped card */
$("li").on("click",function(){  
	timer = true;
    if (compared === false) {
    	turnedCard.push($(this));
	    $(this).addClass("show"); 
	    $(this).addClass("open");
	    compareCard();  
	}});
/* Restarts game */
$(".restart").click(function() {
    location.reload();
}) 


function setMove() {
    $(".moves").html(move);
    move++;
    if (move === 16) {
    	$(".stars li:nth-child(3)").addClass("hide");
    } else if (move === 21) {
    	$(".stars li:nth-child(2)").addClass("hide");
    }
}

function compareCard() {

/*if the two turned cards match, apply class; if not, flip back over and array is emptied*/	
    if (turnedCard.length === 2){   
        if (turnedCard[0].children().attr("id") !== turnedCard[1].children().attr("id")) {
        	compared = true;
	        setMove();
	        setTimeout(function(){
	        	if (turnedCard[0].children().attr("class") === turnedCard[1].children().attr("class")) {    
	            	matched();
	            	turnedCard =[];
	            	compared = false;
	            	win();
	        	} 
	        	else {       
	            	unmatched();
	            	turnedCard =[];
	            	compared = false;
	        	}
	    	},1000);
	    } else {
	    	turnedCard.splice(1,1);
	    }	
	   	
    }

}
function matched() {
    turnedCard[0].addClass("matched");
    turnedCard[1].addClass("matched");
    turnedCard[0].addClass("cardLocked");
    turnedCard[1].addClass("cardLocked");
    turnedCard[0].removeClass("card");
    turnedCard[1].removeClass("card");
}

function unmatched() {
    turnedCard[0].removeClass("open show");
    turnedCard[1].removeClass("open show");
}


/* Builds timer that counts up */
function myTimer () {
	let s = 0 ; 
	let display = 0 + " min " + 0 +" sec";
	let min = 0;
	let sec = 0;
	setInterval(function(){
		if (timer === true) {
			s++;
			min = Math.floor(s/60) ;
			sec = s % 60;
			display = "Timer : " +  min + " min " + sec +" sec";
			time = display;
			$(".timer").html(display);

		} else {
			display = "Timer : " + min + " min " + sec +" sec";
			time = display;
			$(".timer").html(display);
		}

		

	},1000);
}

/* Displays modal and model content */
function win() {
    if ($(".deck").children().length === $(".deck").children(".matched").length) {
    	timer = false ; // stop the timer
    	$(".text").html($(".stat-area").html());  content
    	modal.style.display = "block";	    
    	$(".restart").click(function() {
    	location.reload();
		}) 
 
    }

}