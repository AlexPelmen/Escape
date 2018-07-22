
//Just main loop
game.newLoop( "game", () => {
	controlCycle();
	modelCycle();	
	viewCycle();
});

//start game
buildMap();
game.startLoop( "game" );
