var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require('body-parser');
var {shareModel}=require('./model/share')


var apps=express();


apps.use(bodyParser.json());
apps.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://shaji:ponnu123@cluster1.u2cuq.mongodb.net/sharedb?retryWrites=true&w=majority",{ useNewUrlParser: true},{ useUnifiedTopology: true })


apps.post('/addshare', async (req,res)=>{
    try
    {
        var data= req.body;
        console.log(data);
        var data=new shareModel(req.body);
        var result= await data.save();
        res.json(result);
        
    }
    catch(error){res.status(500).send(error)}
})


apps.get('/viewall', async(req,res)=>{
    try
    {
        var result=await shareModel.find().exec();
        res.json(result);
    }
    catch(error){res.status(500).send(error)};
})


apps.post('/search', async (req,res)=>{
    try
    {
        shareModel.find(req.body, (error,data)=>{
            if(error){throw error}
            else{res.json(data)};
        })
    }
    catch(error){res.status(500).send(error)}
})

apps.post('/update', async (req,res)=>{
    try
    {
        shareModel.findByIdAndUpdate(req.body.id,
           {shareName:req.body.shareName, buyingQty:req.body.buyingQty,
           sellingPrice:req.body.sellingPrice,buyingPrice:req.body.buyingPrice,
           sellingQty:req.body.sellingQty},(error,data)=>{
               if(error){throw error}
               else{res.json({'Status':'Success'})};
           }
            )
    }
    catch(error){res.status(500).send(error)}
})

apps.post('/delete', async (req,res)=>{
    try
    {
        shareModel.findByIdAndDelete(req.body.id,(error,data)=>{
            if(error){res.send(error)}
            else{res.json({'Status':'Success'})};
        })
    }
    catch(error){res.status(500).send(error)}
})


apps.listen(process.env.PORT || 3002,function(){
    console.log("Node Server Running!!!")
})