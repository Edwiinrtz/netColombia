
registro=()=>{

	alert("redirigiendo a registro")
}
login=()=>{
	alert("redirigiendo a login")
}

carrito = []

anadir_carrito=(ident)=>{
	carrito.push(ident)
	localStorage.setItem("carrito", JSON.stringify(carrito));
	incrementar_carrito()
}


incrementar_carrito=()=>{
	elemnt = document.getElementById('cntd_elem')
	if(carrito.length>0){
		console.log(carrito.length)
		elemnt.innerHTML = carrito.length
		elemnt.style.display="inline-block"
	
	}
}