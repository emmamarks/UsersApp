const express = require('express');
const app = express();
const port = process.env.port || 4000;

const mongodb = require ('mongodb');
const {MongoClient} = mongodb;

app.listen (5000, () => console.log ('app connected'));

const connectionString = 'mongodb://localhost:27017/user';
async function connectToDB (str) {
    const client = new MongoClient (str,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    );
    try{
        await client.connect();
        return client.db()
    } catch (error){
        console.log(err)
    }
}

connectToDB(connectionString)
.then (db => {
    console.log('Database Connected')
})
.catch (err => {
    console.log (err)
})

//ROUTES

app.post ('/user', (req, res) =>{
    const User = req.body.info;
    User.create({
        name: user.jacob,
        email: user.emmamarks001agmail.com,
        country: user.Nigeria
    }, (err, newUser) => {
        if (err){
            return res.status(500).json({message:err})
            }else{
                return res.status(200).json({message:"New User Created", newUser})
        }
    })
})

app.get ('/user', (req, res) =>{
    User.find({}, (err, newUser) => {
        if (err){
            return res.status(500).json({message:err})
        }else{
            return res.status(200).json({user})
        }
    })
})

app.put('/user/:id', (req, res) => {
    User.findByIdAndUpdate (req.params.id, {
        name: req.body.name,
        country: req.body.country
    }, (err, user) => {
        if (err) {
            return res.status(500).json({message:err})
        }
        else if (!user){
            return res.status(404).json({message:"User Not Found"})
        }
        else{
            user.save((err, savedUser) => {
                if (err) {
                    return res.status(400).json({message:err})
                }else{
                return res.status(200).json({message:"User Updated"})
                }
            })
        }
    })
})

app.delete('/user/:id', (req, res) => {
    User.findByIdAndDelete (req.params.id, (err, user) => {
       if (err){
            return res.status(500).json({message:err})
       }
       else if (!user){
            return res.status(404).json({message:"User Not Found"})
       }
       else{
            return res.status(200).json({message:"User Deleted"})
       }
    })
})

app.listen(port, () => console.log (`app listening on port ${port}`));