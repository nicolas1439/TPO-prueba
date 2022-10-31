// el codigo analiza los datos ingresados en los campos a traves de expresiones regulares dando resultados booleanos true o false
// dependiendo el resultado de la validacion ejecuta una funcion que aplica los estilos css a travez de reutilizacion de funciones

//  FUNCIONES, REUTILIZACION DE FUNCIONES, CONDICIONALES, EXPRESIONES REGULARE, MANIPULACION DOM.


const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	// comprueba los caracteres ingresados en el campo con expresiones regulares
	
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo y cantidad de caracteres
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos. y cantidad de caracteres
	password: /^.{4,12}$/, // 4 a 12 digitos. y cantidad de caracteres
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros. y cantidad de caracteres
}

// constante para darle valor predeterminado falso a todos los campo (para poder enviar el formulario todos los campos deben ser true)
const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

// funcion para validar el formulario
const validarFormulario = (e) => {

	// ejecuta el codigo dependiendo la comprobacion con expresiones en cada caso
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			// llamada a la funcion para verificar que ambas contraseñas sean iguales en ambos campos
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

// funcion para validar el campo y aplicar los estilos css correspondientes por clase (class)
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		// `${}` toma el valor de la variable que se indique, en este caso la variable campo
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

// constante para la validacion de segunda clave
const validarPassword2 = () => {
	// varaibles para tomar los valores de las dos claves
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	// funcion: en caso de que los valores de los campos no sean iguales, modifica la clase segun corresponda
	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}

// listener de los imputs para aplicar la funcion indicada
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

// funcion tipo flecha que se ejecuta al momento de enviar el formulario
formulario.addEventListener('submit', (e) => {
	// previene que se envien los datos antes de hacer la verificacion
	e.preventDefault();

	// constante para los terminos y condiciones
	const terminos = document.getElementById('terminos');

	// condicional que toma el valor de todos los campos indicados 
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		// funcion tipo flecha para eliminar el mensaje luego de 5 segundos
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		//funcion para eliminar los iconos 
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		// funcion para mostrar el mensaje de error
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});