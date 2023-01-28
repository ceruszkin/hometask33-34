//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')

module.exports = (app, connect) => {
    /**
     * Маршрут для редактирования оного товара:
     * Автор: Румянцев Александр
     * Описание: Возвращает JSON с полями, которые описывают успешное редактирования товара в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
    */
    app.post('/goods/edit', fileFromForm, function(req, res){
        //Тут не можем чистать данных с формы без дополнительных плагинов
        console.log(req)
        console.log(req)

        const id = req.body.ID;
        const title = req.body.TITLE;
        const discr = req.body.DISCR;
        const price = req.body.PRICE;
        const img = req.body.IMG;
        const count = req.body.COUNT;

        const sql = "UPDATE `goods` SET `TITLE`='"+title+"',`DISCR`='"+discr+"',`PRICE`='"+price+"',`IMG`='"+img+"',`COUNT`='"+count+"' WHERE `ID`='"+id+"'";

        connect.query(sql, (err, result) => {
            err ? res.send(err) : res.send(JSON.stringify(result))
        })
    })
    /**
     * Маршрут для редактирования оного товара:
     * Автор: Румянцев Александр
     * Описание: Возвращает JSON с полями, которые описывают успешное добавление товара в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     */
    app.get('/form_edit_item', function(req, res){
        res.send(
            `
                <h1>
                Тестовая форма, для маршрута - edit_item
                </h1>
                <form enctype="multipart/form-data"  action='/goods/edit' method='post'>
                    <input type='text' name='ID'/>
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