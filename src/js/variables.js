var COLS = 10,  //кол-во рядов
    ROWS = 20;  //кол-во колонок

var W = 300,    //ширина canvas
    H = 600,    //высота

    BLOCK_W = W / COLS,     //размеры блока
    BLOCK_H = H / ROWS;

var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];           //поиск элемента по тегу
var ctx = canvas.getContext( '2d' );            //указываем, что рисунок плоский



var board = [];     //массив по которому идет отрисовка
var lose;           //
var interval;       //
var current,        //текущий блок
    currentX,       //координаты блока
    currentY;

var line = [        //сам блок
    1, 0, 0,
    1, 0, 0,
    1, 0, 0
];

var len = 3;        //высота блока

var style = [];     //массив цветов
var itemColor = []; //индекс цвета
var colors = [
    '', 'black', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];


var coins = 0;      //очки