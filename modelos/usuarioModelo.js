
class Usuario {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.usuario = data.usuario;
        this.password = data.password;
        this.salt = data.salt;
        this.tipoUsuario = data.tipoUsuario;
    }

    set id(id) {
        this._id = id;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }
    set usuario(usuario) {
        this._usuario = usuario;
    }
    set password(password) {
        this._password = password;
    }
    
    set salt(salt) {
       this._salt = salt;
    }

    set tipoUsuario(tipoUsuario) {
        this._tipoUsuario = tipoUsuario;
    }
 
    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get usuario() {
        return this._usuario;
    }

    get password() {
        return this._password;
    }

    get salt() {
        return this._salt;
     }
 
     get tipoUsuario() {
        return this._tipoUsuario;
     }

     editarDatos(nuevosDatos) {
        if (nuevosDatos.nombre) this.nombre = nuevosDatos.nombre;
        if (nuevosDatos.usuario) this.usuario = nuevosDatos.usuario;
        if (nuevosDatos.password) this.password = nuevosDatos.password;
        if (nuevosDatos.salt) this.salt = nuevosDatos.salt;
        if (nuevosDatos.tipoUsuario) this.tipoUsuario = nuevosDatos.tipoUsuario;
    }

    getUsuario() {
        const conId = {
            id: this.id,
            nombre: this.nombre,
            usuario: this.usuario,
            password: this.password,
            salt: this.salt,
            tipoUsuario: this.tipoUsuario
        };
    
        const sinId = {
            nombre: this.nombre,
            usuario: this.usuario,
            password: this.password,
            salt: this.salt,
            tipoUsuario: this.tipoUsuario
        };

        if (this.id == undefined) {
            return sinId;
        } else {
            return conId;
        }
    }
    
}

module.exports = Usuario;
