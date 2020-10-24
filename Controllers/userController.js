const router=require('express').Router();
const bodyParser=require('body-parser');
const {check,validationResult}=require('express-validator');
const { update } = require('../Models/user');

const User=require('../Models/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));





router.post('/users',
    [
        check('first_name').not().isEmpty().trim().escape(),
        check('last_name').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail(),
        check('created_by').not().isEmpty().trim().escape(),
        check('title').not().isEmpty().trim().escape(),

    ],
    (req,res)=>{
        const err=validationResult(req);
        if(!err.isEmpty()){
            return res.status(422).json({
                status:false,
                message:'Form Vaidation Error',
                errors: err.array()
            })
        }

        //output data
        // return res.json({
        //     status:true,
        //     message:'User Data Inserted',
        //     data:req.body
        // })

        //save to database
        User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            created_by:req.body.created_by,
            title:req.body.title,
            profile_pic:req.body.profile_pic,
        },(err,result)=>{
            if(err){
                return res.status(500).json({
                    status:false,
                    message:'Db inserted Fail',
                    error:err,
                })
            }

            return res.status(200).json({
                status:true,
                message:'Db inserted',
                result:result,
            })
        })
    }

)

router.get('/users',(req,res)=>{
    User.find((err,result)=>{
        if(err){
            return res.json({
                status:false,
                message:'User Table is empty',
                error:err
            })
        }

        return res.json({
            status:true,
            message:'User Table...',
            result:result,
        })
    })
})

router.get('/users/:id',(req,res)=>{
    User.find({_id:req.params.id},(err,result)=>{
        if(result.length==0){
            return res.json({
                status:false,
                message:'User Table has no record with id '+req.params.id,
            })
        }else{
            return res.json({
                status:true,
                message:'User Table...',
                result:result,
            })
        }
    })
})

router.put('/users/:id',(req,res)=>{
    User.findOne({_id:req.params.id},
        (err,result)=>{
        if(!result){
            return res.json({
                status:false,
                message:'User Table has no record with id'+req.params.id
            })
        }else{
            if(req.body.first_name){
                result.first_name = req.body.first_name;
                result.updated_at = new Date();
            }else if(req.body.last_name){
                result.last_name = req.body.last_name;
                result.updated_at = new Date();
            }else if(req.body.email){
                result.email = req.body.email;
                result.updated_at = new Date();
            }else if(req.body.created_by){
                result.created_by = req.body.created_by;
                result.updated_at = new Date();
            }else if(req.body.title){
                result.title = req.body.title;
                result.updated_at = new Date();
            }else if(req.body.profile_pic){
                result.profile_pic = req.body.profile_pic;
                result.updated_at = new Date();
            }

            result.save((err,updatedObject)=>{
                if(err){
                    res.status(500).send()
                }else{
                    res.json({
                        status:true,
                        message:'User Table Updated...',
                        result:updatedObject,
                    })
                }
            })
        }
    })

})

router.delete('/users/:id',(req,res)=>{
    User.remove({_id:req.params.id},(err,result)=>{
        if(result.deletedCount==0){
            return res.json({
                status:false,
                message:'Data not found'
            })
        }

        return res.json({
            status:true,
            message:'Data removed...'
        })
    })
})

module.exports = router;