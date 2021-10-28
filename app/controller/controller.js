require("dotenv").config();
const db = require("../../models/index");
const User = db.User;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {
    async signup(req, res) {
        try {

            await User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8),
            })

            res
                .status(200)
                .json({ status: 200, message: "User registered successfully!" });

        } catch (err) {
            res.status(400).json({ status: 400, message: "Error -> " + err });
        }
    },


    async signin(req, res) {

        console.log("----SIGN-IN------", req.body)

            try {
                const userCollection = await User.findOne({
                    where: {
                        username : req.body.username,
                    }
                })

                if(!userCollection) {
                    return res.status(401).send({
                        auth: false,
                        accessToken: null,
                        reason: "Username  invalid",
                    });
                }

                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    userCollection.password
                );
                if (!passwordIsValid) {
                    return res.status(401).send({
                        auth: false,
                        accessToken: null,
                        reason: "Password invalid",
                    });
                }

                var token = jwt.sign({ id: userCollection.id }, process.env.JWT_SECRET, {
                    expiresIn: 86400, // expires in 24 hours
                });

                res.status(200).json({ auth: true, accessToken: token, username: req.body.username });

            } catch (err) {
                res.status(500).send("Error -> " + err);
            }
    },

    async userContent(req, res) {

        try {
            const userCollection = await User.findOne({
                where : { id: req.userId },
                attributes : ["username"],
                // include : ["tasks"]
            })

            if(!userCollection) {
                return  res.status(404).json({
                    description: "User Not Found",
                    user: null,
                });
            }

            return res.status(200).json({
                user: userCollection,
            });

        } catch (err) {
            res.status(500).json({
                description: "Can not access User Page",
                error: err,
            });
        }
    }
}

