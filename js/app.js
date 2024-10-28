/*
const nombre = prompt("Ingrese su nombre:");


function saludar(x){
    alert("Bienvenido "+ x);
}

saludar(nombre);

alert("A continuacion ingrese dos numeros para realizar distintas operaciones");
let num1 = parseInt(prompt("Ingrese el primer numero:"));
let num2 = parseInt(prompt("Ingrese el segundo numero:"));

function suma(x,y){
    let resultado = x + y;
    alert("el resultado de la operacion es: "+ resultado);
}
function resta(x,y){
    let resultado = x - y;
    alert("el resultado de la operacion es: "+ resultado);
}
function multiplicacion(x,y){
    let resultado = x * y;
    alert("el resultado de la operacion es: "+ resultado);
}

let op = parseInt(prompt("Ingrese operacion a realizar (1.suma 2.resta 3.multiplicacion):" ));

if (op===1){
    suma(num1,num2);
}
if (op===2){
    resta(num1,num2);
}
if (op===3){
    multiplicacion(num1,num2);
}

while (op > 3){
    alert("no ingreso ninguna operacion a realizar")
}

let total = 0;
for (let i =1;i<=10;i++){
    total+= i;
};
console.log(total);


const producto = {
    nombre:"cactus",
    categoria:"plantas",
    precio:10000
}
class Producto2{
    constructor(nombre, categoria, precio) {
        this.nombre = nombre;
        this.categoria   = categoria;
        this.precio  = precio;
    }
        mostrarprecio(){ console.log("el precio del producto "+ this.nombre+ "es "+ this.precio);}
}
const producto1 = new Producto2("lapacho", "planta", 5000);
const producto2 = new Producto2("pala", "herramienta", 8000);
producto1.mostrarprecio();
producto2.mostrarprecio();

const arrayproductos=[]
let   cantidad     = 5;
do{
   let entrada = prompt("Ingresar nombre");
   arrayproductos.push(entrada.toUpperCase());
   console.log(arrayproductos.length);
}while(arrayproductos.length != cantidad);
alert("Lista de productos: \n" + arrayproductos.join("\n"));
arrayproductos.push(producto);
console.log(arrayproductos);

let busnom = prompt("ingrese nombre del producto a buscar");
const buscado = arrayproductos.find(producto => producto.nombre === busnom);
console.log(buscado);
console.log(Math.min(arrayproductos));*/




class Producto2{
    constructor(nombre, descripcion, precio,) {
        this.nombre = nombre;
        this.categoria   = descripcion;
        this.precio  = precio;
        
    }
}

const botones = document.querySelectorAll('.btn-com');

let carrito = [];
let carritoEnLS = JSON.parse(localStorage.getItem('carrito-com'))

if (carritoEnLS) {
    carrito=carritoEnLS
    alert('tenes articulos en el carrito para comprar')
}

function manejarClick(event) {

  const boton = event.target;

  const card = boton.closest('.card-body');

  const nombre = card.querySelector('.card-title').textContent;
  const descripcion = card.querySelector('.card-text').textContent;
  const precio = parseFloat(card.querySelector('.precio-text').textContent);

  const producto = new Producto2(nombre, descripcion, precio);

  carrito.push(producto);

  
  console.log('Producto añadido:', producto);
  console.log('Carrito actual:', carrito);
  localStorage.setItem('carrito-com', JSON.stringify(carrito));
}

botones.forEach(boton => {
  boton.addEventListener('click', manejarClick);
});
 

//carrito

var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

document.addEventListener('DOMContentLoaded', (event) => {
    var div = document.getElementById('cart');
    div.style.display = 'none'; // Ocultar el div inicialmente
});

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('btn');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}


//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito

    
    ocultarCarrito();
}


//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}


const cart = document.getElementById('cart');
const cardsContainer = document.getElementById('cards-container');

function hacerVisibleCarrito(){
    
    cardsContainer.classList.remove('col-lg-12');
    cardsContainer.classList.add('col-lg-8');

    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

}

// Función para ocultar el carrito y expandir el contenedor de las cards
function ocultarCarrito() {
    // Ocultar carrito
    
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.getElementsByClassName('carrito-item').length === 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
        ocultarCarritoDiv();
        // Expandir el contenedor de las cards
        cardsContainer.classList.remove('col-lg-8');
        cardsContainer.classList.add('col-lg-12');
    }
    
    
}

function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}


function agregarAlCarritoClicked(event){
    var button = event.target;
    var card = button.closest('.card');
    var titulo = card.getElementsByClassName('card-title')[0].innerText;
    var precio = card.getElementsByClassName('precio-text')[0].innerText;
    var imagenSrc = card.getElementsByClassName('card-img-top')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    mostrarCarritoDiv();
    hacerVisibleCarrito();

}


function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var card = document.createElement('div');
    card.classList.add = ('card');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');

    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        // Convertimos ambos textos a minúsculas y eliminamos los espacios antes de comparar
        var tituloEnCarrito = nombresItemsCarrito[i].innerText.trim().toLowerCase();
        var nuevoTitulo = titulo.trim().toLowerCase();
        
        if (tituloEnCarrito === nuevoTitulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    card.innerHTML = itemCarritoContenido;
    itemsCarrito.append(card);

    //Agregamos la funcionalidad eliminar al nuevo item
     card.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = card.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = card.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}

function ocultarCarritoDiv() {
    var div = document.getElementById('cart');
    div.style.display = 'none'; // Cambia el estilo para ocultar el div
}

function mostrarCarritoDiv() {
    var div = document.getElementById('cart');
    div.style.display = 'block'; // Mostrar el div
}

function pagarClicked(){
    alert("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
