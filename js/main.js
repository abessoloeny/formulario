
const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

//creamos la conection en la base de datos previamente conectado
const conexion = mysql.createConnection({
    host : "localhost",
    database : "alumnos",
    user : "root",
    password: "admin"
})
app.use(express.static('../evaluacion'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.status(200).sendFile(`${__dirname}/index.html`);

})
app.post('/validForm', (req, res) => {
    const datos = req.body;
    const nombre = req.body.name;
    const apellidos = req.body.surname;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const curso = req.body.curso;
    const fecha = req.body.fecha;
    const escuela = req.body.escuela;
    
    const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!nombre || !apellidos || !curso || !fecha){
        res.status(400).json({  message: 'Complete ALL data in the Form..'
        })
    }
    if(!emailValid.test(email)){
        res.status(400).json({  message: 'Invalid E-mail'
        })
    }
    if(telefono.length < 9){
        res.status(400).json({  message: 'Telefono Incorrect...'
        })
    }
    
    res.status(200).json({
        message: 'Formulario de registro',
        datos
    })
    console.log(datos);
    //almacenamos todos los datos 
    
    const registro = "INSERT INTO ESTUDIANTE(nombre,apellidos,email,telefono,curso,fecha,escuela) VALUES('"+nombre
+"','"+apellidos+"','"+email+"','"+telefono+"','"+curso+"','"+fecha+"','"+escuela+"')";
    conexion.query(registro, (err)=>{
        if(err) console.log(err);
        else
        console.log('Datos Guardados...');
    })
})

app.listen(port, ()=>{
    console.log("Servidor escuchado en http://localhost:"+port);
})