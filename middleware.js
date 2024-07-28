module.exports=isLoggedIn=(req,res,next)=>{
      if(!req.isAuthenticated()){
        res.status(401).send("not authenticated!");
      }
      next();
  }