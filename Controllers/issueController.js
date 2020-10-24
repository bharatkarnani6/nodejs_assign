const router=require('express').Router();
const bodyParser=require('body-parser');
const {check,validationResult}=require('express-validator');

const Issue=require('../Models/issue');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/issues',
    [
            check('description').not().isEmpty().trim().escape(),
            check('priority').not().isEmpty().trim().escape(),
            check('status').not().isEmpty().trim().escape(),
            check('created_by').not().isEmpty().trim().escape(),
            check('title').not().isEmpty().trim().escape(),
            check('assignee').not().isEmpty().trim().escape(),
            
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

        Issue.create({
            description:req.body.description,
            priority:req.body.priority,
            status:req.body.status,
            created_by:req.body.created_by,
            title:req.body.title,
            assignee:req.body.assignee,
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

})

router.get('/issues',(req,res)=>{
    Issue.find((err,result)=>{
        if(err){
            return res.json({
                status:false,
                message:'Issue Table is empty',
                error:err
            })
        }

        return res.json({
            status:true,
            message:'Issue Table...',
            result:result,
        })
    })
})


router.get('/issues/:id',(req,res)=>{
    Issue.find({_id:req.params.id},(err,result)=>{
        if(result.length==0){
            return res.json({
                status:false,
                message:'Issue Table has no record with id '+req.params.id,
            })
        }else{
            return res.json({
                status:true,
                message:'Issue Table...',
                result:result,
            })
        }
    })
})

router.put('/issues/:id',(req,res)=>{
    Issue.findOne({_id:req.params.id},
        (err,result)=>{
        if(!result){
            return res.json({
                status:false,
                message:'Issues Table has no record with id'+req.params.id
            })
        }else{
            if(req.body.description){
                result.description = req.body.description;
                result.updated_at = new Date();
            }else if(req.body.priority){
                result.priority = req.body.priority;
                result.updated_at = new Date();
            }else if(req.body.status){
                result.status = req.body.status;
                result.updated_at = new Date();
            }else if(req.body.created_by){
                result.created_by = req.body.created_by;
                result.updated_at = new Date();
            }else if(req.body.title){
                result.title = req.body.title;
                result.updated_at = new Date();
            }else if(req.body.assignee){
                result.assignee = req.body.assignee;
                result.updated_at = new Date();
            }

            result.save((err,updatedObject)=>{
                if(err){
                    res.status(500).send()
                }else{
                    res.json({
                        status:true,
                        message:'Issue Table Updated...',
                        result:updatedObject,
                    })
                }
            })
        }
    })

})

router.delete('/issues/:id',(req,res)=>{
    Issue.remove({_id:req.params.id},(err,result)=>{
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

module.exports=router;