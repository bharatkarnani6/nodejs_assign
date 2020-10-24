const mongoose=require('mongoose');
const assert=require('assert');

const db_url=process.env.DB_URL;


mongoose.connect(db_url,
    {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    },
    (err,link)=>{
        assert.equal(err,null,"DB connect fail..");

        console.log("DB conneted...");
        //console.log(link);
    }
)
