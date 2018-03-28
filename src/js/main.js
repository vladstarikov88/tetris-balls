var start = document.getElementById('start')
var modal = document.getElementById('modal');
var results = document.getElementById('results')
var results_input = document.getElementById('results_input')
var results_show = document.getElementById('results_show');
var results_save = document.getElementById('results_save');
var endgame = document.getElementById('endgame');
var levels = document.getElementById('levels');




/* ОБРАБОТЧИК КНОПaaКИ "НОВАЯ ИГРА" */
start.addEventListener("click", function(){
    modal.classList.add('dn');  //очистка окна приветствия

    setGameLevel();             //выбор уровня сложности
    newGame();                  //запуск логики игры
    setInterval( render, 30 );  //запук отрисовки
    controllerEnable();         //включение управления с клавиатуры
});

/* ОБРАБОТЧИК КНОПКИ "ПОКАЗАТЬ РЕЗУЛЬТАТЫ" */
results_show.addEventListener("click", function(){
    document.getElementById('results').classList.remove('dn');
});


/* ОБРАБОТЧИК КНОПКИ "СОХРАНИТЬ РЕЗУЛЬТАТ" */
results_save.addEventListener("click", function(){
    document.cookie = results_input.value + '=' + coins;
    console.log(document.cookie)
    saveResults();
    location.reload()
});


/* Запись результатов в таблицу */

function saveResults() {
    if(document.cookie == "") {
        console.log('not found')
    } else {
        console.log('found')
        var cookie = document.cookie.split('; ');
        var result  = [];

        /*
            Этот комментарий должна удалить

            Внимательно посмотри, как теперь сохраняются данные из куков (в массив, состоящий из объектов со значеинями name и coins (значение будет выводиться в консоли(F12)))

         */

        cookie.forEach(function(item, i) {
            item = item.split('=')
            /* проверка, нет ли неопределенных значений (тоже коммент удалить) */
            if(item[1] === undefined){
            } else{
                result.push({
                    name: item[0],
                    coins: item[1]
                })
            }
        })

        /* сортировка по полю coins */
        result.sort(compareCoins)

        console.log(result)

        var globalDiv = document.createElement('div');
        result.forEach(function(item, i) {
            /* Запись первых 10 лучших результатов */
            if(i < 10) {
                var div = document.createElement('div');
                div.className = "modal_results-item";
                div.innerHTML = "<p>" + item.name + "</p>" + "<p>" + item.coins + "</p>";
                globalDiv.appendChild(div);
            }

        })
        console.log(result)
        console.log(globalDiv)

        var el = document.getElementById('modal_results-res');
        el.innerHTML = '';
        el.appendChild(globalDiv);
    }
}

/* Чем сложнее, тем быстрее двигаются фигуры и тем больше цветов */
function setGameLevel(){
    switch(levels.value){
        case 'easy':
            speed = 700;
            break;
        case 'medium':
            speed = 500;
            colors.push('orange', 'purple');
            break;
        case 'hard':
            speed = 200;
            colors.push('orange', 'purple', 'black', 'hotpink');
            break;
    }
}

/* КОНЕЦ ИГРЫ */
function endGame(){
    endgame.classList.remove('dn');
    final_result.innerHTML = final_result.innerHTML + ": " + coins

    saveResults();
}

saveResults();