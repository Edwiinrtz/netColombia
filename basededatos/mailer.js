mailer = require('nodemailer')
credenciales = require('./credencialesAcceso')
transporter = mailer.createTransport({
	service:'gmail',
	auth:{
		user:credenciales.CORREO,
		pass:credenciales.PASS
	}
})

crearCorreo=async (productos)=>{
	mensaje= ''
	await productos.forEach(x=>{
		mensaje=mensaje +'<div style="padding: 2%;background-color: #E8E8D5;width: 20%;display: inline-block;margin:2%; "><img style="width: 100%;height: 50%;" src="https://res.cloudinary.com/dk2ghb1pg/image/upload/v1535301733/bxoyfrkj4zwtbsewcryf.png"><section id="info"><p>'+x.nombre+'</p><p></p><p>Duracion: '+x.duracion+' días</p><p>Precio: '+x.precio+' mil pesos</p></section><a href="'+x.link+'" style="text-decoration: none; background-color: #19F5D5; color:black; padding: 2%;width: 100%;margin:0 auto;">Download</a></div>'
		console.log('esta creando el html')
	})
	return mensaje

}

enviarFactura= async (req)=>{
	mail = {
		from:'marketing@internetColombia.com',
		to:req.correo_cliente,
		subject:'Recepción de archivos compra',
		text:"Para poder descargar tus archivos, por favor activa el html",
		html: await crearCorreo(req.productos)
	}

	transporter.sendMail(mail,(error,info)=>{
		if(error){
			console.log(error)
		}else{
			//console.log(info)
		}
	})

}

module.exports={enviarFactura};
