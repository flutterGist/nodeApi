class Controller {

  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    let response = await this.service.getAll(req.params)
    return res.status(response.statusCode).send(response);
  }

  async get(req, res) {
    let response = await this.service.get()
    return res.status(response.statusCode).send(response);
  }

  async getQuery(req, res) {
    const { query } = req.params;
    let response = await this.service.getQuery(query)
    return res.status(response.statusCode).send(response);
  }

  async insert(req, res) {
    let response = await this.service.insert(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(200).send(response);
  }

  async update(req, res) {
    const { id } = req.params;

    let response = await this.service.update(id, req.body);

    return res.status(response.statusCode).send(response);
  }

  async delete(req, res) {
    const { id } = req.params;

    let response = await this.service.delete(id);

    return res.status(response.statusCode).send(response);
  }
  
}

export default Controller;