modelos = require("./modelos.js")
user = modelos.usuario
producto = modelos.producto
login=(data)=>{
	return user.find({user:data.usuario, pass:data.contrasena})
}
añadir_producto=(informacion)=>{
	console.log(informacion)
	nuevo_producto = new producto({
		nombre:informacion.nombre,
		precio:informacion.precio,
		duracion:informacion.duracion,
		descripcion:informacion.descipcion,
		link:informacion.link
		
	})
	nuevo_producto.save((err,ok)=>{
		if(err){
			console.log(err)
		}else{
			console.log("registro exitoso")
		}
	})
}
productos=()=>{
	return producto.find()
}

productos_carrito=(lista)=>{
	productos_compra = []
	console.log(lista)
	lista.map(id =>{
		producto.findOne({_id:id},(err,info_prd)=>{
			console.log(info_prd)
			productos_compra.push(info_prd)
		})
	})
	return productos_compra
	
}

module.exports={
	login,
	añadir_producto,
	productos,
	productos_carrito
}