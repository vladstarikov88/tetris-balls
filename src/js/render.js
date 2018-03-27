/* ОТРИСОВКА ОБЪЕКТА */
function drawBlock( x, y ) {
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1 );
}

/* ОТСЛЕЖИВАЮЩАЯ ВСЕ ИЗМЕНЕНИЯ ФУНКЦИЯ, КОТОРАЯ ВЫПОЛНЯЕТ ОТРИСОВКУ */
function render() {
    ctx.clearRect( 0, 0, W, H);

    /* ОТРИСОВКА ПОЛОТНА */
    for ( var x = 0; x < COLS; ++x ) {
        for ( var y = 0; y < ROWS; ++y ) {
            if ( board[ y ][ x ] ) {
                ctx.fillStyle = colors[board[ y ][ x ]];
                drawBlock( x, y );
            }
        }
    }

    /* ОТРИСОВКА ФИГУРЫ */
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

