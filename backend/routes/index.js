const UserRoutes = require('./UserRoutes');
const SettingRoutes = require('./SettingRoutes');
const UploadRoutes = require('./UploadRoutes');
const VerifyRoutes = require('./VerifyRoutes');
const SocialSettingRotes = require('./SocialSettingRoutes');
const RoadmapRoutes = require('./RoadmapRoutes');
const SubmitRoutes = require('./SubmitsRoutes');
const ProductRoutes = require('./ProductRoutes');
const InvoiceRoutes = require('./InvoiceRoutes');

module.exports = [
    { Key: "users", Route: UserRoutes },
    { Key: "settings", Route: SettingRoutes },
    { Key: "uploads", Route: UploadRoutes },
    { Key: "verify", Route: VerifyRoutes },
    { Key: "roadmaps", Route: RoadmapRoutes },
    { Key: "submits", Route: SubmitRoutes, },
    { Key: "products", Route: ProductRoutes },
    { Key: "invoices", Route: InvoiceRoutes },
    { Key: "socialSettings", Route: SocialSettingRotes }
]