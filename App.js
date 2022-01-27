const express= require('express');
const PORT = 8088
const app = express();
const fs = require('fs')


app.use(express.json())
app.set('views','./src/views');
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const methodOverride = require('method-override')// for DELETE and PUT
app.use(methodOverride('_method'))


app.get("/", (req, res) => {
    // res.sendFile('form.html',{ root : '.' });
    const data = JSON.parse(fs.readFileSync("empdetails.json"));

    res.render('home',{data})
    // res.send(empshow);
    
  });

  app.get("/add-data", (req, res) => {
      let clubreq = []
    res.render('addpost')
  });

  app.post("/add-data", (req, res) => {
    console.log(req.body);
    const empdata = JSON.parse(fs.readFileSync("empdetails.json"));
    console.log(req.body.name);
    // res.send("POST DATA");
    let datapush = req.body;
    const len = empdata.length
    datapush["id"]= len + 1
    empdata.push(datapush);
    fs.writeFileSync("empdetails.json", JSON.stringify(empdata));
    res.redirect('/')
  });
  app.delete('/deletedata/:index', (req, res) => {
    const index=req.params.index
    console.log(index)
    const data=JSON.parse(fs.readFileSync('empdetails.json'))
    data.splice(index,1)
    console.log(data)
    fs.writeFileSync('empdetails.json',JSON.stringify(data))
    res.redirect('/')
})

app.get('/updatedata/:index',(req,res)=>{
    let  empdata=JSON.parse(fs.readFileSync('empdetails.json'))
    const index=req.params.index
    const data = empdata[index]
    res.render('updatepost',{data,index})
  })

  app.put('/updatedata/:index', (req, res) => {
    const index=req.params.index
   let  data=JSON.parse(fs.readFileSync('empdetails.json'))
    var updata=(req.body)
    // console.log(data[id-1])
    // data[index].id=id
    data[index].name=updata.name
    data[index].age=updata.age
    data[index].city=updata.city
    data[index].salary=updata.salary
   
    fs.writeFileSync('empdetails.json',JSON.stringify(data))
    res.redirect('/')
  })

  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`work on ${PORT}`);
  })