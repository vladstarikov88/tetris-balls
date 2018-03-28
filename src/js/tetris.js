/* ИНИЦИАЛИЗАЦИЯ МАССИВА (СТАКАНА) ПО КОТОРОМУ ИДЕТ ОТРИСОВКА */
function init() {
    for ( var y = 0; y < ROWS; ++y ) {
        board[ y ] = [];
        for ( var x = 0; x < COLS; ++x ) {
            board[ y ][ x ] = 0;
        }
    }
}

/* СОЗДАНИЕ НОВОЙ ФИГУРЫ */
function newShape() {
    var shape = line;

    current = [];
    for(var i = 0; i < len; i++) {
        itemColor[i] = randomInteger(1, colors.length - 1)
        style[i] = colors[itemColor[i]];
    }

    for ( var y = 0; y < len; ++y ) {
        current[ y ] = [];
        for ( var x = 0; x < 1; ++x ) {
            var i = len * y + x;

            var colorId = y
            if ( typeof shape[ i ] != 'undefined' && shape[i] ) {
                current[ y ][ x ] = itemColor[colorId];
                colorId++
            }
            else {
                current[ y ][ x ] = 0;
            }
        }
    }


    console.log(itemColor)
    /*console.log(board)*/


    currentX = 5;       //позиция элемента по Х
    currentY = 0;       //позиция элемента по У
}

/* ЗАМОРОЗКА ТЕКУЩЕГО БЛОКА */
function freeze() {
    for ( var y = 0; y < len; ++y ) {
        for ( var x = 0; x < len; ++x ) {
            if ( current[ y ][ x ] ) {
                board[ y + currentY ][ x + currentX ] = current[ y ][ x ];
            }
        }
    }
}

/* ИЗМЕНЕНИЕ ЦВЕТОВ БЛОКА */
function rotate( arr ) {
    var temp = []
    arr.forEach(function(item) { return temp.push(item[0]) })
    temp=temp.splice(-1).concat(temp);

    for(var s = 0; s < arr.length; s++) {
        arr[s][0] = temp[s];
    }

    return arr;
}

/* НАЖАТИЕ НА КЛАВИАТУРУ */
function keyPress( key ) {
    switch ( key ) {
        case 'left':
            if ( valid( -1 ) ) {
                --currentX;
            }
            break;
        case 'right':
            if ( valid( 1 ) ) {
                ++currentX;
            }
            break;
        case 'down':
            if ( valid( 0, 1 ) ) {
                ++currentY;
            }
            break;
        case 'rotate':
            var rotated = rotate( current );
            if ( valid( 0, 0, rotated ) ) {
                current = rotated;
            }
            break;
    }
}

/* ПРОВЕРКА НА ГРАНИЦЫ ТЕКУЩЕГО ЭЛЕМЕНТА */
function valid( offsetX, offsetY, newCurrent ) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = currentX + offsetX;
    offsetY = currentY + offsetY;
    newCurrent = newCurrent || current;


    console.log(offsetY)
    for ( var y = 0; y < len; ++y ) {
        for ( var x = 0; x < len; ++x ) {
            if ( newCurrent[ y ][ x ] ) {
                if ( typeof board[ y + offsetY ] == 'undefined'
                  || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
                  || board[ y + offsetY ][ x + offsetX ]
                  || x + offsetX < 0
                  || y + offsetY >= ROWS
                  || x + offsetX >= COLS ) {
                    if (offsetY == 1) lose = true; // lose if the current shape at the top row when checked
                    return false;
                }
            }
        }
    }
    return true;
}

/* ДВИГАЕТ ЭЛЕМЕНТ, ЕСЛИ ВЫПОЛНЯЕТСЯ ПРОВЕРКА
   ЕСЛИ НЕ ВЫПОЛНЯЕСЯ, ТО ИДЕТ ОСТАНОВКА, ОЧИСТКА ЛИНИИ И ПОЯВЛЕНИЕ НОВОЙ ФИГУРЫ */
function tick() {
    if ( valid( 0, 1 ) ) {
        ++currentY;
    }
    // if the element settled
    else {
        freeze();
        clearLines();
        clearEmpty(board);
        if (lose) {
            endGame();
            clearInterval(interval);
            return false;
        }
        newShape();
    }
}

function newGame() {
    clearInterval(interval);
    init();
    newShape();
    lose = false;
    interval = setInterval( tick, 1000 );
}