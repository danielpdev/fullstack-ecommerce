const admin = (req,res,next) =>{
    if(req.userData && req.userData.role === 0 ){
        return res.send({
            message: 'you are not allowed, get out now.'
        });
    }
    next();
}

export default admin;