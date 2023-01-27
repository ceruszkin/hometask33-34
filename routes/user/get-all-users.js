const WorkerTableUser = require('../../services/worker-tables/users')

const workerTableUser = new WorkerTableUser(res, req)
workerTableUser.getAll();