const WorkerReviews = require('../../services/worker-reviews/index')

/**
 * Маршрут для получения оного пользователя:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с одним пользователем 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/user/[id пользователя]
 */ 

module.exports = (app) => {

    app.get('/reviews/get', function(req, res){
        console.log(WorkerReviews)
        //Создадим экземпляр вспомогательного класса WorkerTableUser.
        const workerReviews = new WorkerReviews(res, req)
        workerReviews.getAll();
        //res.send('Получение всех пользователей')
    })
}