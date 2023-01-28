const WorkerDataBase = require('../worker-data-base')

module.exports = class WorkerReviews extends WorkerDataBase{
    #name = 'reviews'
    constructor(res, req){
        super()
        this.name_table = this.#name
        this.response = res
        this.request = req
    }
}