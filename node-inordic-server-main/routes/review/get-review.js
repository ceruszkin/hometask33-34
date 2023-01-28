const WorkerReviews = require('../../services/worker-reviews/index')

/**
 * Маршрут для получения одного отзыва:
 * Автор: Резникова Виктория
 * Описание: Возвращает JSON с одним пользователем 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/reviews/get/:id
 */ 
module.exports = (app) => app.get('/reviews/get/:id', function(req, res){
    //Получить данные из параметра 
    const {id} = req.params
    console.log('id пользователя: ', id)
    const workerReviews = new WorkerReviews(res, req)
    workerReviews.get(id);
 })