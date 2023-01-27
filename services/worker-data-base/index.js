const mysql = require("mysql")
module.exports = class WorkerDataBase{
    response 
    request
    name_table
    
    #config = {
        host: "94.228.126.172",
        port: 3306,
        user: "inordic_sch_usr",
        password: "VANCfzNsov9GDt1M",
        database: "inordic_school",
        connectionLimit : 1000,
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000
    }
    getConnect(){
         return mysql.createPool(this.#config)
    }
    getAll(){
        const sql = `SELECT * FROM ${this.name_table}`
        this.getConnect().query(
            sql,
            (error, result) => {
                if(error){
                    this.response.send(
                        error
                    )
                
                }else{
                    this.response.send(
                        JSON.stringify(result)
                    )
                }
            }
        )
    }

    get(id){
        const sql = `SELECT * FROM ${this.name_table} WHERE ID='${id}'`;
        this.getConnect().query(
            sql,
            (error, result) => {
                if(error){
                    this.response.send(
                        error
                    )
                }else{
                    this.response.send(
                        JSON.stringify(result)
                    )
                }
            }
        )
    }

    add(data){
        let sql = `INSERT INTO '${this.name_table}' `
        
        for(const field in data){
            console.log('Название поля:', field)
            console.log('Значение поля:', data[field])
        } 

       sql += '';

        this.response.send(
           sql
       )
   }
}