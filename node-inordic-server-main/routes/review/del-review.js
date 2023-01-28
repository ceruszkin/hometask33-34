const WorkerReviews = require('../../services/worker-reviews/index')

/**
 * Маршрут для получения оного пользователя:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с одним пользователем 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/user/del/[id пользователя]
 */
module.exports = (app) => app.get('/reviews/del/:id', function(req, res){
    //Получить данные из параметра 
    const {id} = req.params
    const workerReviews = new WorkerReviews(res, req)
    workerReviews.del(id);
})