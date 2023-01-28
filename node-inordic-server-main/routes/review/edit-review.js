const WorkerReviews = require('../../services/worker-reviews/index')

//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')

module.exports = (app) => {

    /**
     * Маршрут для получения одного отзыва:
     * Автор: Резникова Виктория
     * Описание: Возвращает JSON с полями, которые описывают успешное редактирование пользователя в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/reviews/edit
     */
     app.post('/reviews/edit', fileFromForm, function(req, res){

        //Получим данные с формы
        const data = {
            'ID': req.body.ID,
            'GOOD_ID': req.body.GOOD_ID,
            'TEXT': req.body.TEXT,
        }
        //Инициализируем объект класса WorkerTableUser, при этом передаем в конструктор 
        const workerReviews = new WorkerReviews(res, req)
        //Добавляем пользователя, через воркер
        workerReviews.update(data)
     })

    /**
     * Вспомогательный маршрут для редактирования пользователя в БД
     * Автор: Резникова Виктория
     * Описание: Выводить форму на интерфейс для редактирования пользователя 
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом: 
     * Ввести в адресную строку - http://localhost:3000/reviews/form/edit
     */
     app.get('/reviews/form/edit', function(req, res){
        res.send(
            `
                <h1>
                    Тестовая форма, для маршрута - edit_review
                </h1>
                <form enctype="multipart/form-data" action='/reviews/edit' method='post'>
                    <input placeholder='ID' type='text' name='ID'/>
                    <input placeholder='GOOD_ID' type='text' name='GOOD_ID'/>
                    <input placeholder='TEXT' type='text' name='TEXT'/>
                    <input value='Сохранить' type='submit'/>
                </form>
            `
        )
    })
}