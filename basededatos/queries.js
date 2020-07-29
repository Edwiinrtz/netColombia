const modelos = require("./modelos.js")
const mailer = require('./mailer.js')
user = modelos.usuario
producto = modelos.producto
factura = modelos.factura


//variables
total_cuenta = 0



login=(data)=>{
	return user.find({user:data.usuario, pass:data.contrasena})
}
añadir_producto=(informacion)=>{
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
productos_carrito=async (lista)=>{
	productos_compra = []
	total = []
	if(Array.isArray(lista)){
		await lista.map(id =>{
				producto.findOne({_id:id},(err,info_prd)=>{
					productos_compra.push(info_prd)
					total.push(info_prd.precio)
				})
			})
	
	}else{
		lista = [lista]
		productos_carrito(lista)
	}
	return {productos_compra,total}	
}


sacar_precio=async (precios)=>{
	console.log('sacar_precio', precios)
	precio_final = 0
	await precios.forEach(x =>{
			precio_final = precio_final + x
	})
	return precio_final
}


/*Al generar la factura, por ende el cobro, el usuario podría modificar el precio de compra directamente desde el front-end por lo que no es
seguro y se pueden ocasionar robos, SE NECESITA UN SOLUCIÓN */

generar_factura=async (informacion_compra)=>{
	productos_detalles = await productos_carrito(informacion_compra.productos.split(','))
	setTimeout(async function() {
		console.log(productos_detalles)
		productos_venta = productos_detalles.productos_compra
		precio_compra = await sacar_precio(productos_detalles.total) /*|| informacion_compra.precio*/
		console.log(precio_compra)

		nueva_factura = new factura({
			correo_cliente: informacion_compra.correo,
			fecha: new Date(),
			valor_total:precio_compra,
			productos:productos_venta
		})
		nueva_factura.save((err,ok)=>{
			if(err){
				console.log('hubo un error')
			}else{
				console.log('no hubo error')
				mailer.enviarFactura(ok)
			}
		})
	}, 1000);
	/*productos_detalles.total.forEach(x=>{
		total_cuenta=total_cuenta + x;
		console.log(total_cuenta)
	})
	console.log("total_cuenta: ",total_cuenta)*/

	//console.log('factura generada con exito')
}



module.exports={
	login,
	añadir_producto,
	productos,
	productos_carrito,
	generar_factura
}