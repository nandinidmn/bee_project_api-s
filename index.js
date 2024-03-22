const express=require('express');
const path=require('path');
const members=require('./Members');

const app=express();

// const logger=(req,res,next)=>{
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// };
// app.use(logger);



//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extented:false }));

//set static folder
app.use(express.static (path.join(__dirname,'public')));

//members api routes
app.use('/api/members',require('./routes/api/members'));

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));   
