const express = require('express')
const aboutModel = require('../../model/admin model/aboutModel')

exports.about = (req,res) =>{
    aboutModel.find((err,data)=>{
        if(!err){
            res.render('./admin views/about',{
                title : "About",
                aboutData : data
            })
        }
    })
    
}
exports.addAbout = (req,res) =>{
    res.render('./admin views/addAbout',{
        title : "Add About"
    })
}
exports.saveAbout = (req,res)=>{
    
    const post = new aboutModel({
        about :req.body.addAbout
        
    })
    post.save().then(result=>{
        console.log('post saved');
        res.redirect('/admin/about')
    }).catch(err=>{
        console.log(err,'Post not saved');
    })
}

exports.editAbout = (req,res)=>{
    pid = req.params.p_id
    aboutModel.findById(pid).then(result=>{
        res.render('./admin views/editAbout',{
            title : "Edit About",
            editData : result
        })
    }).catch(err=>{
        console.log(err,'About not edited');
    })

   
}

exports.updateAbout = (req,res,next)=>{
    const about = req.body.editAbout
    const pid = req.body.p_id
    aboutModel.findById(pid).then(result=>{
        console.log(result);

        result.about = about
        return result.save().then(op=>{
            res.redirect('/admin/about')
            console.log('About edited');
        }).catch(err=>{
            console.log(err,"Error spotted while updating.");
        })
    }).catch(err=>{
        console.log(err);
    })
}

exports.softDelete = (req,res)=>{
    const postId = req.params.p_id
    aboutModel.findByIdAndUpdate({_id : postId},{status : 0},(err,data)=>{
        if(!err){
            console.log('product deleted');
            res.redirect('/admin/dashboard')
        }
    })

}

exports.adminAuth = (req, res, next) => {
    if(req.user){
        next()   
    }else{
        res.redirect('login')
    }
}
