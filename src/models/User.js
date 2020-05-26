import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import slugify from 'slugify';
const usersdata = require('./users');

class User {
  initSchema() {
    const schema = new Schema({
      name: {
        type: String,
        required: true,
      },
      slug: String,
      lastName: {
        type: String,
        required: false,
      },
      phoneNumber: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: true,
      }
    }, { timestamps: true });
    schema.pre(
      "save",
      function(next) {
        let post = this;
        if (!post.isModified("name")) {
          return next();
        }
        post.slug = slugify(post.name, "_");
        console.log('set slug', post.slug);
        return next();
      },
      function(err) {
        next(err);
      }
    );
    schema.plugin(uniqueValidator);
    schema.index({ "$**": "text" });
    mongoose.model("users", schema);
  }

  getInstance() {
    this.initSchema();
    mongoose.model("users").deleteMany({},function(err) {});
    mongoose.model("users").insertMany(usersdata);
    return mongoose.model("users");
  }
}

export default User;
