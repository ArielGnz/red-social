
const User = require("../models/user");
const Follow = require("../models/follow");
const Publication = require("../models/publication");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");
const fs = require("fs");
const path = require("path");
const followService = require("../services/followService");
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
  if (!params.name || !params.surname || !params.nick || !params.email || !params.password) {
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
      user: {
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

    const followInfo = await followService.followThisUser(req.user.id, id);

    return res.status(200).send({
      status: "success",
      user: userProfile,
      following: followInfo.following,
      follower: followInfo.follower
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Hay un error en solicitud",

    });
  }
};




const list = async (req, res) => {
  
  let page = 1;
  if (req.params.page) {
    page = req.params.page;
  }
  page = parseInt(page);

  let itemPerPage = 5;

  try {

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .select("-password -email -role -__V")
      .sort('_id')
      .skip((page - 1) * itemPerPage)
      .limit(itemPerPage);

    if (!users || users.length === 0) {
      return res.status(404).send({
        status: "Error",
        message: "No hay usuarios disponibles"
      });
    }
    
    let followUserIds = await followService.followUserIds(req.user.id);

    return res.status(200).send({
      status: "success",
      users: users,
      total: totalUsers,
      page: page,
      pages: Math.ceil(totalUsers / itemPerPage),
      user_following: followUserIds.following,
      user_follow_me: followUserIds.followers

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
        { email: userToUpdate.email.toLowerCase() },
        { nick: userToUpdate.nick.toLowerCase() }
      ]
    }).exec();

    let userIsset = false;
    users.forEach(user => {
      if (user && user._id != userIdentity.id) userIsset = true;
    });

    if (userIsset) {
      return res.status(200).send({
        status: "success",
        message: "El usuario ya existe"
      });
    }

    // if (users && users.length >= 1) {
    //   return res.status(200).send({
    //     status: "success",
    //     message: "El usuario ya existe"
    //   });
    // }

    // Cifrar contraseña
    if (userToUpdate.password) {
      let pwd = await bcrypt.hash(userToUpdate.password, 10);
      userToUpdate.password = pwd;
    } else {
      delete userToUpdate.password;
    }

    try {
      let userUpdate = await User.findByIdAndUpdate({ _id: userIdentity.id }, userToUpdate, { new: true });

      if (!userUpdate) {
        return res.status(400).json({
          status: "error lala",
          message: "Error al actualizar"
        })
      }

      // Devolver el resultado
      return res.status(200).send({
        status: "success",
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


const upload = async (req, res) => {
  // Check if the image exists
  if (!req.file) {
    return res.status(404).send({
      status: "Error",
      message: "No se ha recibido la imagen"
    });
  }

  let image = req.file.originalname;

  // File extension
  const imageSplit = image.split(".");
  const extension = imageSplit[1];

  // Check extension 
  if (extension !== "png" && extension !== "jpg" && extension !== "jpeg" && extension !== "gif" && extension !== "JPG") {
    // Delete uploaded file
    const filePath = req.file.path;
    fs.unlinkSync(filePath);

    return res.status(400).send({
      status: "Error",
      message: "Extensión del archivo inválida"
    });
  }

  try {
    // Save image in the database
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.user.id },
      { image: req.file.filename },
      { new: true }
    ).exec();

    if (!userUpdate) {
      return res.status(500).send({
        status: "Error",
        message: "Error en la subida de archivo"
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Archivo subido correctamente",
      user: req.userUpdate,
      file: req.file,

    });

  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: "Error en la subida de archivo"
    });
  }
};

const avatar = (req, res) => {
  // Obtener parametros
  const file = req.params.file;

  // Obtener el path real de la imagen
  const filePath = "./uploads/avatars/" + file;

  // Comprobar que existe la imagen
  fs.stat(filePath, (error, exists) => {
    if (!exists) {
      return res.status(404).send({
        status: "error",
        message: "No existe la imagen"
      });
    }

    return res.sendFile(path.resolve(filePath));
  })

}

const counters = async (req, res) => {

  let userId = req.user.id;

  if (req.params.id) {
    userId = req.params.id;
  }

  try {
    const followingCount = await Follow.countDocuments({ user: userId });
    const followedCount = await Follow.countDocuments({ followed: userId });
    const publicationsCount = await Publication.countDocuments({ user: userId });

    return res.status(200).send({
      userId,
      following: followingCount,
      followed: followedCount,
      publications: publicationsCount
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en los contadores",
      error: error.message,
      userId,
    });
  }
}


module.exports = {
  pruebaUser,
  register,
  login,
  profile,
  list,
  update,
  upload,
  avatar,
  counters
};

