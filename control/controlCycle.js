var keysPressed = [];

controlCycle = () => {
	keysPressed = pjs.keyControl.getAllKeysDown();
	if( Pers.allowControl && WinLoose.playing ){
		if( key.isDown( "LEFT" ) && ! key.isDown( "SPACE" ) ){
			if( Pers.state != "goLeft" )
				Pers.states.goLeft();
		}
		if( key.isUp( "LEFT" ) ){
			if( Pers.state != "stand" )
				Pers.states.stand();
		}
		if( key.isDown( "RIGHT" ) && ! key.isDown( "SPACE" ) ){
			if( Pers.state != "goRight" )
				Pers.states.goRight();
		}
		if( key.isUp( "RIGHT" ) ){
			if( Pers.state != "stand" )
				Pers.states.stand();
		}
		if( key.isDown( "UP" ) && ! key.isDown( "SPACE" ) ){
			if( Pers.state != "jumpLeft" && Pers.state != "jumpRight"  )
				if( Pers.speed.x < 0 )
					Pers.states.jumpLeft();
				else
					Pers.states.jumpRight();
		}
		if( key.isDown( "SPACE" ) && key.isDown( "LEFT" ) ){
			if( Pers.state != "throwLeft" ){
				Pers.speed.Set();
				Pers.states.throwLeft();
				timeSpacePressed = 0;
			}
			timeSpacePressed++;
		}
		if( key.isDown( "SPACE" ) && ! key.isDown( "LEFT" ) ){
			if( Pers.state != "throwRight" ){
				Pers.speed.Set();
				Pers.states.throwRight();
				timeSpacePressed = 0;
			}
			timeSpacePressed++;
		}
		if( key.isUp( "SPACE" ) ){
			timeSpacePressed = 0;
			if( Pers.state != "stand" )
				Pers.states.stand();
		}
	}

	if( ! WinLoose.playing && key.isDown( "SPACE" ) )
		WinLoose.start();
	
	//Jump move
	if( Pers.allowJumpMove && ! Pers.allowControl ){		
		if( key.isDown( "LEFT" ) )
			Pers.jumpMove.left();
		if( key.isUp( "LEFT" ) )
			Pers.jumpMove.stop();		
		if( key.isDown( "RIGHT" ) )
			Pers.jumpMove.right();
		if( key.isUp( "RIGHT" ) )
			Pers.jumpMove.stop();
	}
}