
require("./queries.js")

iniciar=(datos)=>{
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
						res.render('paneladm',{produc})	
						console.log(req.session.user)					
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




module.exports={
	iniciar
}