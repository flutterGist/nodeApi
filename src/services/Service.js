import mongoose from "mongoose";

class Service {
  constructor(model) {
    this.model = model;
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(query) {
    console.log("id",query.id);
    console.log("sort",query.sort);
    let id =query.id;
    let sort =query.sort;
    let item;
    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
         item = await this.model.find({_id: {"$gt": id}}).sort(sort).limit(10);
      }
      else{
         item = await this.model.find().sort(sort).limit(10);
      }
      
      console.log("sort",query.sort);
      return {
        error: false,
        statusCode: 200,
        data: item
      };
    } catch (errors) {
      console.log("error",errors);
      return {
        error: true,
        statusCode: 500,
        errors
      };
    }
  }

  async get() {
    try {
      let item = await this.model.find();
      if (item)
        return {
          error: false,
          statusCode: 200,
          item
        };
    } catch (error) {
      console.log("error", error);
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Not able to create item",
        errors: error.errors
      };
    }
  }

  async getQuery(query) {
    try {
      let item = await this.model.find({ $text: { $search: query} });
      if (item)
        return {
        error: false,
        statusCode: 200,
        data: item
        };
    } catch (error) {
      console.log("error", error);
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Not able to create item",
        errors: error.errors
      };
    }
  }

  async insert(data) {
    try {
      let item = await this.model.create(data);
      if (item)
        return {
          error: false,
          item
        };
    } catch (error) {
      console.log("error", error);
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Not able to create item",
        errors: error.errors
      };
    }
  }

  async update(id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 200,
        item
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        error
      };
    }
  }

  async delete(id) {
    try {
      let item = await this.model.findByIdAndDelete(id);
      if (!item)
        return {
          error: true,
          statusCode: 404,
          message: "item not found"
        };

      console.log("removed item", item);

      if (item.path) {
        console.log("unlink item", item.path);
        fs.unlink(item.path, function(err) {
          if (err) {
            console.log("error deleting file");
            throw err;
          }
          console.log("File deleted!");
        });
      }

      return {
        error: false,
        deleted: true,
        statusCode: 200,
        item
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        error
      };
    }
  }
}

export default Service;
