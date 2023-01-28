const WorkerTableGood = require('../../services/worker-tables/goods')
//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')

module.exports = (app) => {
    /**
     * Маршрут для редактирования оного товара:
     * Автор: Резникова Виктория
     * Описание: Возвращает JSON с полями, которые описывают успешное редактирования товара в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/goods/edit
    */
    
    app.post('/goods/edit', fileFromForm, function(req, res){

        const data = {
            'ID': req.body.ID,
            'TITLE': req.body.TITLE,
            'DISCR': req.body.DISCR,
            'PRICE': req.body.PRICE,
            'IMG': req.body.IMG,
            'COUNT': req.body.COUNT
        }

        const workerTableGood = new WorkerTableGood(req, res);
        workerTableGood.update(data)


    })
    
    app.get('/goods/form/edit', function(req, res){
        res.send(
            `
                <h1>
                Тестовая форма, для маршрута - edit_item
                </h1>
                <form enctype="multipart/form-data" action='/goods/edit' method='post'>
                    <input placeholder='ID' type='text' name='ID'/>
                    <input placeholder='TITLE' type='text' name='TITLE'/>
                    <input placeholder='DISCR' type='text' name='DISCR'/>
                    <input placeholder='PRICE' type='text' name='PRICE'/>
                    <input placeholder='COUNT' type='text' name='COUNT'/>
                    <input type='text' placeholder='IMG' name='IMG'/>
                    <input value='Сохранить' type='submit'/>
                </form>
            `
        )
    })
}