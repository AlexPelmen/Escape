control = () => {
	if( Pers.allowControl ){
		if( key.isDown( "LEFT" ) ){
			if( Pers.state != "goLeft" )
				Pers.states.goLeft();
		}

		if( key.isUp( "LEFT" ) ){
			if( Pers.state != "stand" )
				Pers.states.stand();
		}

		if( key.isDown( "RIGHT" ) ){
			if( Pers.state != "goRight" )
				Pers.states.goRight();
		}

		if( key.isUp( "RIGHT" ) ){
			if( Pers.state != "stand" )
				Pers.states.stand();
		}

		if( key.isDown( "UP" ) ){
			if( Pers.state != "jumpLeft" && Pers.state != "jumpRight"  )
				if( Pers.speed.x < 0 )
					Pers.states.jumpLeft();
				else
					Pers.states.jumpRight();
		}
	}
}