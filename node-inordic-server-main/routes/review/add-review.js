const WorkerReviews = require('../../services/worker-reviews/index')

//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраиваем, куда будем сохранять файл.
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')
const uuid = require("uuid")

module.exports = (app) => {

    /**
     * Маршрут для добавления отзыва:
     * Автор: Резникова Виктория
     * Описание: Возвращает JSON с полями, которые описывают успешное добавление пользователя в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     */
     app.post('/reviews/add', fileFromForm, function(req, res){

        const data = {
            'ID': uuid.v4(),
            'GOOD_ID': req.body.GOOD_ID,
            'TEXT': req.body.TEXT,
            'USER': req.body.NAME,
        }

        const workerReviews = new WorkerReviews(res, req)
        workerReviews.add(data)

     })

    /**
     * Вспомогательный маршрут для добавления пользователя в БД
     * Автор: Румянцев Александр
     * Описание: Выводить форму на интерфейс для добавления пользователя 
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом: 
     * Ввести в адресную строку - http://localhost:3000/form_add_user
     */
     app.get('/reviews/form/add', function(req, res){
        res.send(
            `
                <h1>
                    Тестовая форма, для маршрута - add_user
                </h1>
                <form enctype="multipart/form-data" action='/reviews/add' method='post'>
                    <input placeholder='NAME' type='text' name='NAME'/>
                    <input placeholder='GOOD_ID' type='text' name='GOOD_ID'/>
                    <input placeholder='REVIEW' type='text' name='TEXT'/>
                    <input type='submit' value='Send review'/>
                </form>
            `
        )
    })
}