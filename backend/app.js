
const express = require('express');
  
const app = express();
const PORT = 3000;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is running on "+ PORT);
    else 
        console.log("Error: ", error);
    }
);