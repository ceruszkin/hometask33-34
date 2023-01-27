module.exports = (app) => app.get('/users/get/:id', function(req, res){
     
    const {id} = req.params
    console.log('id пользователя: ', id)
    const workerTableUser = new WorkerTableUser(res, req)
    workerTableUser.get(id);
})