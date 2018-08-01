
//Just main loop
game.newLoop( "game", () => {
	controlCycle();
	modelCycle();	
	viewCycle();
});

//start game
WinLoose.start();
game.startLoop( "game" );
