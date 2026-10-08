const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const{v4: uuidv4}= require("uuid");
uuidv4();
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "gitam college",
        content: " i love coding"
    },
    {
        id: uuidv4(),
        username: "rahul kumar",
        content: " i got selected for  my 1st internship"
    },
    {
        id: uuidv4(),
        username: "jay karan",
        content: " hard work is important to achive success"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4(); 
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} =req.params;
    console.log(id);
    let post = posts.find((p)=> id === p.id);
    if (!post) {
        return res.status(404).send("Post nahi mila! Exact ID check karein.");
    }
    
    res.render("show.ejs",{post});
    
});

app.patch("/posts/:id", (req,res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
   let post = posts.find((p)=> id === p.id);
    post.content = newContent
    console.log(newContent);
    res.redirect("/posts");

});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    
    if (!post) {
        return res.status(404).send("Post nahi mila!");
    }
    
   
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req,res) =>{
    let { id } = req.params;
    
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");

});

app.listen(port, () => {
    console.log("App running on http://localhost:8080/posts");
});