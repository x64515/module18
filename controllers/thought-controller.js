const { User, Thought} = require('../models');

const thoughtController = {
    addThought({ params, body }, res) {
        console.log(params);
        Comment.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thought: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
    
      // add reply to comment
      addReaction({ params, body }, res) {
        Comment.findOneAndUpdate(
          { _id: params.thoughttId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
    
      // remove comment
      removeThought({ params }, res) {
        Comment.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return Pizza.findOneAndUpdate(
              { _id: params.UserId },
              { $pull: { thought: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
      // remove reply
      removeReaction({ params }, res) {
        Comment.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then(dbUserData => res.json(dUserData))
          .catch(err => res.json(err));
      }

}

module.exports = thoughtController;