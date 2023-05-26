const mongoose=require("mongoose");
var bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
let keysecret="jugalsharnmaimaamgoodlevelpersonstartlinkandbitchlook"
// const keysecret=process.env.SECRETY_KEY;
// let keysecret="jugalsharnmaimaamgoodlevelpersonstartlinkandbitchlook"
const Students=new mongoose.Schema({

    name:{
        type:String
    },

    email:{
        type:String,Number,
        required: true,
        unique: true,
    },

    password:{
        type:String,Number,
        required: true,
    },

    tokens:[
        {
            token:{
                type:String
            },
        }
    ]


   

})

//we genterateAutoken and set the
Students.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}


Students.pre("save" , async  function(next){

    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password , 12)
    }

    next()
})






const Register=new mongoose.model("Usersdata" , Students) //models collection name of database

module.exports=Register;