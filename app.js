const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


function newId() {
    const newid  = Math.floor(Math.random()*1000000)+new Date().getMilliseconds()*new Date().getSeconds();
    return newid;
}

app.get("/", (req, res)=>{

    if (req.cookies.todolist === undefined || req.cookies.todolist === null) {
        res.cookie("todolist", []);
        console.log(`Cookie Not Found!...\nCreating a Cookie...\nCookie Created Successfully...\nRedirecting...`);
        res.redirect("/");
    }else{
        const todolist = req.cookies.todolist;
        res.render("index",{
            todolist: todolist
        });
    }
});

app.post("/add", (req, res)=>{
    const content = req.body.content;
    let tempTodolist = req.cookies.todolist;
    tempTodolist.push({
        id: newId(),
        content: content
    });
    res.cookie("todolist", tempTodolist);
    res.redirect("/");
});

app.post("/remove", (req, res)=>{

    const todolist = req.cookies.todolist;
    const delId = Number(req.body.id);
    const index = todolist.findIndex(item => item.id === delId);
    
    if (index !== -1) {
        todolist.splice(index, 1);
        res.cookie("todolist", todolist);
    }
    res.redirect("/");  

});

app.listen(3000, ()=>console.log(`APP Started!`));