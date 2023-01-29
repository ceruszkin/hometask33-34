const WorkerTableUser = require('../../services/worker-tables/users')

module.exports = (app) => app.get('/users/del/:id', function(req, res){
    //Получить данные из параметра 
    const {id} = req.params
    const workerTableUser = new WorkerTableUser(res, req)
    workerTableUser.del(id);
    })