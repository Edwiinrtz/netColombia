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


//cookies
const cookieSession = require('cookie-session')

app.use(cookieSession({
	name: 'cookie',
	secret: 'coksesnetcolom',
	maxAge:24*60*60*1000
}))

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

//funciones

iniciar=(req,res,datos)=>{
	if(req.session.user){
		datos = req.session.datos
	}
	query = login(datos)
	query.exec((err,user)=>{
		console.log(user)
		data = user[0]
		if(data){
			if(data.rol==0){
				query =productos()
				query.exec((err,produc)=>{
					if(err){
						console.log("erro query productos: ",err)
					}
					else{
						req.session.user = data._id
						req.session.datos = datos
						res.render('paneladm',{produc})				
					}
				})
			}else{
				res.redirect('/')
			}
		}else{
			res.redirect('/adm')
		}
	})	
}


















app.get("/",(req,res)=>{
	query = productos()
	query.exec((err,success)=>{
		if (err) {
			console.log(err)
		}else{
			res.render("index",{
				product: success
			})
		}
	})
})

app.get("/adm",urlencoder,(req,res)=>{
	if(req.session.user!=null){
		console.log('no null')
		iniciar(req,res)
	}else{
		res.render("loginadm")
	}
})

app.post("/paneladm",urlencoder,(req,res)=>{
	datos = req.body;
	iniciar(req,res,datos)
})


app.post("/add",urlencoder,(req,res)=>{
	data = req.body
	añadir_producto(data)
	res.redirect("adm")
})
app.post("/logout",urlencoder,(req,res)=>{
	req.session = null
	res.redirect("adm")
})
app.listen(3000)
console.log("localhost:3000")