const UserRoutes = require('./UserRoutes');
const UploadRoutes = require('./UploadRoutes');
const ProductRoutes = require('./ProductRoutes');

module.exports = [
    { Key: "users", Route: UserRoutes },
    { Key: "uploads", Route: UploadRoutes },
    { Key: "products", Route: ProductRoutes }
]