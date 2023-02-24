const { Thought, User } = require("../Models");

module.exports = {
      //Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought 
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select("-__v")
      // return if no user is found
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  /*in real practice, it will be best to findUser to check 
  if user exists and create comment after*/

  createThought(req, res) {
    Thought.create(req.body)
    .then(thought=> {
        return User.findOneAndUpdate({username:req.body.username},
            {$push:{thoughts:thought._id}},
            {runValidators: true, new:true}
            ).then(user=>{
                !user ?res.status(404).json({message: "thought creted but no user with that ID"})
                : res.json("thought successfully created")
            }).catch((err)=> res.status(500).json(err.message));
    })
  },
  updateThought(req, res){
    Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$set:req.body},
        {runValidators: true, new: true}).then(thought=>{
            !thought ?res.status(404).json({message: "thought updated but no user with that ID"})
            : res.json("thought successfully updated")
        }).catch((err)=> res.status(500).json(err.message));
  },
  deleteThought (req, res){
    Thought.findOneAndDelete(
        {_id:req.params.thoughtId},
    ).then(thought=>{
        if (!thought){
        return res.status(404).json({message: "no thought with that ID"})
  }
  return User.findOneAndUpdate
})
  }


}