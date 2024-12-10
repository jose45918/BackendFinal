class Producto {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.cantidad = data.cantidad;
        this.precio = data.precio;
        this.descripcion = data.descripcion;
    }
    set id(id) {
        this._id = id;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }

    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }

    set precio(precio) {
        this._precio = precio;
    }

    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }

    get nombre() {
        return this._nombre;
    }

    get cantidad() {
        return this._cantidad;
    }

    get precio() {
        return this._precio;
    }

    get id() {
        return this._id;
    }

    get descripcion() {
        return this._descripcion;
    }

    editarDatos(nuevosDatos) {
        if (nuevosDatos.nombre !== undefined) this.nombre = nuevosDatos.nombre;
        if (nuevosDatos.cantidad !== undefined) this.cantidad = nuevosDatos.cantidad;
        if (nuevosDatos.precio !== undefined) this.precio = nuevosDatos.precio;
        if (nuevosDatos.descripcion !== undefined) this.descripcion = nuevosDatos.descripcion;
    }

    getProducto() {
        const conId = {
            id: this.id,
            nombre: this.nombre,
            cantidad: this.cantidad,
            precio: this.precio,
            descripcion: this.descripcion
        };

        const sinId = {
            nombre: this.nombre,
            cantidad: this.cantidad,
            precio: this.precio,
            descripcion: this.descripcion
        };

        if (this.id === undefined) {
            return sinId;
        } else {
            return conId;
        }
    }
}

module.exports = Producto;
