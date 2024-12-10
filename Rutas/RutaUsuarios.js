var rutas = require("express").Router();
const { usuarios } = require("../bd/conexion");
var {mostrarUsuarios,nuevoUsuario,validarDatos,borrarUsuario,mostrarUsuarios,buscarPorId,editarUsuario,login} = require("../bd/usuariosBD");
const {encriptarPass,validarPass,usuarioAutorizado,adminAutorizado} = require("../midleware/funcPass")


rutas.get("/", async (req, res) => {
    const searchQuery = req.query.search || "";
    try {
        let usuariosValidos = await mostrarUsuarios();
        if (searchQuery) {
            usuariosValidos = usuariosValidos.filter(usuario =>
                usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        res.json(usuariosValidos);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
});

rutas.get("/buscarUsuarioPorId/:id", async(req,res) => {
    var usuarioValido = await buscarPorId(req.params.id)
    res.json(usuarioValido);
    
});
rutas.get("/borrarUsuario/:id", async(req,res) => {
    var usuarioBBorrado = await borrarUsuario(req.params.id);
    res.json(usuarioBBorrado);
});
rutas.post("/nuevoUsuario", async (req,res) => {
    var usuarioValido = await nuevoUsuario(req.body);
    console.log(usuarioValido);
    res.json(usuarioValido);
})
rutas.put("/editarUsuario/:id", async (req, res) => {
    const idUsuario = req.params.id;
    const nuevosDatos = req.body;
    const resultado = await editarUsuario(idUsuario, nuevosDatos);

    if (resultado.success) {
        res.status(200).json(resultado);
    } else {
        res.status(400).json(resultado);
    }
});
rutas.post('/login', async (req, res) => {
    const { usuario, password } = req.body; 

    try {
        const usuarioValido = await login(usuario, password);
        
        if (usuarioValido) {
            res.status(200).json({ message: "Inicio de sesión exitoso", usuario: usuarioValido });
        } else {
            res.status(401).json({ message: "Credenciales incorrectas" });
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

module.exports = rutas;