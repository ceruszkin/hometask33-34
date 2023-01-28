const WorkerReviews = require('../worker-data-base')

module.exports = class WorkerTableUser extends WorkerReviews{
    #name = 'reviews'
    constructor(res, req){
        super()
        this.name_table = this.#name
        this.response = res
        this.request = req
    }
}