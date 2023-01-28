//Документация NODE
//https://nodejs.org/dist/latest-v16.x/docs/api/synopsis.html#example

//Импортируем плагины
const express = require("express");
const mysql = require("mysql")
//создадим подключение к базе данных
// 1 - Создадим функцию-конфигурацию для подключения
function config () {
    return {
      host: "94.228.126.172",
      port: 3306,
      user: "inordic_sch_usr",
      password: "VANCfzNsov9GDt1M",
      database: "inordic_school",
      connectionLimit : 1000,
      connectTimeout  : 60 * 60 * 1000,
      acquireTimeout  : 60 * 60 * 1000,
      timeout         : 60 * 60 * 1000
    }
}

//Инициализируем приложение express
const app = express();

//1 - Корневой маршрут
//Первый базовый маршрут приложения
app.get(
    '/',
    function(request, response){
        
        response.send(
            `
                <h1>
                    Корневой маршрут / Разводная страница
                </h1>
                <h2>
                    Товары
                </h2>
                <ul> 
                    <li>
                        <a href='/goods/get/:id'>
                            1 - Маршрут для получения одного товара.
                        </a>
                    </li>
                    <li>
                        <a href='/goods/get'>
                            2 - Маршрут для получения всех товаров.
                        </a>
                    </li>
                    <li>
                        <a href='/goods/del/:id'>
                            3 - Маршрут для удаления товара.
                        </a>
                    </li>
                    <li>
                        <a href='/goods/form/add'>
                            4 - Маршрут для добавления товара.
                        </a>
                    </li>
                    <li>
                        <a href='/goods/form/edit'>
                            5 - Маршрут для редактирования товара.
                        </a>
                    </li>
                </ul>
                <h2>
                    Пользователи
                </h2>
                <ul>
                    <li>
                        <a href='/users/form/add'>
                            1 - Маршрут для добавления пользователя.
                        </a>
                    </li>
                    <li>
                        <a href='/users/get'>
                            2 - Маршрут для просмотра всех пользователей.
                        </a>
                    </li>
                    <li>
                        <a href='/users/get/:id'>
                            3 - Маршрут для просмотра одного пользователя.
                        </a>
                    </li>
                    <li>
                        <a href='/users/form/edit'>
                            4 - Маршрут для редактирования пользователя.
                        </a>
                    </li>
                    <li>
                        <a href='/users/del/:id'>
                            5 - Маршрут для удаления пользователя.
                        </a>
                    </li>
                </ul>
                <h2>
                    Почта
                </h2>
                <ul>
                    <li>
                        <a href='/mail/form'>
                            Маршрут для отправки письма.
                        </a>
                    </li>
                </ul>
                <h2>
                    Отзывы
                </h2>
                <ul>
                    <li>
                        <a href='/reviews/get'>
                            1 - Маршрут для получения всех отзывов.
                        </a>
                    </li>
                    <li>
                        <a href='/reviews/get/:id'>
                            2 - Маршрут для получения одного отзыва.
                        </a>
                    </li>
                    <li>
                        <a href='/reviews/form/add'>
                            3 - Маршрут для добавления отзыва.
                        </a>
                    </li>
                    <li>
                        <a href='/reviews/form/edit'>
                            4 - Маршрут для редактирования отзыва.
                        </a>
                    </li>
                    <li>
                        <a href='/reviews/del/:id'>
                            5 - Маршрут для удаления отзыва.
                        </a>
                    </li>
                </ul>
            `
        )
    }
)

//Распределяем роутеры по файлам
require('./routes/good/get-all-good.js')(app)
require('./routes/good/get-item.js')(app)
require('./routes/good/del-item.js')(app)
require('./routes/good/add-item.js')(app)
require('./routes/good/edit-item.js')(app)

//Роуты для пользователей
require('./routes/user/add-user.js')(app)
require('./routes/user/get-all-users')(app)
require('./routes/user/get-user')(app)
require('./routes/user/edit-user')(app)

//Роуты для отзывов
require('./routes/review/get-all-reviews')(app)
require('./routes/review/get-review')(app)
require('./routes/review/add-review')(app)
require('./routes/review/edit-review')(app)

//Роуты для писем
require('./routes/mail')(app)


//Начинаем прослушивать определенный порт
app.listen(3000);