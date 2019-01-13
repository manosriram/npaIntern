const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String
  },
  contactNo: {
    type: Number
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  location: {
    type: String
  },
  contacts: [{
    user: {
      type:Schema.Types.ObjectId,
      ref: "myPerson"
    }
  }]
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
