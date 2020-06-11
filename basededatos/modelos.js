const mongoose = require('mongoose')
const schema = mongoose.Schema

const producto_schema = new schema({
	nombre:String,
	precio:Number,
	duracion:Number,
	descripcion:String,
	link:String,
	disponible:Boolean
})

const usuarios_schema = new schema({
	user:String,
	pass:String,
	rol:Number
})

const producto = mongoose.model('producto',producto_schema)
const usuario = mongoose.model('usuario', usuarios_schema)

module.exports={
	producto,
	usuario
}