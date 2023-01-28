const WorkerTableGood = require('../../services/worker-tables/goods')

/**
 * Маршрут для получения оного товара:
 * Автор: Резникова Виктория
 * Описание: Возвращает JSON с одним товаром 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/goods/get
 */

module.exports = (app) => app.get('/goods/get', function(req, res){
    const workerTableGood = new WorkerTableGood(res, req)
    workerTableGood.getAll();
})