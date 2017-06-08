import Controller from "./service/Controller"

const controller = new Controller(self, fetch);

const service = { controller }

export { service }
