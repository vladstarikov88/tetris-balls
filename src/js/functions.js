/* ОЧИСТКА ПУСТЫХ БЛОКОВ */
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

/* ПРОВЕРКА НА ОДИНАКОВЫЕ РЯДОМ СТОЯЩИЕ ЭЛЕМЕНТЫ */
/* по массиву board */
function clearLines() {
    for(var y = 0; y < ROWS; y++){
        for ( var x = 0; x < COLS; x++ ) {
            if(board[y][x] !== 0 && x > 0 && y > 0) {

                /* Удаление цеполцек в ряд */
                if(board[y][x-1] == board[y][x] && board[y][x+1] == board[y][x]){
                    deleteRow(board, y, x);
                    clearEmpty(board)
                }

                /* удаление цепочек в столбец */
                if(board[y-1][x] == board[y][x] && board[y+1][x] == board[y][x]){
                    deleteCol(board, y, x);
                    clearEmpty(board)
                }
            }
        }
    }
}

/* УДАЛЕНИЕ ТРЕХ ЭЛЕМЕНТОВ В РЯД */
function deleteRow(arr, y, x) {
    arr[y][x-1] = 0;
    arr[y][x] = 0;
    arr[y][x+1] = 0;

    coins += 3;

    return arr;
}

/* УДАЛЕНИЕ ТРЕХ ЭЛМЕНТОВ В СТОЛБЕЦ */
function deleteCol(arr, y, x) {
    arr[y-1][x] = 0;
    arr[y][x] = 0;
    arr[y+1][x] = 0;

    coins += 3;
    return arr;
}