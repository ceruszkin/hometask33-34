const WorkerTableGood = require('../../services/worker-tables/goods')

/**
 * Маршрут для удаления оного товара:
 * Автор: Резникова Виктория
 * Описание: Возвращает JSON с полями, которые описывают успешное удаление товара из БД 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/goods/del/1
 */

module.exports = (app) => app.get('/goods/del/:id', function(req, res){
    const {id} = req.params
    const workerTableGood = new WorkerTableGood(res, req)
    workerTableGood.del(id);
 }) 