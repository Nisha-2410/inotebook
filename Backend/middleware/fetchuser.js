var jwt = require('jsonwebtoken');
const JWT_secret='hii';
const fetchuser=(req,res,next)=>{
   const token = req.header('auth-token');
   if(!token){
    res.statuts(401).send({error:"please authenticate validate user"});
   }
   try {
    const data=jwt.verify(token,JWT_secret);
    req.user=data.user;
    next();
    
   } catch (error) {
    res.status(401).send({error:"please authenticate validate user"});
   }

}
module.exports=fetchuser;