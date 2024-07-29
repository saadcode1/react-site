const User = require("../models/user");
const Post = require("../models/post");

module.exports.signin = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const user = await User.register(newUser, password);
    req.login(user, (err) => {
      if (err) {
        return res.status(401).send(err.message);
      }
      res.status(201).send(req.user);
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
}

module.exports.loggedIn = (req, res) => {
  try { console.log(req.user);
    res.status(201).send(req.user);
  } catch (e) {
    res.status(401).send(e.message);
  }
}

module.exports.postCreated = async (req, res) => {
  try {
    const { description, image } = req.body;
    const post = new Post({ description, post: image, userId: req.user._id });
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


module.exports.loggeOut=(req,res)=>{
  req.logout(function(err) {
    if (err) { res.status(401).send(err); }
    console.log("you are successfully loggedOut!");
   return res.status(201).send("successfully loggedOut");
  });
}
