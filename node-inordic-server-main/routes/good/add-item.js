const WorkerTableGood = require('../../services/worker-tables/goods')

//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')
const uuid = require("uuid")

module.exports = (app) => {
    /**
     * Маршрут для добавления оного товара:
     * Автор: Резникова Виктория
     * Описание: Возвращает JSON с полями, которые описывают успешное добавление товара в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/goods/form/add
     */
    app.post('/goods/add', fileFromForm, function(req, res){
        //Тут не можем чистать данных с формы без дополнительных плагинов
        //Установил плагин multer, для чтения формы и передачи файлов
        //Получим данные с формы
        const data = {
            "ID": uuid.v4(),
            "TITLE": req.body.TITLE,
            "DISCR": req.body.DISCR,
            "PRICE": req.body.PRICE,
            "IMG": req.body.IMG,
            "COUNT": req.body.COUNT,
        }

        const workerTableGood = new WorkerTableGood(res, req);
        workerTableGood.add(data)
    })

    /**
     * Вспомогательный маршрут для добавления товара в БД
     * Автор: Резникова Виктория
     * Описание: Выводить форму на интерфейс для добавления товара 
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом: 
     * Ввести в адресную строку - http://localhost:3000/goods/form/add
     */
    app.get('/goods/form/add', function(req, res){
        res.send(
            `
                <h1>
                Тестовая форма, для маршрута - add_item
                </h1>
                <form enctype="multipart/form-data"  action='/goods/add' method='post'>
                    <input type='text' name='TITLE'/>
                    <input type='text' name='DISCR'/>
                    <input type='text' name='PRICE'/>
                    <input type='text' name='COUNT'/>
                    <input type='text' name='IMG'/>
                    <input value='Сохранить' type='submit'/>
                </form>
            `
        )
    })

}