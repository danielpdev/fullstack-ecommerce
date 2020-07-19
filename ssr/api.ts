import userRoutes from './routes/user';
import adminProducts from './routes/adminProducts';
import adminBrands from './routes/adminBrands';

export function initRoutes(server) {
    server.use('/api/product', adminProducts);
    server.use('/api/brand', adminBrands);
    server.use("/api/user", userRoutes);
}
