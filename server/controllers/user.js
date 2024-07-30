
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");
//const mongoosePagination = require("mongoose-pagination");

const pruebaUser = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/user.js",
        usuario: req.user
    });
}

const register = async (req, res) => {
    // Registro de usuario
    let params = req.body;

    // Comprobacion de que llegan los parametros
    if (!params.name || !params.email || !params.password || !params.surname || !params.nick) {
        return res.status(400).json({
            status: "error",
            message: "Faltan Datos"
        });
    }

    try {
        const users = await User.find({
            $or: [
                { email: params.email.toLowerCase() },
                { nick: params.nick.toLowerCase() }
            ]
        }).exec();

        if (users && users.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        }

        // Cifrar contraseña
        let pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd;

        // Crear el objeto de usuario
        let userSave = new User(params);

        // Guardar usuario en DB
        const userStored = await userSave.save();

        // Devolver el resultado
        return res.status(200).json({
            status: "success",
            message: "Usuario registrado correctamente",
            user: userStored
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}


const login = async (req, res) => {
    try {
      // Registrar parámetros
      let params = req.body;
  
      if (!params.email || !params.password) {
        return res.status(400).send({
          status: "error",
          message: "Faltan datos por enviar"
        });
      }
  
      // Buscar en la BD si existe usuario
      let user = await User.findOne({ email: params.email });
  
      if (!user) {
        return res.status(404).send({
          status: "error",
          message: "No existe el usuario"
        });
      }
  
      // Comprobar contraseña
      const pwd = bcrypt.compareSync(params.password, user.password);
  
      if (!pwd) {
        return res.status(400).send({
          status: "error",
          mensaje: "Error en datos de ingreso"
        });
      }

      // Conseguir Token
      const token = jwt.createToken(user);
  
      // Devolver datos de usuario
      return res.status(200).send({
        status: "Success",
        message: "Ingreso correctamente",
        usuario: {
          id: user._id,
          nombre: user.name,
          surname: user.surname,
          nick: user.nick
        },

        token
      });

    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Error del servidor"
      });
    }
};

const profile = async (req, res) => {
  const id = req.params.id;

  try {
    const userProfile = await User.findById(id).select({ password: 0, role: 0 }).exec();

    if (!userProfile) {
      return res.status(404).send({
        status: "Error",
        message: "El usuario no existe o hay un error"
      });
    }

    return res.status(200).send({
      status: "Success",
      user: userProfile
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: "Hay un error en la solicitud"
    });
  }
};

const list = async (req, res) => {
  let page = 1;
  if (req.params.page) {
    page = parseInt(req.params.page, 10);
  }

  let itemPerPage = 5;

  try {
    const totalUsers = await User.countDocuments();
    const users = await User.find()
                            .sort('_id')
                            .skip((page - 1) * itemPerPage)
                            .limit(itemPerPage);

    if (!users || users.length === 0) {
      return res.status(404).send({
        status: "Error",
        message: "No hay usuarios disponibles"
      });
    }

    return res.status(200).send({
      status: "Success",
      users: users,
      total: totalUsers,
      page: page,
      pages: Math.ceil(totalUsers / itemPerPage)
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: "Error al listar usuarios"
    });
  }
};

const update = async (req, res) => {  
  // Recoger info del usuario a actualizar
  let userIdentity = req.user;
  let userToUpdate = req.body;

  // ELiminar campos sobrantes
  delete userToUpdate.iat;
  delete userToUpdate.exp;
  delete userToUpdate.role;
  delete userToUpdate.image;
  
  // Comprobar si el usuario ya existe
  try {
    const users = await User.find({
      $or: [
        { email:  userToUpdate.email.toLowerCase() },
        { nick: userToUpdate.nick.toLowerCase() }
      ]
    }).exec();

    if (users && users.length >= 1) {
      return res.status(200).send({
        status: "success",
        message: "El usuario ya existe"
      });
    }

    // Cifrar contraseña
    if(userToUpdate.password){
      let pwd = await bcrypt.hash(userToUpdate.password, 10);
      userToUpdate.password = pwd;
    } else {
      delete userToUpdate.password;
    }

    try {
      let userUpdate = await User.findByIdAndUpdate({_id: userIdentity.id}, userToUpdate, {new: true});

      if(!userUpdate){
        return res.status(400).json({
          status: "error lala",
          message: "Error al actualizar"
        })
      }

      // Devolver el resultado
      return res.status(200).send({
        status: "succes",
        message: "Usuario Actualizado",
        user: userUpdate
      })

    } catch (error) {
        return res.status(500).send({
          status: "error",
          message: "Error al actualizar",
        });
    }

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }


}

const upload = (req, res) => {

  // Comprobar si existe la imagen
  if(!req.file){
    return res.status(404).send({
      status: "Error",
      message: "No se ha recibido la imagen"
    })
  }

  let image = req.file.originalname;

  // extension del archivo
  const imageSplit = image.split("\.");
  const extension = imageSplit[1];

  return res.status(200).send({
    status: "success",
    message: "Archivo subido correctamente",
    user: req.user,
    file: req.file,
    files: req.files
  })
}


  
module.exports = { 
    pruebaUser,
    register, 
    login,
    profile,
    list,
    update,
    upload,
};
  
