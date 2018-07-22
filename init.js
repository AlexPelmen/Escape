//initialization and generaion map
var blockMap = [];

//height
var height = 3;
var posIncHeight = 0.5;
var posChangeHeight = 0.5;
var MaxH = 15;
var MinH = 0;
var MidH = MaxH - MinH;

//steeps
var steep = 0;
var MaxS = 2;
var MinS = 0;
var posChangeSteep = 0.3;

//block coords
var MinBx = 0;
var MinBy = MinH;
var MaxBx = 1000;
var MaxBy = MaxH;

//color
const COLORS = [ "R", "G", "B" ];

var BlockColor = {
	R: 80,
	G: 136,
	B: 47,

	get: () => {
		return "RGB(" + BlockColor.R + ", " + BlockColor.G + ", "  + BlockColor.B + " )";
	}
}

var MaxColor = {
	R: BlockColor.R + 50,
	G: BlockColor.G + 50,
	B: BlockColor.B + 50
}
var MinColor = {
	R: BlockColor.R - 50,
	G: BlockColor.G - 50,
	B: BlockColor.B - 50
}

var colorStep = 5;
var posChangeColor = {
	R: 0.5,
	G: 0.5,
	B: 0.5
}

//blocks
var blockObjects = [];
var blockW = 70;
var blockH = 70;

//function to build the game world
function initialization(){
	//Processing counting of all blocks
	for( Bx = 0; Bx < MaxBx; Bx++ ){	//1000 blocks

		if( Math.random() < posChangeHeight ){			//changing height
			posIncHeight = (MidH - height)*2/(MaxH - MinH);

			//steeps
			if( Math.random() > posChangeSteep ){
			 	if( steep < MaxS )  //maximal limit
					steep++;			
			}
			else{
				if( steep > MinS )  //minimal limit
					steep--;			
			}

			//change height
			var sign = Math.sign( posIncHeight - Math.random() );
			height += steep*sign;
		}

		//getting block coords of i-column
		for( By = MinBy; By < height; By++ ){
			
			//color	
			COLORS.forEach( ( color ) => {
				var sign;
				if( Math.random() > posChangeColor[ color ] ){
					sign = Math.sign( Math.random() - 0.5 );
					preColor = colorStep*sign + BlockColor[ color ];
					if( preColor > MaxColor[ color ] )
						BlockColor[ color ] -= colorStep;
					else if( preColor < MinColor[ color ] )
						BlockColor[ color ] += colorStep;
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
				x: block.x * blockW,					
				y: pjs.system.getWH().h - block.y * blockH,
				w: blockW,
				h: blockH,
				fillColor: block.color
			})
		)				
	})
}
