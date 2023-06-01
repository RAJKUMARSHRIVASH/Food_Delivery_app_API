
const express = require("express");
const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const saltRounds = 4;
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const payload = req.body;
    try {
        const data = await UserModel.findOne({ email: payload.email });
        if (data) {
            res.json("User already registered");
        }
        else {
            bcrypt.hash(payload.password, saltRounds, async (err, hashedPass) => {
                if (err) {
                    res.json(err)
                } else {
                    payload.password = hashedPass;
                    const newUser = new UserModel(payload);
                    await newUser.save();
                    res.json("User registered successfully");
                }
            })

        }
    } catch (error) {
        res.json("Couldn't register " + error)
    }
});

userRouter.post("/login", async (req, res) => {
    const payload = req.body;
    try {
        const data = await UserModel.findOne({ email: payload.email });
        if (data) {
            bcrypt.compare(payload.password, data.password, async (err, result) => {
                if (err) {
                    res.json(err + " I");
                } else if (result) {
                    jwt.sign({ userID: data._id }, "foodyapp", (err, token) => {
                        if (err) {
                            res.json(err + " II");
                        }
                        else if (token) {
                            res.json({ msg: "Login Successful", token });
                        }
                    });
                }
                else if (result == false) {
                    res.json("wrong password");
                }
            })
        }
        else {
            res.json("wrong credentials Please register first");
        }
    } catch (error) {
        res.json("Couldn't login" + error)
    }
});

userRouter.patch("/:id/reset", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const data = await UserModel.findById({ _id: id });
        bcrypt.compare(payload.password, data.password, async (err, result) => {
            if (err) {
                res.json(err + " I");
            } else if (result) {
                const currentPassword = payload.password;
                const newPassword = payload.newPassword;
                if (currentPassword && newPassword) {
                    bcrypt.hash(newPassword, saltRounds, async (err, hashedPass) => {
                        if (err) {
                            res.json(err)
                        } else {
                            await UserModel.findByIdAndUpdate({ _id: id }, { password: hashedPass });
                            res.json("Password reset successful");
                        }
                    })
                }
                else {
                    res.json("Your Current password doesn't match");

                }
            }
            else if (result == false) {
                res.json("wrong password");
            }
        })

    } catch (error) {
        res.json("Couldn't reset password");
    }
})

module.exports = userRouter;