/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {

    let myWidth = window.innerWidth;
    let myHeight = window.innerHeight;

    /* -------- Функция генерирует сдучайное число между min и max ----*/
    function NumberRundom (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function GetRandomColor() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';

        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }

        return color;
    }

    let homeworkContainer = document.createElement('div');

    document.body.appendChild(homeworkContainer);
    homeworkContainer.setAttribute('class', 'draggable-div');

    homeworkContainer.style.width =NumberRundom(0, myWidth) + 'px';
    homeworkContainer.style.height =NumberRundom(0, myHeight) + 'px';
    homeworkContainer.style.top = NumberRundom(0, myHeight) + 'px';
    homeworkContainer.style.left = NumberRundom(0, myWidth) + 'px';
    homeworkContainer.style.backgroundColor = GetRandomColor();
    homeworkContainer.style.display = 'none';

  /*
    homeworkContainer.style.width ='100px';
    homeworkContainer.style.height ='100px';
    homeworkContainer.style.top = '50px';
    homeworkContainer.style.left = '20px';
    homeworkContainer.style.backgroundColor = 'red';
    homeworkContainer.style.display = 'none';
*/
    /*
    homeworkContainer.style.cssText = 'background-color:red; \
    width: 100px; \
    height: 100px; \
    position: relative; \
    top: 50px; \
    left: 100px; \
    display: none;\
'; */

    return homeworkContainer;

}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {

    /* let hendler = function (e) {

    }

    target.addEventListener('mousedown', hendler);
  */
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
