const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const LogInCollection=require("./mongodb")

const tempelatePath=path.join(__dirname,'../tempelates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})


app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    try {
        // Check if user already exists
        const checking = await LogInCollection.findOne({ name: req.body.name });
        console.log("Hello")
        console.log(checking)
        // If user exists, send a response that the user already exists
        if (checking) {
            return res.status(400).send("User details already exist");
        }

        // If user doesn't exist, insert new data
        await LogInCollection.insertMany([data]);

        // Render the home view with the user's name after successful signup
        return res.status(201).render("home", {
            naming: req.body.name
        });

    } catch (error) {
        // Catch any error and send appropriate response
        console.error(error);
        return res.status(500).send("An error occurred during signup");
    }
});

app.listen(3000,()=>{
    console.log("port connected");
}) 