import UserController from './../src/controllers/UserController';

export default (app) => {

  // POST ROUTES
  app.get(`/api/user/:id/:sort`, UserController.getAll);
  app.get(`/api/user/`, UserController.get);
  app.get(`/api/query/:query`, UserController.getQuery);
  app.post(`/api/add`, UserController.insert)
  app.put(`/api/update/:id`, UserController.update);
  app.delete(`/api/delete/:id`, UserController.delete);

}