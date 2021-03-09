const mongoose=require("mongoose");

var stockSchema= new mongoose.Schema(
    {
        shareName:{type:String},
        buyingQty:{type:String},
        sellingQty:{type:String},
        buyingPrice:{type:String},
        sellingPrice:{type:String}

    }
)

var shareModel=mongoose.model('shares',stockSchema);

module.exports={shareModel}