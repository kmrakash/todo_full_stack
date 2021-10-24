require("dotenv").config();
const { INTEGER } = require("sequelize");
const db = require("../../models/index");
const Task = db.Task;
const User = db.User;

module.exports = {

    // Read
    async getAllTaskofUser(req, res) {

        try {
            const taskCollections = await Task.findAll({
                where : {
                    userId: req.userId
                }
            })

           return res.status(200).send(taskCollections);

        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }

    },


    // create
    async createTask(req, res) {

        console.log("---Create Task----");
        console.log(req.body);

        try {
            const task = await Task.create({
                title : req.body.title,
                userId : req.userId,
                isComplete : false
            })
            res.status(201).send(task)
        } catch(e) {
            console.log(e);
            res.status(400).send(e);
        }
    },

    //update
    async updateTask(req, res) {

        const {uuid , title, isComplete} = req.body;

        try {
           Task.update({
               title,
               isComplete
           },{
               where: {
                   uuid
               }
           })

           res.status(200).json({
               msg : "Updated Task"
           })

        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },


    // Delete
    async deleteTask(req, res) {
        const { uuid } = req.body;

        try {
            const taskCollection = await Task.findOne({
                where :{
                    uuid
                }
            })

            if (!taskCollection) {
                return res.status(404).json({
                    msg: "Task Not Found"
                })
            }

            console.log("To be Deleted-->", taskCollection)

            await taskCollection.destroy();

            return res.status(200).json({
                msg : "Deleted Successfully"
            });

        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }
}
