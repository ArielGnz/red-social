//const publication = require("../models/publication");
const fs = require("fs");
const path = require("path");
const Publication = require("../models/publication");
const followService = require("../services/followService");
const mongoosePagination = require("mongoose-pagination");
//const { error } = require("console");

const pruebaPublication = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/publication.js"
    });
}


const save = async (req, res) => {
    const params = req.body;

    if (!params.text) {
        return res.status(400).send({
            status: "Error",
            message: "No hay texto en la publicacion"
        });
    }

    let newPublication = new Publication(params);
    newPublication.user = req.user.id;

    try {
        const publicationStored = await newPublication.save();
        return res.status(200).send({
            status: "success",
            message: "Publicación guardada",
            publicationStored
        });
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "No se ha guardado la publicación."
        });
    }
};

const detail = async (req, res) => {

    try {
        // Sacar id de publicacion de la url
        const publicationId = req.params.id;

        // Find con la condicion del id
        const publicationStored = await Publication.findById(publicationId);

        if (!publicationStored) {
            return res.status(404).send({
                status: "error",
                message: "No existe la publicacion"
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Mostrar publicacion",
            publication: publicationStored
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en la petición"
        });
    }
};

const remove = async (req, res) => {

    try {

        const publicationId = req.params.id;

        const deletePublication = await Publication.deleteOne({ "user": req.user.id, "_id": publicationId });

        if (!deletePublication) {
            return res.status(500).send({
                status: "Error",
                message: "No se ha podido borrar la publicacion"
            })
        };

        return res.status(200).send({
            status: "succes",
            message: "Publicaion eliminada",
            publication: publicationId
        });

    } catch (error) {

        return res.status(500).send({
            status: "Error",
            message: "Error en la peticion de borrado"
        })

    }

}

const user = async (req, res) => {

    try {
        const userId = req.params.id;
        let page = 1;

        if (req.params.page) page = req.params.page;

        const itemsPerPage = 5;

        const query = Publication.find({ "user": userId })
            .sort("-created_at")
            .populate('user', '-password -__v -role -email');
  

        const publications = await query.skip((page - 1) * itemsPerPage).limit(itemsPerPage).exec();
        const total = await Publication.countDocuments({ "user": userId });
       

        if (!publications || publications.length <= 0) {
            return res.status(404).send({
                status: "error",
                message: "No hay publicaciones para mostrar"
            });
        }

        return res.status(200).send({
            status: "success",
            message: "Publicaciones del perfil del usuario",
            page,
            total,
            pages: Math.ceil(total / itemsPerPage),
            publications
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en la petición"
        });
    }
}

const upload = async (req, res) => {

    const publicationId = req.params.id;
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
    if (extension !== "png" && extension !== "jpg" && extension !== "jpeg" && extension !== "gif" && extension !== "JPG" && extension !== "JPEG") {
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
      const publicationUpdate = await Publication.findOneAndUpdate(
        { "user": req.user.id, "_id": publicationId},
        { file: req.file.filename },
        { new: true }
      ).exec();
  
      if (!publicationUpdate) {
        return res.status(500).send({
          status: "Error",
          message: "Error en la subida de archivo"
        });
      }
  
      return res.status(200).send({
        status: "success",
        message: "Archivo subido correctamente",
        publication: publicationUpdate,
        file: req.file,
        
      });
  
    } catch (error) {
      return res.status(500).send({
        status: "Error",
        message: "Error en la subida de archivo"
      });
    }
};

const media = (req, res) => {
    // Obtener parametros
    const file = req.params.file;
  
    // Obtener el path real de la imagen
    const filePath = "./uploads/publications/" + file;
    
    // Comprobar que existe la imagen
    fs.stat(filePath, (error, exists) =>{
      if (!exists) {
        return res.status(404).send({
            status: "error",
            message: "No existe la imagen"
        });
      }
  
      return res.sendFile(path.resolve(filePath));
    })
  
}

const feed = async (req, res) => {
   
    let page = 1;
    if (req.params.page) {
        page = parseInt(req.params.page, 10);
    }

    let itemsPerPage = 5;

    try {

        const myFollows = await followService.followUserIds(req.user.id);

        const publications =  await Publication.find({ user: myFollows.following })
            .populate("user", "-password -role -__v -email")
            .sort("-created_at")
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage)
                   
        const total = await Publication.countDocuments({ user: myFollows.following });

        if (!publications || publications.length === 0) {
            return res.status(500).send({
                status: "error",
                message: "No hay publicaciones para mostrar",
            });
        }

        return res.status(200).send({
            status: "success",
            message: "Feed de publicaciones",
            following: myFollows.following,
            total,
            page,
            pages: Math.ceil(total / itemsPerPage),
            publications
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al obtener usuarios que sigues",
        });
    }
};

module.exports = {
    pruebaPublication,
    save,
    detail,
    remove,
    user,
    upload,
    media,
    feed,
}