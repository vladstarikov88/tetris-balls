var start = document.getElementById('start')
var modal = document.getElementById('modal');
var results = document.getElementById('results')
var results_input = document.getElementById('results_input')
var results_show = document.getElementById('results_show');
var results_save = document.getElementById('results_save');
var endgame = document.getElementById('endgame');




/* ОБРАБОТЧИК КНОПaaКИ "НОВАЯ ИГРА" */
start.addEventListener("click", function(){
    modal.classList.add('dn');  //очистка окна приветствия

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
        var result = {};

        cookie.forEach(function(item, i) {
            item = item.split('=')
            result[item[0]] = item[1];
        })

        var globalDiv = document.createElement('div');
        for(var key in result){
            var div = document.createElement('div');
            div.className = "modal_results-item";
            div.innerHTML = "<p>" + key + "</p>" + "<p>" + result[key] + "</p>";

            globalDiv.appendChild(div);
        }
        console.log(result)
        console.log(globalDiv)

        var el = document.getElementById('modal_results-res');
        el.innerHTML = '';
        el.appendChild(globalDiv);
    }
}



/* КОНЕЦ ИГРЫ */
function endGame(){
    endgame.classList.remove('dn');
    final_result.innerHTML = final_result.innerHTML + ": " + coins

    saveResults();
}

saveResults();