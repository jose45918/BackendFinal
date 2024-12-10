const productosBD = require("./conexion").productos;
const Producto = require("../modelos/productoModelo");

async function buscarPorId(id) {
    const producto = await productosBD.doc(id).get();

    if (!producto.exists) {
        console.error(`Producto no encontrado con ID: ${id}`);
        return null; 
    }

    const producto1 = new Producto({ id: producto.id, ...producto.data() });

    if (validarDatos(producto1.getProducto())) {
        return producto1.getProducto(); 
    } else {
        console.error(`Producto no válido con ID: ${id}`);
        return null; 
    }
}

async function borrarProducto(id) {
    var productoValido = await buscarPorId(id);
    var productoBorrado = false;
    if (productoValido) {
        await productosBD.doc(id).delete();
        productoBorrado = true;
    }
    return productoBorrado;
}

async function nuevoProducto(data) {
    console.log(data);

    const producto1 = new Producto(data);
    console.log(producto1.getProducto());
    var productoValido = false;
    if (validarDatos(producto1.getProducto())) {
        await productosBD.doc().set(producto1.getProducto());
        productoValido = true;
    }
    return productoValido;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    const productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validarDatos(producto1.getProducto())) {
            productosValidos.push(producto1.getProducto());
        }
    });
    return productosValidos; 
}

async function editarProducto(idProducto, nuevosDatos) {
    try {
        const productoValido = await buscarPorId(idProducto);

        if (!productoValido) {
            return { success: false, message: "Producto no encontrado" };
        }

        const producto = new Producto(productoValido);

        producto.editarDatos(nuevosDatos);

        const datosFiltrados = Object.fromEntries(
            Object.entries(producto.getProducto()).filter(([key, v]) => v !== undefined && key !== 'id')
        );

        await productosBD.doc(idProducto).update(datosFiltrados);

        return { success: true, message: "Producto actualizado exitosamente" };
    } catch (error) {
        return { success: false, message: "Error al actualizar el producto" };
    }
}

function validarDatos(producto) {
    var valido = false;
    if (producto.nombre != undefined && producto.cantidad != undefined && producto.precio != undefined && producto.descripcion != undefined) {
        valido = true;
    }
    return valido;
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    buscarPorId,
    borrarProducto,
    editarProducto
};
