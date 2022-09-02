const db = require('../models/index');
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
        const {name,email,phone,message} = req.body

        const newContact = await Contacts.create({
            name,
            email,
            phone,
            message,
        })

        res.status(200).json({
			success: true,
			data: newContact
        })

      } catch (error) {
        next(error);
      }
    },

  };
  
  module.exports = contactController;
  