const WorkerTableUser = require('../../services/worker-tables/users')

/**
 * Маршрут для получения оного пользователя:
 * Автор: Резникова Виктория
 * Описание: Возвращает JSON с одним пользователем 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/user/[id пользователя]
 */
 module.exports = (app) => app.get('/users/get/:id', function(req, res){
    //Получить данные из параметра 
    const {id} = req.params
    const workerTableUser = new WorkerTableUser(res, req)
    workerTableUser.get(id);
 })