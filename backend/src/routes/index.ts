import express from 'express';
import unitRoutes from './unityRoutes';

const router = express.Router();

router.use('/', unitRoutes);

export default router;
