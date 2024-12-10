
function saludar(){

    console.log("Hola XD");
}

saludar();

function saludar2(nombre = "anonimo"){
    console.log("Hola " + nombre + " XD");
}

saludar2("Juan Prérez Cruz");
function saludar3(nombre = "anonimo"){
    
    var s = ("Hola " + nombre + " XD");

    return s;
}

console.log(saludar3("Pancho"));

var saludo = (nombre)=>{
    console.log("Hola " + nombre + " xd")
}
saludo("Megamailito");


var saludo2 = nombre=>{
    console.log("Hola " + nombre + " xd")
}
saludo2("Megsuk");

var saludo3 = nombre=>{
    var s=("Hola " + nombre + " xd")
    return s;
}
console.log(saludo3("Tenganito"));

var saludo4 = nombre=>{
    return "Hola "+ nombre +" xd";
}
console.log(saludo4("Tenganito"));

var saludo4 = nombre=> "Hola "+ nombre +" xd";
console.log(saludo4("Tenganito"));

var saludo5 = function(){
    console.log ("hola");
}

saludo5();


var saludo6 = () => {
    console.log ("saludo 6");
} 

var saludo7 = (nombre, s) => {
    console.log ("Hola " + nombre);
    s();
} 
saludo7("Betoven",saludo6);