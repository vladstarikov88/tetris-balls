/* ОТРИСОВКА ОБЪЕКТА */
function drawBlock( x, y ) {
    /*ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1 )*/
    ctx.arc( BLOCK_W * x + BLOCK_W/2, BLOCK_H * y + BLOCK_H/2, 14, 0, Math.PI * 2, true)
}

/* ОТСЛЕЖИВАЮЩАЯ ВСЕ ИЗМЕНЕНИЯ ФУНКЦИЯ, КОТОРАЯ ВЫПОЛНЯЕТ ОТРИСОВКУ */
function render() {
    ctx.clearRect( 0, 0, W, H);

    /* ОТРИСОВКА ПОЛОТНА */
    for ( var x = 0; x < COLS; ++x ) {
        for ( var y = 0; y < ROWS; ++y ) {
            if ( board[ y ][ x ] ) {
                ctx.fillStyle = colors[board[ y ][ x ]];
                ctx.beginPath();
                drawBlock( x, y );
                ctx.fill()
            }
        }
    }

    /* ОТРИСОВКА ФИГУРЫ */
    ctx.strokeStyle = 'white';
    for ( var y = 0; y < len; ++y ) {
        for ( var x = 0; x < len; ++x ) {
            if ( current[ y ][ x ] ) {
                ctx.fillStyle = colors[current[ y ][ x ]];
                ctx.beginPath();
                drawBlock( currentX + x, currentY + y );
                ctx.fill()
            }
        }
    }
}