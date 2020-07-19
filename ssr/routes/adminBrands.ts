import * as express from 'express';

import * as BrandController from "../controllers/brand";
import admin from 'ssr/middleware/admin';
import checkAuth from 'ssr/middleware/check-auth';

const router = express.Router();

router.post("", admin , checkAuth, BrandController.addBrand);
router.get("", admin , checkAuth, BrandController.getAllBrands);
router.put("", admin , checkAuth, BrandController.editBrand);
router.get("/:id", admin , checkAuth, BrandController.getBrand);

export default router;