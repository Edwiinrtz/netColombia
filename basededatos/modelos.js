const mongoose = require('mongoose')
const schema = mongoose.Schema

const producto_schema = new schema({
	nombre:String,
	precio:Number,
	duracion:Number,
	descripcion:String,
	link:String,
	estado:Number
})

const usuarios_schema = new schema({
	user:String,
	pass:String,
	rol:Number
})

const factura_schema=new schema({
	correo_cliente: String,
	fecha:Date,
	valor_total:String,
	productos:[]
})

const producto = mongoose.model('producto',producto_schema)
const usuario = mongoose.model('usuario', usuarios_schema)
const factura = mongoose.model('factura', factura_schema)

module.exports={
	producto,
	usuario,
	factura
}