//В ноде, можно экспортироваnm, исключительно через конструкцию module.exports = (можно экспортировать классы, переменные, функции и тд)
/**
 * Абстрактный класс, для работы с таблицами в БД
 * Список атрибутов:
 * name_table - название таблицы, с которой будет работать реализация.
 * Список методов:
 * getConnect - устанавливаем соединение с базой данных и возвращаем ее.
 * getAll - обращается к таблице и возвращает из нее все поля и все строки.
 * get - обращается к таблице и возвращает определенную строку из таблицы, за счет параметра айди, который мы передаем извне.
 * query - Отправка запроса на сервер
 * update - Обновление (сделать на 34 занятии)
 * del -  Удаление (домашняя) - ориентируемся на метод get
 */
const { query } = require("express")
const mysql = require("mysql")

module.exports = class WorkerDataBase{
    response 
    request
    name_table
    //Закрыли атрибут конфиг приватным уровнем доступа, для невозможности его изменения
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
    query(sql){
        this.getConnect().query(
            sql,
            (error, result) => {
                if(error){
                    //Выводим ошибку
                    this.response.send(
                        error
                    )
                //если ошибки нет
                }else{
                    //отправляем результат запроса на экран
                    this.response.send(
                        //Предварительно, через метод JSON.stringify, преобразуем объект в строку JSON
                        JSON.stringify(result)
                    )
                }
            }
        )
    }
    
    getConnect(){
        return mysql.createPool(this.#config)
    }
    getAll(){
       //Абстрактный запрос к базе данных
       const sql = `SELECT * FROM ${this.name_table}`
       this.query(sql);
    }
    get(id){
        //Абстрактный запрос к базе данных
        const sql = `SELECT * FROM ${this.name_table} WHERE ID='${id}'`;
        this.query(sql)
    }
    add(data){
         let sql = `INSERT INTO ${this.name_table} `
         //Сгенерировать запрос для добавления пользователей в БД
         //const sql = 'INSERT INTO `users` (`ID`, `NAME`, `SURNAME`, `IMG`, `EMAIL`, `PHONE`, `LOGIN`, `PASSWORD`, `ROLE` ) VALUES ("'+ id +'", "'+ name +'", "'+ surname +'", "'+ img +'", "'+ email +'", "' + phone + '", "' + login + '", "' + password + '", "' + role + '")';
         //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
          
         let partFields = '(';
         let partValue = '(';

         //Количество полей внутри даты
         //1 шаг, получаем все ключи из объекта,  Object.keys вернет массив к слючами полей и дальше, можно обратится к длинне этого массива
         const keysForData = Object.keys(data);
         //2 шаг получаем длинну массива ключей
         const length = keysForData.length

         let i = 0;
         for(const field in data){
            console.log('Название поля:', field)
            console.log('Значение поля:', data[field])
            partFields += "`" + field + "`";
            partValue += "'" +  data[field] + "'";
            //Если, на текущей итерации, элемент массива последний, тогда мы не добавляем запятую, если наоборот, тогда добавляем
            //Если элемент последний, в конце, не нужно добавлять заптуя и пробел
            if(length - 1 !== i ) {
                partFields += `, `;
                partValue += `, `;
            }
            //Создаем, счетчик итераций в for in
            console.log('length', length);
            console.log('Счетчик итераций', i);
            i++;

            }

            //После цикла, нужно закрыть скобку
            partFields += ')';
            partValue += ')';

            //Доcобираем шаблон
            sql += partFields + ' VALUES ' + partValue;
            //Отправляем запрос, через метод query, внутри класса
            this.query(
                sql
            )
         }
         update(data){
            //Cделать на 34 занятии
         }
    }