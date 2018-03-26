var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];

let ctx = canvas.getContext( '2d' );

/*var ctx = canvas.getContext( '2d' );*/
var W = 300,
    H = 600,

    BLOCK_W = W / COLS,
    BLOCK_H = H / ROWS;

// draw a single square at (x, y)
function drawBlock( x, y ) {
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1 );
}

// draws the board and the moving shape
function render() {
    ctx.clearRect( 0, 0, W, H);

    /* Рисуем полотно */
    for ( var x = 0; x < COLS; ++x ) {
        for ( var y = 0; y < ROWS; ++y ) {
            if ( board[ y ][ x ] ) {
                ctx.fillStyle = colors[board[ y ][ x ]];
                drawBlock( x, y );
            }
        }
    }

    /* рисуем фигуру */
    ctx.strokeStyle = 'white';
    for ( var y = 0; y < len; ++y ) {
        for ( var x = 0; x < len; ++x ) {
            if ( current[ y ][ x ] ) {
                ctx.fillStyle = colors[current[ y ][ x ]];
                drawBlock( currentX + x, currentY + y );
            }
        }
    }
}


setInterval( render, 30 );