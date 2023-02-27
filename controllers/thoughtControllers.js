const { Thought, User } = require("../Models");

module.exports = {
  //Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err.message));
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
    Thought.create(req.body).then((thought) => {
      return User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { runValidators: true, new: true }
      )
        .then((user) => {
          !user
            ? res
                .status(404)
                .json({ message: "thought creted but no user with that ID" })
            : res.json("thought successfully created");
        })
        .catch((err) => res.status(500).json(err.message));
    });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        // console.log("***");
        // console.log(thought);
        if (!thought) {
          res
            .status(404)
            .json({ message: "thought updated but no user with that ID" });
        } else {
          res.json("thought successfully updated");
        }
      })
      .catch((err) => res.status(500).json(err.message));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id }).then((thought) => {
      if (!thought) {
        res.status(404).json({ message: "no thought with that ID" });
      } else{
        res.json("thought successfully deleted");
      }
      // return User.findOneAndUpdate
    });
  },
  addReaction({ params, body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body }}, 
        { new: true, runValidators: true }
    )
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(thought => {
    if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
    }
    res.json(thought);
})
.catch(err => res.status(400).json(err))

},
deleteReaction({ params }, res) {
  Thought.findOneAndUpdate(
      { _id: params.thoughtId }, 
      { $pull: { reactions: { reactionId: params.reactionId }}},
      { new : true }
  )
  .then(thought => {
      if (!thought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
      }
      res.json(thought);
  })
  .catch(err => res.status(400).json(err));
}







  // addReaction(req, res){
  //   Thought.findOneAndUpdate(
  //     {_id: req.params.thoughtId },
  //     {$push: {reactions: req.body}},
  //     { runValidators: true, new: true }
  //     )
  //     .select('-__v')
  //     .populate('reactions').then
  //     ((thought)=>{
  //       if(!thought){
  //         res.status(404).json({ message: 'No reaction found with that ID'});
  //       } else{
  //         res.json(thought)
  //       }
  //     }).catch((err) => res.status(500).json(err.message));
  // },
  // deleteReaction(req,res){
  //   console.log(req.params);
  //   Thought.findOneAndDelete(
  //     {_id:req.params.thoughtId},
  //     {$pull: {reactions:req.params.reactionId}},
  //     {runValidators: true, new: true}
  //     )
  //     .then((thought) => {
  //       console.log("***");
  //       console.log(thought);
  //       if (!thought) {
  //         res
  //           .status(404)
  //           .json({ message: "No thought found with that ID" });
  //       } else {
  //         res.json("reaction successfully deleted");
  //       }
  //     })
  //     .catch((err) => res.status(500).json(err.message));
  // },


};
