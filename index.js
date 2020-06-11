const express = require("express")
const app = express()

// llamando hbs y configurando el motor de vistas
const hbs = require('hbs')

hbs.registerPartials(__dirname +'/partials');
app.set('view engine', 'hbs');

//body parser - sirve para la decodificacion de los envios por url y json files(pero yo no lo uso, solo url)
const bodyParser = require('body-parser')

var urlencoder = bodyParser.urlencoded({extended:false})


//Path configuraciones
const path = require('path')
const directorioPublico = path.join(__dirname, '/public');
app.use(express.static(directorioPublico));

//coneccion a base de datos
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/netColombia",{ useUnifiedTopology: true, useNewUrlParser: true },(err,connected)=>{
	if(err){
		console.log(err)
	}else{
		console.log("Conexion a la base de datos realizada")
	}
})

require("./basededatos/queries.js")

app.get("/",(req,res)=>{
	res.render("index")
})

app.get("/adm",(req,res)=>{
	res.render("loginadm")
})
app.post("/paneladm",urlencoder,(req,res)=>{
	datos = req.body;
	query = login(datos)
	query.exec((err,datos)=>{
		data = datos[0]
		if(data.rol==0){
			res.render("paneladm")
		}else{
			console.log("el usuario no es administrador")
		}
	})
	console.log(query)
	console.log(datos)
	
})
app.post("/add",urlencoder,(req,res)=>{
	datos = req.body
	añadir_producto(datos)
	res.render("paneladm")
})

app.listen(3000)
console.log("localhost:3000")