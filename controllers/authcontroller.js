const User = require("../models/user");
let bcrypt = require("bcryptjs");
const config = require("../config/key");
let jwt = require("jsonwebtoken");
const crypto = require("crypto");
const axios = require("axios");

exports.signup = async (req, res) => {
    const user = new User({
      prenom: req.body.prenom,
      nom: req.body.nom,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    try {
      await user.save();

      const token = jwt.sign({ id: user.id,email:user.email },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

      res.status(200).send({
        id: user._id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        accessToken: token,
        message: "User was registered successfully!"
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la création de compte");
    }
};

exports.signin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.id,email:user.email },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });
    res.status(200).send({
      id: user._id,
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
      accessToken: token,
      message: "User was registered successfully!"
    });
};

exports.signout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); 
    res.send({ message: 'Logged out successfully!' });
}
  





const GITHUB_URL = "https://github.com/login/oauth/access_token";
const jwtSecret = config.secret || "default_secret";

exports.oauth2Redirect = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("Code d'autorisation manquant.");
    }

    const response = await axios({
      method: "POST",
      url: `${GITHUB_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`,
      headers: { Accept: "application/json" },
    });

    const accessToken = response.data.access_token;
    if (!accessToken) {
      return res.status(400).send("Impossible d'obtenir un token d'accès.");
    }

    const userData = await axios({
      method: "GET",
      url: "https://api.github.com/user",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  

    const { login, name} = userData.data;

    const email = login + "@github.com"

    let user = await User.findOne({ email: email });
    if (!user) {
      user = new User({
        prenom: login,
        nom: name || "Utilisateur GitHub",
        email: email || "github@gmail.com",
        password: crypto.randomBytes(16).toString("hex"), 
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, password: user.password },
      jwtSecret,
      { algorithm: "HS256", expiresIn: "24h" }
    );
 
    res.cookie("access_token", token, { httpOnly: true, secure: false });
    res.redirect(`http://localhost:3000/?token=${token}`);
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).send("Erreur interne du serveur");
  }
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

exports.googleOAuthRedirect = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("Code d'autorisation manquant.");
    }

    const response = await axios.post(GOOGLE_TOKEN_URL, null, {
      params: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: "authorization_code",
        code,
      },
    });

    const accessToken = response.data.access_token;
    if (!accessToken) {
      return res.status(400).send("Impossible d'obtenir un token d'accès.");
    }

    const userData = await axios.get(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // console.log("data : ", userData.data)

    const { name, email } = userData.data;
    
    const fullName = name.split(" ")
    const prenomUser = fullName[0]
    const nomUser = fullName[1]

    let user = await User.findOne({ email: email });
    if (!user) {
      user = new User({
        prenom: prenomUser,
        nom: nomUser || "Utilisateur Google",
        email: email || "google@gmail.com",
        password: crypto.randomBytes(16).toString("hex"), 
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, password: user.password },
      jwtSecret,
      { algorithm: "HS256", expiresIn: "24h" }
    );
 
    res.cookie("access_token", token, { httpOnly: true, secure: false });
    res.redirect(`http://localhost:3000/?token=${token}`);
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).send("Erreur interne du serveur");
  }  
};