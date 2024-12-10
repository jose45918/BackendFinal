const usuariosBD = require("./conexion").usuarios;
const { encriptarPass, validarPass } = require("../midleware/funcPass");
const Usuario = require("../modelos/usuarioModelo")
function validarDatos(usuario) {
    var valido = false
    if (usuario.nombre != undefined && usuario.usuario != undefined && usuario.password != undefined) {
        valido = true;
    }
    return valido;
}
async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();
    console.log(usuarios);
    usuariosValidos = [];
    usuarios.forEach(usuario => {
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        if (validarDatos(usuario1.getUsuario())) {
            usuariosValidos.push({id: usuario.id, ...usuario.data()});
        }
    });
    return usuariosValidos;
}
async function buscarPorId(id) {
    const usuarioDoc = await usuariosBD.doc(id).get();
    if (!usuarioDoc.exists) {
        console.error(`Usuario no encontrado con ID: ${id}`);
        return null; 
    }

    const usuario1 = new Usuario({ id: usuarioDoc.id, ...usuarioDoc.data() });

    if (validarDatos(usuario1.getUsuario())) {
        return usuario1.getUsuario(); 
    } else {
        console.error(`Datos de usuario no válidos para ID: ${id}`);
        return null; 
    }
}


async function nuevoUsuario(data) {
    const {salt,hash} = encriptarPass(data.password);
    data.password = hash;
    data.salt = salt;
    data.tipoUsuario = "usuario"; 
    const usuario1 = new Usuario(data);
    console.log(usuario1.getUsuario())
    var usuarioValido = false;
    if (validarDatos (usuario1.getUsuario())){
        await usuariosBD.doc().set(usuario1.getUsuario());
         usuarioValido = true;
    }
    return usuarioValido;
}

async function editarUsuario(idUsuario, nuevosDatos) {
    try {
        const usuarioRef = await usuariosBD.doc(idUsuario).get();

        if (!usuarioRef.exists) {
            return { success: false, message: "Usuario no encontrado" };
        }

        const usuarioData = usuarioRef.data();
        const usuario = new Usuario(usuarioData);
        if (nuevosDatos.password) {
            const { salt, hash } = encriptarPass(nuevosDatos.password);
            nuevosDatos.password = hash; 
            nuevosDatos.salt = salt;     
        }
       usuario.editarDatos(nuevosDatos);
        await usuariosBD.doc(idUsuario).update(usuario.getUsuario());

        return { success: true, message: "Usuario actualizado exitosamente" };
    } catch (error) {
        console.error("Error al editar el usuario:", error);
        return { success: false, message: "Error al actualizar el usuario" };
    }
}

async function borrarUsuario(id) {
    var usuarioValido = await buscarPorId(id);
    var usuarioBorrado = false;
    if(usuarioValido) {
        await usuariosBD.doc(id).delete();
        usuarioBorrado = true
    }
    return usuarioBorrado;

}


async function login(usuario, password) {
    let user = "anonimo";
    let role = "guest"; 

    try {
        const usuariosCorrectos = await usuariosBD.where("usuario", "==", usuario).get();
        usuariosCorrectos.forEach((usu) => {
            const usuarioData = usu.data();
            const usuarioCorrecto = validarPass(password, usuarioData.password, usuarioData.salt);
            
            if (usuarioCorrecto) {
                user = usuarioData.usuario;
                if (usuarioData.role === "admin") {
                    role = "admin";
                } else if (usuarioData.role === "user") {
                    role = "user";
                }
            }
        });
    } catch (error) {
        console.error("Error en la consulta de usuarios:", error);
    }

    return { user, role };
}


module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    validarDatos,
    buscarPorId,
    borrarUsuario,
    editarUsuario,
    login
}
