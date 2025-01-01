const fs = require("fs");
require("colors");
const dotenv = require("dotenv");
const Product = require("../../models/productModel");
const dbConnection = require("../../config/database");

dotenv.config({ path: "../../config.env" });

//connect to database
dbConnection();

//Read JSON files
const products=JSON.parse(fs.readFileSync('./products.json'));

//Insert data into database
const insertData =async()=>{
    try{
        await Product.create(products);
        console.log("Data Imported".green.inverse);
        process.exit();
    }catch(err){
        console.error(err);
    }
}

//Delete data
const deleteData =async()=>{
    try{
        await Product.deleteMany();
        console.log("Data Deleted".red.inverse);
        process.exit();
    }catch(err){
        console.error(err);
    }
}

if(process.argv[2]==='-i'){
    insertData();
}else if(process.argv[2]==='-d'){
    deleteData();
}