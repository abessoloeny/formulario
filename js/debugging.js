
const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

//creamos la conection en la base de datos previamente conectado
let conexion = mysql.createConnection({
    host : "localhost",
    database : "alumnos",
    user : "root",
    password: "admin"
})
app.use(express.static('../evaluacion'))
app.use(express.json());
//para que pueda reconocer los datos que vienen de una página
//usamos la propriedad extend para decirle si queremos que los analice o no
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.status(200).sendFile(`${__dirname}/index.html`);
    console.log(process.cwd());
})
app.post('/validForm', (req, res) => {
    const datos = req.body;
    res.status(200).json({
        message: 'Formulario de registro',
        datos
    })
    console.log(datos);
    //almacenamos todos los datos 
    const nombre = datos.name;
    const apellido = datos.surname;
    const email = datos.email;
    const telefono = datos.telefono;
    const curso = datos.curso;
    const fecha = datos.fecha;
    const escuela = datos.escuela;
    

let registro = "INSERT INTO TABLA_USER(nombre,apellido,email,telefono,curso,fecha,escuela) VALUES('"+nombre
+"','"+apellido+"','"+email+"','"+telefono+"','"+curso+"','"+fecha+"','"+escuela+"')";
conexion.query(registro, (err)=>{
    if(err) throw err;
    else
    console.log('Datos Guardados...');
})
})

app.listen(port, ()=>{
    console.log("Servidor escuchado en http://localhost:"+port);
})