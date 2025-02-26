const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const userFound = await User.findOne({ where: { email } });

    if (userFound) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    console.log({ id: user.id, email: user.email });

    const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT_KEY, {
      expiresIn: "10m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const userFound = await User.findOne({ where: { email } });

    if (!userFound)
      return res.status(400).json({ error: "Email or password is incorrecti" });

    // compares requests's password with db's encrypted password
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch)
      return res.status(400).json({ error: "Email or password is incorrect" });

    const token = jwt.sign({ id: userFound.id }, process.env.SECRET_JWT_KEY, {
      expiresIn: "10m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports = { register, login, logout };
