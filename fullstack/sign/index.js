const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./module/users');

const app = express();
mongoose.connect("mongodb://localhost:27017/examination", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());

//create

app.post('/create', async (req, res) => {
    const { title, firstname, lastname, position, company, businessarena, role, street, additionalinformation, zipcode, place, country, code, phonenumber, email } = req.body;
  
    const user = new UserModel({
      title,
      firstname,
      lastname,
      position,
      company,
      businessarena,
      role,
      street,
      additionalinformation,
      zipcode,
      place,
      country,
      code,
      phonenumber,
      email,
    });
  
    try {
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

//read
app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find().exec();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

//update
app.put('/update/:id',(req, res) => {
    const id = req.params.id;
   UserModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.listen(5000, ()=>{console.log("Hey there server is running on port 5000")});