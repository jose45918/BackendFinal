var rutas = require("express").Router();
var {mostrarProductos,nuevoProducto,borrarProducto,buscarPorId,editarProducto} = require("../bd/productosBD");

rutas.get("/borrarProducto/:id", async(req,res) => {
    var ProductoBorrado = await borrarProducto(req.params.id);
    res.json(ProductoBorrado);
});

rutas.get("/mostrarProductos",async (req,res) =>{
    var producosValidos = await mostrarProductos();
    res.json(producosValidos);
});

rutas.get("/buscarProducto/:query", async (req, res) => {
    const query = req.params.query.toLowerCase();
    const productos = await mostrarProductos();
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(query)
    );
    res.json(productosFiltrados);
});


rutas.post("/nuevoProducto", async (req,res) => {
    if (req.body.cantidad) {
        req.body.cantidad = parseInt(req.body.cantidad, 10);
    }
    if (req.body.precio) {
        req.body.precio = parseFloat(req.body.precio);
    }
    var productoValido = await nuevoProducto(req.body);
    console.log(productoValido);
    res.json(productoValido);
});

rutas.get("/buscarProductoPorId/:id", async(req,res) => {
    var producosValidos = await buscarPorId(req.params.id)
    res.json(producosValidos);
});

rutas.post("/editarProducto/:id", async (req, res) => {
    const idProducto = req.params.id;
    if (req.body.cantidad) {
        req.body.cantidad = parseInt(req.body.cantidad, 10);
    }
    if (req.body.precio) {
        req.body.precio = parseFloat(req.body.precio);
    }

    console.log("Antes de llamar a editarProducto:", req.body);
    const resultado = await editarProducto(idProducto, req.body);
    console.log(resultado);
    res.json(resultado);
});

module.exports = rutas;
