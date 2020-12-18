const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  

const users = [
 
  { id: 0, username: "admin", password: 'admin', admin:false },
  { id: 1, username: "do", password: '123', admin:false },
  { id: 2, username: "login", password: 'login',admin:true },
];

users.forEach(async user => {
  const hashing = await new Promise((resolve, reject) => {
    bcrypt.hash(user.password, 10, function (error, hash) {
      if (error) reject(error); else resolve(hash);
    });
  });
  user.hash = hashing; 
});

module.exports = secret => {
  router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
      res.status(401).json({ message: "Fields are empty" });
      return;
    }
    const user = users.find((user) => user.username === username);
    if (user) { 
      if (bcrypt.compareSync(password, user.hash)) {
        const payload = { username: username };
        const token = (payload, secret);

        res.json({
          token: token
        });
      } else {
        res.status(401).json({ message: "Wrong password" })
      }
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  
  
  
  });

  return router;
};