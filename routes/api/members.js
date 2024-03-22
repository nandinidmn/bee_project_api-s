const express=require('express');
const uuid=require('uuid');
const router =express.Router();
const members=require('../../Members');

//get all members
router.get('/',(req,res)=>res.json(members));
//get single member
router.get('/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));

    if(found){
    res.json(members.filter(member=>member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg:`no member with the id of ${req.params.id}`});
    }
    
});


//create member
router.post('/',(req,res)=>{
    const newMember={
      id: uuid.v4(),
      name:req.body.name,
      email:req.body.email,
      status:'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:'please include a nmae and email'});
    }
    members.push(newMember);
    res.json(members);
});

//update request
router.put('/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));

    if(found){
    const upMember=req.body;
    members.forEach(member=>{
        if(member.id===parseInt(req.params.id)){
            member.name=upMember.name ? upMember.name : member.name;
            member.email=upMember.email ? upMember.email : member.email;

            res.json({msg:'member updated',member});
        }
    });
    }else{
        res.status(400).json({msg:`no member with the id of ${req.params.id}`});
    }
    
});


//delete
router.delete('/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));

    if(found){
    res.json({
        msg:'member deleted',
        members: members.filter(member => member.id !== parseInt(req.params.id))
    });
    }else{
        res.status(400).json({msg:`no member with the id of ${req.params.id}`});
    }
    
});


module.exports=router;