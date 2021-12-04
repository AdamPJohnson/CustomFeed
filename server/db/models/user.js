const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  feeds: [
    {
      name: String,
      rules: [
        {
          source: String,
          category: String,
        },
      ],
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
