const WorkerTableUser = require('../../services/worker-tables/users')

/**
 * Маршрут для получения оного пользователя:
 * Автор: Резникова Виктория
 * Описание: Возвращает JSON с одним пользователем 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/user/del/[id пользователя]
 */
module.exports = (app) => app.get('/users/del/:id', function(req, res){
    //Получить данные из параметра 
    const {id} = req.params
    const workerTableUser = new WorkerTableUser(res, req)
    workerTableUser.del(id);
})