// Import our Controllers
const deviceController = require('../controllers/deviceController')

const routes = [
  {
    method: 'GET',
    url: '/api/devices',
    handler: deviceController.getDevices
  },
  {
    method: 'GET',
    url: '/api/devices/:id',
    handler: deviceController.getDeviceById
  },
  {
    method: 'POST',
    url: '/api/devices',
    handler: deviceController.addDevice,
  },
  {
    method: 'PUT',
    url: '/api/devices/:id',
    handler: deviceController.updateDevice
  },
  {
    method: 'DELETE',
    url: '/api/devices/:id',
    handler: deviceController.deleteDevice
  },
  // feeds
  {
    method: 'GET',
    url: '/api/devices/:id/feeds',
    handler: deviceController.getFeedsByDeviceId
  },
  {
    method: 'POST',
    url: '/api/devices/:id/feeds',
    handler: deviceController.addFeed
  },
]

module.exports = routes