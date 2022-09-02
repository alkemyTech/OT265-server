
const db = require('../models/index');
const sendEmail = require('../services/sendEmail');
const Contacts = db.Contacts;

const contactController = {
  getAll: async (req, res, next) => {
    try {
      const allContacts = await Contacts.findAll()

      res.status(200).json({
        success: true,
        data: allContacts
      })

    } catch (error) {
      next(error);
    }
  },

  new: async (req, res, next) => {
    try {
      const { name, email, phone, message } = req.body

      const newContact = await Contacts.create({
        name,
        email,
        phone,
        message,
      })

      const subject = 'Bienvenido a ONG-265'
      const title = `¡Hola ${name}!`
      const text = "Muchas gracias por comunicarte con nosotros. Te responderemos a la brevedad"
      sendEmail(email, subject, title, text)

      res.status(200).json({
        success: true,
        data: newContact
      })

    } catch (error) {
      next(error);
    }
  },

  getTable: async (req, res, next) => {
    try {
      const allContacts = await Contacts.findAll();

      let rows = ""

      for (let i = 0; i < allContacts.length; i++) {
        let newRow = `
        <li style="border-radius: 3px; padding: 15px 10px; display: flex; justify-content: space-between; margin-bottom: 5px; background-color: #ffffff;
        font-size: 14px; text-transform: uppercase; letter-spacing: 0.03em; text-align:center; box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.2)">
          <div style="max-width=15% " >${allContacts[i].name}</div>
          <div style= max-width=15% " >${allContacts[i].phone}</div>
          <div style="max-width=15% " >${allContacts[i].email}</div>
          <div style="max-width=15% " >${Date(allContacts[i].createdAt).slice(0,15)}</div>
          <div style="max-width=40% " >${allContacts[i].message}</div>
        </li>
        `  
        rows= rows.concat(newRow)
      }

      const template = `
        <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Table</title>
          </head>
          <body>
              <div style="max-width: 1000px; margin-left: auto; margin-right: auto; padding-left: 10px; padding-right: 10px">
                  <h2 style="font-size: 26px; margin: 10px 0; text-align: center;">Contacts Table</h2>
                  <ul>
                    <li style="border-radius: 3px; padding: 15px 10px; display: flex; justify-content: space-between; margin-bottom: 10px; background-color: #95A5A6;
                    font-size: 14px; text-transform: uppercase; letter-spacing: 0.03em; text-align:center">
                      <div style="max-width=15%;">Nombre</div>
                      <div style="max-width=15%;"">Teléfono</div>
                      <div style="max-width=15%;">e-mail</div>
                      <div style="max-width=15%;">Fecha</div>
                      <div style="max-width=40%;">Mensaje</div>
                    </li>
                    ${rows}
                  </ul>
                </div>
          </body>
          </html>
        `

      res.status(200).send(template)

    } catch (error) {
      next(error);
    }
  },

};

module.exports = contactController;
