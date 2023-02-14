const clientService = require("../models/clients.model");

const getAllClients = (req, res) => {
  let { query } = req;
  clientService
    .find()
    .then((clients) => {
      res.status(200).json({
        mensaje: "Listado de clientes",
        cantidad: clients.length,
        clientes: clients.map((client) => {
          return {
            id: client._id,
            rif: client.rif,
            cliente: client.name,
            dirección: client.address,
            teléfono: client.phone,
            correo: client.email,
            registro: client.create,
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const getOneClient = (req, res) => {
  let { id } = req.params;
  clientService
    .findById(id)
    .then((client) => {
      if (!client) {
        res.status(404).json({
          mensaje: "cliente no encontrado",
        });
      } else {
        res.status(200).json({
          mensaje: `cliente ${client.name} encontrado`,
          datos: {
            id: client._id,
            rif: client.rif,
            cliente: client.name,
            dirección: client.address,
            teléfono: client.phone,
            correo: client.email,
            registro: client.create,
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const createClient = (req, res) => {
  let {
    rif,
    nombre: name,
    teléfono: phone,
    dirección: address,
    correo: email,
  } = req.body;
  if (!rif || !name || !phone || !address || !email) {
    res.status(400).json({
      mensaje: "los datos requeridos están incompletos",
      ayuda: "consulte la documentación",
    });
  } else {
    let newClient = { rif, name, phone, address, email };
    clientService
      .create(newClient)
      .then((client) => {
        res.status(201).json({
          mensaje: "cliente creado exitosamente",
          datos: {
            id: client._id,
            rif: client.rif,
            cliente: client.name,
            dirección: client.address,
            teléfono: client.phone,
            correo: client.email,
            registro: client.create,
          },
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(400).json({
            mensaje: "el rif del cliente ya está registrado",
          });
        } else {
          res.status(500).json(err);
        }
      });
  }
};

const updateOneClient = (req, res) => {
  let { id } = req.params;
  let {
    nombre: name,
    rif,
    teléfono: phone,
    dirección: address,
    correo: email,
  } = req.body;
  if (!name || !rif || !phone || !address || !email) {
    res.status(400).json({
      mensaje: "datos incompletos para la actualización",
      ayuda: "por favor consulte la documentación",
    });
  } else {
    let newData = { name, rif, address, phone, email };
    clientService
      .findByIdAndUpdate(id, newData, { returnDocument: "after" })
      .then((client) => {
        if (!client) {
          res.status(404).json({
            mensaje: "cliente no encontrado",
          });
        } else {
          res.status(200).json({
            mensaje: `cliente ${client.name} actualizado correctamente`,
            datos: {
              id: client._id,
              rif: client.rif,
              cliente: client.name,
              dirección: client.address,
              teléfono: client.phone,
              correo: client.email,
              registro: client.create,
            },
          });
        }
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(400).json({
            mensaje: "el rif ya está registrado",
          });
        } else {
          res.status(500).json(err);
        }
      });
  }
};

const deleteOneClient = (req, res) => {
  let { id } = req.params;
  clientService
    .findByIdAndDelete(id)
    .then((client) => {
      if (!client) {
        res.status(404).json({
          mensaje: "cliente no encontrado",
        });
      } else {
        res.status(200).json({
          mensaje: "cliente eliminado correctamente",
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  getAllClients,
  getOneClient,
  createClient,
  updateOneClient,
  deleteOneClient,
};
