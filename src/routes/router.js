const express = require("express");
const router = new express.Router();

const authenticate = require("../middleware/authenticate");
const Register=require("../models/student")

const bcrypt = require('bcryptjs');


router.post("/Signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check for missing required fields
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      // Check if the email already exists in the database
      const existingUser = await Register.findOne({ email }); 
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Create a new instance of the Register model with the provided data
      const newRegister = new Register({
        name,
        email,
        password,
      });
  
      console.log(newRegister)
    //   const token=await newRegister.generateAuthtoken()
    //   console.log(token)
      // Save the new user to the database
      const savedRegister = await newRegister.save();
  
      console.log(savedRegister);
      res.status(201).json({ message: "Data successfully uploaded" });
    } catch (err) {
      console.log(err);
      res.status(422).json({ error: "Failed to upload data" });

      console.log(err)
    }
  });
  


  //Login ////////////////////////////


  router.post("/signin" , async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try{
        const userValid = await Register.findOne({email:email});
        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password);
            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{
                // token generate
                const token = await userValid.generateAuthtoken();
                console.log(token)
                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });
                const result = {
                    userValid,
                    token
                }
               res.status(201).json({status:201,result})
            }
        }
    }catch(err){

        console.log(err)
        res.status(400).json({error:"succsessfull not full"})
    }

})






//aignin Loging Form
// wq
//authentication  ///  

router.get("/Cont",authenticate,(req,res)=>{
    console.log("hello")
    res.send(req.rootUser)
});



///Out Line Row class


router.get("/logout",(req,res)=>{
    console.log("hello hellow eolred")
    res.clearCookie("usercookie")
    res.status(200).send("UsreLogout")
});


// router.get("/logout",authenticate, async (req, res) => {
//     try {
//       // Find the user by ID
//       const userId = req.userId;
//       const user = await User.findById(userId);
  
//       if (!user) {
//         throw new Error("User not found");
//       }
  
//       // Perform any additional logout operations, such as updating the user's status or session
  
//       // Clear the usercookie cookie
//       // res.clearCookie("usercookie");
//       res.clearCookie("usercookie",{path:"/"});
//       // Send a response indicating successful logout
//       res.status(200).send("User logged out");
//     } catch (error) {
//       // Handle any errors that occur during logout
//       res.status(500).send("An error occurred during logout");
//       console.error(error);
//     }
//   });
  
 

module.exports = router;