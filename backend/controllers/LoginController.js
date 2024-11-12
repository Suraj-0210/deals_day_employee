import bcrypt from "bcryptjs";

import Login from "../models/Login.js";

// Create a new login entry
export const signup = async (req, res) => {
  try {
    const { Username, Password } = req.body;

    // Fetch the last created entry to determine the latest Sno
    const lastLogin = await Login.findOne().sort({ Sno: -1 });
    const newSno = lastLogin ? lastLogin.Sno + 1 : 1;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create new login entry with incremented Sno
    const newLogin = new Login({
      Sno: newSno,
      Username,
      Password: hashedPassword,
    });
    await newLogin.save();

    res
      .status(201)
      .json({ message: "Login entry created successfully", data: newLogin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    console.log(Password + "Password");

    if (!Username || !Password) {
      return res.status(400).json({ error: "Fill out all the fields" });
    }

    const user = await Login.findOne({ Username: Username });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      String(Password),
      user?.Password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    res
      .cookie("username", Username, {
        maxAge: 15 * 14 * 60 * 60 * 1000,
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "Login successfully",
        data: {
          Username: user.Username,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all login entries
export const getAllAdmins = async (req, res) => {
  try {
    const logins = await Login.find();
    res.status(200).json(logins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a login entry by Username
export const getAdminByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const login = await Login.findOne({ Username: username });
    if (!login) return res.status(404).json({ message: "Login not found" });
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the 'username' cookie
    res.clearCookie("username", { sameSite: "strict" });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
