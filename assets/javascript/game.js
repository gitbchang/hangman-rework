
$(document).ready(function(){
		//DECLARE ALL VARIABLES
		//Win Counter
		var winCount = 0;
		//Total Lives, wrong guess reduces this by 1
		var lives;
		// var colorChoice = ["purple"];
		var colorChoice = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white"];
		var lettersGuessed = [];
		// Stored all past guesses
		var newGame;
		// Start a new game
		var hiddenWord = [];
		// Store hidden word symbolized with dashes here
		var secretWord;
		// Word that the user will guess
		var secretWordArray = [];
		// array to create letter buttons
		var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];
		
		// For loop to create button out of the letters
		for(var x = 0; x< letters.length; x++){
			var newHangButton = $("<button>");
			newHangButton.text(letters[x]);
			// adding in CSS classes
			newHangButton.addClass("letter-button-color");
			newHangButton.addClass("letter");
			newHangButton.addClass("btn");
			// This class adds the on-click functionality
			newHangButton.addClass("letter-button");
			newHangButton.attr("data-letter", letters[x]);
			$("#letterArea").append(newHangButton);
		}

		// Attaching on-click events to the button
		$(".letter-button").click(function() {
			var clickButton = $("<div>").text($(this).data("letter"));
			console.log("This is the button value: data-letter");
			$("#secretWordSection").append(clickButton);
		});





























		//  choose a random color from colorChoice array.
		function secretWordChoice() {
		secretWord = colorChoice[Math.floor(Math.random() * colorChoice.length)];
		//Breaks the letters of the color up in an array
		secretWordArray = secretWord.split("");
		console.log("This is the random color: " + secretWord);
		}
		
		secretWordChoice();
		// Set all beginning variables to start a new game
		function reset() {
		lives = 6;
		lettersGuessed = [];
		newGame = true;
		}
		reset();
		function hiddenWordReset() {
		hiddenWord = [];
		}
		function checkWin(hiddenArr, secretWordArr) {
		var same = true;
		for(var x = 0; x<hiddenWord.length; x++){
		if(hiddenArr[x] === secretWordArr[x]){
		// console.log("Same Letter");
		}
		else {
		// console.log("Different letter");
		same = false;
		}
		}
		return same;
		}
		
		function winorlose() {
		
			if(lives < 1){
			alert("You have no more lives. GAME OVER");
			var cont = confirm("Press OK to try again");
			if(cont === true){
				secretWordChoice();
				reset();
				hiddenWordReset();
				dashReplace();
				updateStats();
			}
			newGame = false;
			}
			// loop through hiddenWord array to find if there are dashes
			var checkWin2 = checkWin(hiddenWord, secretWordArray);
			if(checkWin2 == true){
				alert("You Win!");
				winCount++;
				var winCont = confirm("Press OK to try again");
				if(winCont === true){
					secretWordChoice();
					reset();
					hiddenWordReset();
					dashReplace();
					updateStats();
				}
			}
		
		}
		
		
		// Add a dash for every letter in the secret word
		function dashReplace(){
			for (var i = 0; i < secretWord.length; i++) {
			hiddenWord.push("_");
			}
		}
		dashReplace();
		document.onkeyup = function(event) {
			//convert user guess to lower case
			var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
			console.log("Your last letter guessed: " + userGuess);
			// if-statement to check if the letter has already been guessed
			if(lettersGuessed.indexOf(userGuess) === -1){
			lettersGuessed.push(userGuess);
			// if this is -1, letter is not in word. subtract a life
			// console.log("letter accuracy test: " + secretWord.indexOf(userGuess));

			if((secretWord.indexOf(userGuess)) === -1) {
			lives = (lives-1);
			updateLives();
			}
			}
			else {
			alert("you have guessed this letter!");
			}
			
			// LOGIC TO CHECK IF LETTER IS IN ARRAY
			if((lives > 0) && (newGame = true) && (userGuess !== 1)){
				for (var i = 0; i < hiddenWord.length; i++) {
				
				if (userGuess === secretWordArray[i]) {
					console.log("This letter matches secret word");
					hiddenWord[i] = userGuess;
					console.log(hiddenWord);
					
					
					console.log(lettersGuessed);
					
				}
				
				updateStats();
				
			} // end of for loop
		
			} //end of if statement to test if newGame and lives are valid
			
			
			

			winorlose();
		}
		
		//	HTML which will be injected into our div
		$("#startButton").click(updateStats);
		
		function buttonNewGame(){
			updateStats();
			reset();
		}
		
		function updateStats (){
			$("#winSection").html("<p>Wins: " + winCount + "</p>");
			$("#liveSection").html("<p>Lives: " + lives + "</p>");
			$("#secretWordSection").html("<h3>YOUR WORD: " + hiddenWord + "</h3>");
			$("#guessSection").html("<h3>Previous Guesses: " + lettersGuessed + "</h3>");
		}	

		function pushGuesses() {
							$("#guessSection").html("<h3>Previous Guesses: " + lettersGuessed + "</h3>");
						}
						function updateLives(){
							$("#liveSection").html("<p>Lives: " + lives + "</p>");
						}
					


}); // end of document ready

