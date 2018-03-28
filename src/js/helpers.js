/* РАНДОМНОЕ ЧИСЛО */
function randomInteger(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

/* СРАВНЕНИЕ ПО ПОЛЮ ОЧКОВ */
function compareCoins(personA, personB) {
  return personB.coins - personA.coins;
}