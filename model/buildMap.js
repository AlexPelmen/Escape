//initialization and generaion map
var blockMap = [];
//blocks
var blockObjects = [];
//height
var height = 3;
var posIncHeight = 0.5;
//steeps
var steep = 0;
//color
var BlockColor = new _Color( DEFAULT_BLOCK_COLOR.R, DEFAULT_BLOCK_COLOR.G, DEFAULT_BLOCK_COLOR.B );

//function to build the game world
function buildMap(){
	//Processing counting of all blocks
	for( Bx = 0; Bx < MAX_BX; Bx++ ){
		if( Math.random() < POS_CHANGE_HEIGHT ){
			
			posIncHeight = (MID_H - height)*2/(MAX_H - MIN_H);	//posibility height change			
			
			if( Math.random() > POS_CHANGE_STEEP ){	//steeps
			 	if( steep < MAX_STEEP )  //maximal limit
					steep++;			
			}
			else{
				if( steep > MIN_STEEP )  //minimal limit
					steep--;			
			}
			//change height
			var sign = Math.sign( posIncHeight - Math.random() );
			height += steep*sign;
		}

		//getting block coords of i-column
		for( By = MIN_BY; By < height; By++ ){			
			//color	
			COLORS.forEach( ( color ) => {
				var sign;
				if( Math.random() > POS_CHANGE_COLOR[ color ] ){
					sign = Math.sign( Math.random() - 0.5 );
					preColor = COLOR_STEP*sign + BlockColor[ color ];
					if( preColor > MAX_COLOR[ color ] )
						BlockColor[ color ] -= COLOR_STEP;
					else if( preColor < MIN_COLOR[ color ] )
						BlockColor[ color ] += COLOR_STEP;
					else
						BlockColor[ color ] = preColor;
				}
			});

			blockMap.push( {
				x: Bx,
				y: By,
				color: BlockColor.get()
			} );
		}	
	}

	//Here we have blockMap... we need to get 
	//blockObjects array from this one

	//Filling array blockObjects
	blockMap.forEach( function( block ){				
		blockObjects.push( 
			game.newRectObject({
				x: block.x * BLOCK_W,					
				y: pjs.system.getWH().h - block.y * BLOCK_H,
				w: BLOCK_W,
				h: BLOCK_H,
				fillColor: block.color
			})
		)				
	})
}