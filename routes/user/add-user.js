const multer = require('multer')

const uploadFromForm = multer({dest: 'uploads/'})

const fileFromForm = uploadFromForm.single('MYFILE')
const uuid = require("uuid")

const WorkerTableUser = require('../../services/worker-tables/users')

module.exports = (app, connect) => {

    app.post('/users/add', fileFromForm, function(req, res){

        
        const data = {
            'ID': uuid.v4(),
            'NAME': req.body.NAME,
            'SURNAME': req.body.SURNAME,
            'EMAIL': req.body.EMAIL,
            'IMG': req.body.IMG,
            'PHONE': req.body.PHONE,
            'LOGIN': req.body.LOGIN,
            'PASSWORD': req.body.PASSWORD,
            'ROLE': req.body.ROLE,
        }

        const workerTableUser = new WorkerTableUser(res, req)
        workerTableUser.add(data)


     })
    
     app.get('/form_add_user', function(req, res){
        res.send(
            `
                <h1>
                    Тестовая форма, для маршрута - add_user
                </h1>
                <form enctype="multipart/form-data" action='/add_user' method='post'>
                <form enctype="multipart/form-data" action='/users/add' method='post'>
                    <input placeholder='NAME' type='text' name='NAME'/>
                    <input placeholder='SURNAME' type='text' name='SURNAME'/>
                    <input placeholder='IMG' type='text' name='IMG'/>
                    <input placeholder='EMAIL' type='text' name='EMAIL'/>
                    <input placeholder='PHONE' type='text' name='PHONE'/>
                    <input placeholder='LOGIN' type='text' name='LOGIN'/>
                    <input placeholder='PASSWORD' type='text' name='PASSWORD'/>
                    <input placeholder='ROLE' type='text' name='ROLE'/>
                    <input value='Сохранить' type='submit'/>
                </form>
            `
        )
    })
}