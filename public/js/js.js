var server = io()

carrito_ac = localStorage.getItem('carrito') 
if(carrito_ac){
	carrito = localStorage.getItem('carrito').split(",")
}else{
	carrito=[]
}

anadir_carrito=(ident)=>{
	carrito.push(ident)
	localStorage.setItem("carrito",carrito);
	incrementar_carrito()
}

total = 0
calcular_total=()=>{
	valor=document.getElementById('valores');
	valores = valor.value.split(',');
	valores.forEach(x=>{
		total+=parseInt(x)
	})
	localStorage.setItem("total",total)
	document.getElementById('total').value = total;
}

incrementar_carrito=()=>{
	elemnt = document.getElementById('cntd_elem')
	if(carrito.length>0){
		elemnt.innerHTML = carrito.length
		elemnt.style.display="inline-block"
	}
}

goto_carrito=()=>{
	//carro = localStorage.getItem('carrito')
	if(carrito[0]!=null){
		server.emit("carrito",(carrito))		
	}else{
		server.emit('carrito',null)
	}
}

quitar=(id)=>{
	carrito_actual =localStorage.getItem('carrito').split(",")
	if (Array.isArray(carrito_actual) && carrito_actual.length >=2) {
		carrito=[]
		carrito_actual.map(x=>{
			if (x!=id) {
				carrito.push(x)
				localStorage.setItem("carrito",carrito);
			}
		})
		goto_carrito()		
	}else{
		carrito[0]=null
		localStorage.removeItem('carrito')
		goto_carrito()
	}
}

realizar_compra=()=>{
	server.emit("realizar_compra",{
		productos:localStorage.getItem('carrito'),
		precio:localStorage.getItem('total'),
		correo:document.getElementById('correo_cliente').value,
		numeroCuenta:document.getElementById('numeroCuenta').value
	})
}
