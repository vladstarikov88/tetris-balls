var COLS = 10, ROWS = 20;
var board = [];
var lose;
var interval;
var current; // current moving shape
var currentX, currentY; // position of current shape
var line = [
    1, 0, 0,
    1, 0, 0,
    1, 0, 0
];
var len = 3;

let style = [];
var itemColor = []

var colors = [
    '', 'black', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];

let temp = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 2, 3, 2, 0, 0, 0, 0],
    [0, 0, 0, 2, 3, 5, 0, 0, 0, 0],
    [0, 0, 0, 5, 2, 4, 0, 0, 0, 0],
    [0, 0, 2, 7, 4, 4, 7, 4, 2, 6],
    [0, 0, 6, 5, 4, 5, 2, 2, 5, 5],
    [0, 0, 1, 2, 2, 2, 5, 3, 6, 2]
]

// check if any lines are filled and clear them
function findEl(arr) {
    let number;
    for(var y = ROWS-1; y > 0; y--){
        for ( var x = 0; x < COLS; x++ ) {
            let found = 0;
            if(arr[y][x] !== 0 && x > 0 && y > 0) {
                if(arr[y][x-1] == arr[y][x] && arr[y][x+1] == arr[y][x]){
                    arr[y][x-1] = 0;
                    arr[y][x] = 0;
                    arr[y][x+1] = 0;

                    clearEmpty(arr);
                }
            }
        }
    }
    return arr;
}

function clearEmpty(arr){
    for(var y = ROWS-1; y > 0; y--){
        for ( var x = 0; x < COLS; x++ ) {
            if(arr[y][x] == 0){
                for(var z = y; z > 0; z--){
                    arr[z][x] = arr[z-1][x]
                }
            }
        }
    }
    return arr;
}

function deleteRow(arr, y, x) {
    arr[y][x-1] = 0;
    arr[y][x] = 0;
    arr[y][x+1] = 0;

    return arr;
}
function deleteCol(arr, y, x) {
    arr[y-1][x] = 0;
    arr[y][x] = 0;
    arr[y+1][x] = 0;

    return arr;
}



// creates a new 3x3 shape in global variable 'current'
// 3x3 so as to cover the size when the shape is rotated
function newShape() {
    var shape = line; // maintain id for color filling

    current = [];
    for(let i = 0; i < len; i++) {
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
    console.log(board)


    // position where the shape will evolve
    currentX = 5;
    currentY = 0;
}

function rand (size) {
    let num = Math.round(Math.random() * (size + 1) - 0.5);
    if(num === -0) {
        return num = 0;
    } else{
        return num
    }
}

function randomInteger(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

// clears the board
function init() {
    for ( var y = 0; y < ROWS; ++y ) {
        board[ y ] = [];
        for ( var x = 0; x < COLS; ++x ) {
            board[ y ][ x ] = 0;
        }
    }
}

// keep the element moving down, creating new shapes and clearing lines
function tick() {
    if ( valid( 0, 1 ) ) {
        ++currentY;
        clearEmpty(board)
    }
    // if the element settled
    else {
        freeze();
        clearLines();
        if (lose) {
            newGame();
            return false;
        }
        newShape();
    }
}

// stop shape at its position and fix it to board
function freeze() {
    for ( var y = 0; y < len; ++y ) {
        for ( var x = 0; x < len; ++x ) {
            if ( current[ y ][ x ] ) {
                board[ y + currentY ][ x + currentX ] = current[ y ][ x ];
            }
        }
    }
}

// returns rotates the rotated shape 'current' perpendicularly anticlockwise
function rotate( arr ) {
    var temp = []
    arr.forEach(function(item) { return temp.push(item[0]) })
    temp=temp.splice(-1).concat(temp);

    for(var s = 0; s < arr.length; s++) {
        arr[s][0] = temp[s];
    }

    console.log(temp)
    return arr;
}

// check if any lines are filled and clear them
function clearLines() {
    let number;
    for(var y = 0; y < ROWS; y++){
        for ( var x = 0; x < COLS; x++ ) {
            let found = 0;
            if(board[y][x] !== 0 && x > 0 && y > 0) {
                number = board[y][x]

                if(board[y-1][x] == board[y][x] && board[y+1][x] == board[y][x]){
                    deleteCol(board, y, x);
                    clearEmpty(board)
                }
                if(board[y][x-1] == board[y][x] && board[y][x+1] == board[y][x]){
                    deleteRow(board, y, x);
                    clearEmpty(board)
                }
            }
        }
    }
}

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

// checks if the resulting position of current shape will be feasible
function valid( offsetX, offsetY, newCurrent ) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = currentX + offsetX;
    offsetY = currentY + offsetY;
    newCurrent = newCurrent || current;



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

function newGame() {
    clearInterval(interval);
    init();
    newShape();
    lose = false;
    interval = setInterval( tick, 1000 );
}

newGame();