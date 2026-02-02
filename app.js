const express = require("express");
const app = express();

//body parsing middleware
app.use(express.json());

let todos = [];
let idCounter =1;
 
app.get("todos",(req,res)=>
    {
        res.json(todos);
    });

app.post("/todos", (req,res)=>
{
    const{task} = req.body;
    if (!task){
        return res.status(400).json({message: "Task field is requires"});
    }
    const newTodo =
    {
        id: idCounter++,
        task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get("/todos/:id",(req,res)=>
    {
        const id= parseInt(req.params.id);
        const todo= todos.find(todos.id ===id);
        if(!todo)
        {
            return res.status(404).json({message: "Todo not fount"});
        }
        res.json(todo);
    });
 //put and patch it is also put
    app.put("/todos/id",(req,res)=>
    {
        const id =parseInt(req.params.id);
        const todo = todos.find(t => t.id ===id);
       if(!todo){
        return res.status(404).json({message:"Todo not found"});
       }
       const {task,completed} =req.body;
       
       if(task !== undefined) todo.task=task;
       if(completed !== undefined) todo.completed =completed;
       res.json(todo);
    });

    app.get("/todos/active",(req,res) =>
        {
         const activeTodos= todos.filter(todo => todo.completed ===false);
         res.json(activeTodos);   
    });

    app.delete("/todos/:id",(req,res) =>
    {
        const id =parseInt(req.params.id);
        const index=todos.findIndex(t => t.id ===id);

        if(index === -1){
            return res.status(404).json({message:"Todo not found"});
        }
        todos.splice(index,1);
        res.json({message:"Todo deleted successfully"});
    });

    app.listen(3000, () =>
    {
        console.log("Server running on port 3000");
    });