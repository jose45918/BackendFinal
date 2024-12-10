const comprasBD = require("./conexion").compras;
const productosBD = require("./conexion").productos;
const buscarProductoPorId = require("../bd/productosBD").buscarPorId;
const buscarUsuarioPorId = require("../bd/usuariosBD").buscarPorId;
const Compra = require("../modelos/compraModelo");

function validarDatosCompra(compra) {
    var valido = false;
    if (compra.idCliente != undefined && compra.idProducto != undefined && compra.cantidad != undefined) {
        valido = true;
    }
    return valido;
}

async function mostrarCompras() {
    const comprasSn = await comprasBD.get();
    const comprasValidas = [];

    for (const doc of comprasSn.docs) {
        const compra = new Compra({ idVenta: doc.id, ...doc.data() });
        if (validarDatosCompra(compra.getCompra())) {
            const clienteId = compra.idCliente;
            const productoId = compra.idProducto;
            const cliente = await buscarUsuarioPorId(clienteId);
            let nombreCliente;
            if (cliente) {
                nombreCliente = cliente.nombre;
            } else {
                nombreCliente = "Cliente no encontrado";
            }
            const producto = await buscarProductoPorId(productoId);
            let nombreProducto;
            if (producto) {
                nombreProducto = producto.nombre;
            } else {
                nombreProducto = "Producto no encontrado";
            }
            comprasValidas.push({
                IdVenta: compra.idVenta, 
                Cliente: nombreCliente,
                Producto: nombreProducto,
                cantidad: compra.cantidad,
                fecha: compra.fecha,
                hora: compra.hora,
                estado: compra.estado
            });
        }
    }
    return comprasValidas;
}
async function buscarCompraPorId(idVenta) {
    
    const compraDoc = await comprasBD.doc(idVenta).get();
    if (!compraDoc.exists) {
        throw new Error("Compra no encontrada");
    }
    const compra1 = new Compra({ idVenta: compraDoc.id, ...compraDoc.data() });
    let compraValida = [];
    if (validarDatosCompra(compra1.getCompra())) {
        const clienteId = compra1.idCliente;
        const productoId = compra1.idProducto;
        const cliente = await buscarUsuarioPorId(clienteId);
        let nombreCliente;
        if (cliente) {
            nombreCliente = cliente.nombre;
        } else {
            nombreCliente = "Cliente no encontrado";
        }
        const producto = await buscarProductoPorId(productoId);
        let nombreProducto;
        if (producto) {
            nombreProducto = producto.nombre;
        } else {
            nombreProducto = "Producto no encontrado";
        }

        compraValida.push({
            IdVenta: compra1.idVenta,
            Cliente: nombreCliente,
            Producto: nombreProducto,
            cantidad: compra1.cantidad,
            fecha: compra1.fecha,
            hora: compra1.hora,
            estado: compra1.estado,
            idCliente: compra1.idCliente,
            idProducto: compra1.idProducto
        });
    }

    return compraValida;
}

async function nuevaCompra(data) {
    const fecha = new Date();
    console.log("Fecha generada:", fecha);
    
    const fechaActual = fecha.toISOString().split('T')[0]; 
    const horaActual = fecha.toTimeString().split(' ')[0]; 
    console.log("Hora generada:", horaActual);

    const estado = "activa";
    const compra1 = new Compra(data);
    console.log("Compra inicial:", compra1);
    
    compra1.fecha = fechaActual;
    compra1.estado = estado;
    compra1.hora = horaActual;

    if (validarDatosCompra(compra1.getCompra())) {
        const productoId = compra1.idProducto;
        const producto = await buscarProductoPorId(productoId); 
        if (producto && producto.cantidad >= compra1.cantidad) {
            const nuevaCantidad = producto.cantidad - compra1.cantidad;
            await productosBD.doc(productoId).update({ cantidad: nuevaCantidad });
            await comprasBD.doc().set(compra1.getCompra());
            return true; 
        } else {
            console.log("No hay suficiente cantidad del producto o el producto no existe");
            return false; 
        }
    } else {
        console.log("Datos de compra no válidos");
        return false; 
    }
}

async function actualizarEstadoCompra(idVenta, nuevoEstado) {
    const compra = await buscarCompraPorId(idVenta);

    if (!compra) {
        return null;
    }

    await comprasBD.doc(idVenta).update({ estado: nuevoEstado });
    return { idVenta, estado: nuevoEstado }; 
}
async function editarCompra(idVenta, datosActualizados) {
    const compraDoc = await comprasBD.doc(idVenta).get();

    if (!compraDoc.exists) {
        throw new Error("Compra no encontrada");
    }

    const compra = new Compra({ idVenta: compraDoc.id, ...compraDoc.data() });
    if (!validarDatosCompra(datosActualizados)) {
        throw new Error("Datos de compra no válidos");
    }
    const producto = await buscarProductoPorId(datosActualizados.idProducto);

    if (producto && producto.cantidad >= datosActualizados.cantidad) {
        const cantidadDiferencia = datosActualizados.cantidad - compra.cantidad;
        const nuevaCantidadProducto = producto.cantidad - cantidadDiferencia;
        
        if (nuevaCantidadProducto < 0) {
            throw new Error("No hay suficiente cantidad del producto");
        }

        await productosBD.doc(datosActualizados.idProducto).update({ cantidad: nuevaCantidadProducto });
        await comprasBD.doc(idVenta).update(datosActualizados);

        return { idVenta, ...datosActualizados };
    } else {
        throw new Error("Producto no encontrado o no hay suficiente cantidad");
    }
}

module.exports = {
    mostrarCompras,
    buscarCompraPorId,
    nuevaCompra,
    actualizarEstadoCompra,
    editarCompra
};

