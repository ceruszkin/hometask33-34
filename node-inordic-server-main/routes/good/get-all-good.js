const WorkerTableGood = require('../../services/worker-tables/goods')

module.exports = (app) => app.get('/goods/get', function(req, res){
    const workerTableGood = new WorkerTableGood(res, req)
    workerTableGood.getAll();
})