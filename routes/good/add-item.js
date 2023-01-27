const multer = require('multer')

const uploadFromForm = multer({dest: 'uploads/'})

const fileFromForm = uploadFromForm.single('MYFILE')
const uuid = require("uuid")

module.exports = (app, connect) => {
    app.post('/add_item', fileFromForm, function(req, res){
        const id = uuid.v4();
        const title = req.body.TITLE;
        const discr = req.body.DISCR;
        const price = req.body.PRICE;
        const img = req.body.IMG;
        const count = req.body.COUNT;
        
        const sql = 'INSERT INTO `goods` (`ID`, `TITLE`, `DISCR`, `PRICE`, `IMG`, `COUNT`) VALUES ("'+ id +'", "'+ title +'", "'+ discr +'", "'+ price +'", "'+ img +'", "'+ count +'")';
        
        connect.query(sql, (err, result) => {
            err ? res.send(err) : res.send(JSON.stringify(result))
        })
    })

    app.get('/form_add_item', function(req, res){
        res.send(
            `
                <h1>
                Тестовая форма, для маршрута - add_item
                </h1>
                <form enctype="multipart/form-data"  action='/add_item' method='post'>
                    <input placeholder='TITLE' type='text' name='TITLE'/>
                    <input placeholder='DISCR' type='text' name='DISCR'/>
                    <input placeholder='PRICE' type='text' name='PRICE'/>
                    <input placeholder='COUNT' type='text' name='COUNT'/>
                    <input type='text' placeholder='IMG' name='IMG'/>
                    <input value='Сохранить' type='submit'/>
                </form>
            `
        )
    })
}