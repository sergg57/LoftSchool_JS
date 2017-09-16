/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
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
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {

    return new Promise(function(resolve) {
        let xhr = new XMLHttpRequest();
        let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

        xhr.open('GET', url);
        // xhr.responseType ='json';
        xhr.send();
        xhr.addEventListener('load', function() {

            let citiesArray = [];

            citiesArray = JSON.parse(xhr.response);
            citiesArray = citiesArray.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                // a должно быть равным b
                return 0;
            });

            loadingBlock.style.display='none';
            filterBlock.style.display='';

            resolve(citiesArray);
        });
    })
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    let bool = true;

    full = full.toLowerCase();
    chunk = chunk.toLowerCase();

    if (full.indexOf(chunk) < 0 || full.indexOf(chunk) < 0) {
        bool = false;
    }

    return bool;
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
// let townsPromise;

loadTowns();

filterInput.addEventListener('keyup', function() {
    loadTowns().
    then((townsPromise) => {
        let result = [];

        for (var i =0; i < townsPromise.length; i++) {
            if (filterInput.value.length == 0) {
                result = [];
            } else {
                if (isMatching(townsPromise[i].name, filterInput.value) == true) {
                    result.push(townsPromise[i]);
                }// end if-2
            } // end if-1
        } // end for

        while (filterResult.firstChild) {
            filterResult.removeChild(filterResult.firstChild);
        }

        result.forEach((item) => {
            let el = document.createElement('div');

            el.innerText = item.name;
            filterResult.appendChild(el);
        })

    // console.log(' rez-filtr=', result);

        return result;

    })
});

export {
    loadTowns,
    isMatching
};
