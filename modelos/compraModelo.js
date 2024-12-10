class Compra {
    constructor(data) {
        this.idVenta = data.idVenta;
        this.idCliente = data.idCliente;
        this.idProducto = data.idProducto;
        this._fecha = data.fecha;
        this._hora = data.hora;
        this.cantidad = data.cantidad;
        this._estado = data.estado;
    }
    set idVenta(idVenta) {
        this._idVenta = idVenta;
    }

    set idCliente(idCliente) {
        this._idCliente = idCliente;
    }

    set idProducto(idProducto) {
        this._idProducto = idProducto;
    }

    set fecha(fecha) {
        this._fecha = fecha;
    }
    
    set hora(hora) {
        this._hora = hora;
    }

    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }

    set estado(estado) {
        this._estado = estado;
    }
    get idVenta() {
        return this._idVenta;
    }      
    get idCliente() {
        return this._idCliente;
    }

    get idProducto() {
        return this._idProducto;
    }

    get fecha() {
        return this._fecha;
    }

    get hora() {
        return this._hora;
    }

    get cantidad() {
        return this._cantidad;
    }

    get estado() {
        return this._estado;
    }
    getCompra() {
        const compraConId = {
            idVenta: this.idVenta,
            idCliente: this.idCliente,
            idProducto: this.idProducto,
            fecha: this.fecha,
            hora: this.hora,
            cantidad: this.cantidad,
            estado: this.estado
        };

        const compraSinId = {
            idCliente: this.idCliente,
            idProducto: this.idProducto,
            fecha: this.fecha,
            hora: this.hora,
            cantidad: this.cantidad,
            estado: this.estado
        };
        if (this.idVenta == undefined){
            return compraSinId;
        }  else  {
            return compraConId;
        }
    }
}

module.exports = Compra;
