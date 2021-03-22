// Import our Controllers
const userController = require("../controllers/userController");

const routes = (fastify) => [
  {
    method: "POST",
    url: "/api/users/:id/generateToken",
    handler: userController.generateKey(fastify),
  },
  {
    method: "GET",
    url: "/api/users/:id",
    handler: userController.getUserById(fastify),
  },
  {
    method: "POST",
    url: "/api/users",
    handler: userController.addUser(fastify),
  },
  {
    method: "GET",
    url: "/api/users",
    handler: userController.getUsers(fastify),
  },
  
//   {
//     method: "PUT",
//     url: "/api/devices/:id",
//     handler: userController.updateUser(fastify),
//   },
//   {
//     method: "DELETE",
//     url: "/api/users/:id",
//     handler: userController.deleteUser(fastify),
//   },
];

module.exports = routes;
