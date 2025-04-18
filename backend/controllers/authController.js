const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../utils/googleConfig');
const User = require('../models/userModel');

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, image: picture });
    }

    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    return res.status(200).json({
      message: 'Success',
      token,
      user,
    });
  } catch (error) {
    console.log("Google login error →", error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = { googleLogin };
