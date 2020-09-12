const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { Script } = require('vm')

const app=express();

//define path for exprees configuration
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views');
const partialPaths=path.join(__dirname,'../templates/partials')
//set up static directory to serve
app.use(express.static(publicDirectory));//root path becomes ....../public/index.html therefore 
                                          //app.get('',()) not going to execute


//setup handlebars engine and views
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPaths);




app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:"abu"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'abu bakkar'
    })
})

app.get('/help',(req,res)=>{
    // res.send('help')
    res.render('help',{
       Help:'this is helped text',
       title:'need help ',
       name:'abu bakkar siddique'
    })
 })

app.get('/help/*',(req,res)=>{
    res.render('404',{title:'help/',
    errorMessage:'help article not found'
})
})

app.get('/weather',(req,res)=>{
   
    if(!req.query.address)
    return res.send('please provide address');
    // res.send({
    //     forecast:'it is snowing',
    //     address:req.query.address
    // })

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        return res.send({error})
        forecast(latitude,longitude,(error,{temperature,place,rain})=>{
            if(error)
            return res.send({error})
            res.send({
                temperature:temperature,
                palce:place,
                rain:'ther is '+rain+' percent chance of raining',
                address:req.query.address
            })
        })
    })




    
})
app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
    return res.send({
        error:'please provide search'
    })
    }
   console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        errorMessage:'page not found'
    })
})



app.listen(3000,()=>{
    console.log('server is running')
})