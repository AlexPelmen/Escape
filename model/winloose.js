var WinLoose = {
	playing: true,
	winPic: WIN_PIC,
	loosePic: LOOSE_PIC,

	win: null,
	loose: null,
	start: null,
	check: null,
}


WinLoose.win = () => {
	WinLoose.playing = false;
	camera.setPosition( point( 0, 0 ) );
	WinLoose.winPic.draw();
}

WinLoose.loose = () => {
	WinLoose.playing = false;
	camera.setPosition( point( 0, 0 ) );
	WinLoose.loosePic.draw();
}

WinLoose.start = () => {
	buildMap();
	WinLoose.playing = true;
	Pers.init();
	Ufo.init();
	EggsBox.init(); 
}

WinLoose.check = () => {
	if( Pers.health < 0 )
		WinLoose.loose();
	else if( objectPers.x > WIN_X )
		WinLoose.win();
}