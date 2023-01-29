const WorkerReviews = require('../../services/worker-reviews/index')

/**
 * Маршрут для получения одного отзыва:
 * Автор: Резникова Виктория
 * Описание: Возвращает JSON с одним пользователем 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/reviews/get
 */ 

module.exports = (app) => {

    app.get('/reviews/get', function(req, res){
        //Создадим экземпляр вспомогательного класса WorkerTableUser.
        const workerReviews = new WorkerReviews(res, req)
        workerReviews.getAll();
        //res.send('Получение всех пользователей')
    })
}