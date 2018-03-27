var COLS = 10,
    ROWS = 20;

var W = 300,
    H = 600,

    BLOCK_W = W / COLS,
    BLOCK_H = H / ROWS;

var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );



var board = [];
var lose;
var interval;
var current,
    currentX,
    currentY;

var line = [
    1, 0, 0,
    1, 0, 0,
    1, 0, 0
];
var len = 3;

var style = [];
var itemColor = [];
var colors = [
    '', 'black', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];