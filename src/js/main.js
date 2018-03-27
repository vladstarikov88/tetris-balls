function newGame() {
    clearInterval(interval);
    init();
    newShape();
    lose = false;
    interval = setInterval( tick, 1000 );
}

/*newGame();*/
/*setInterval( render, 30 );*/