import * as express from 'express';

import * as ProductController from "../controllers/product";
import admin from 'ssr/middleware/admin';
import checkAuth from 'ssr/middleware/check-auth';

const router = express.Router();

router.post("", checkAuth, admin, ProductController.uploadFile, ProductController.addProduct);
router.put("", checkAuth, admin, ProductController.uploadFile, ProductController.editProduct);
router.delete("/:id", checkAuth, admin, ProductController.deleteProduct);
router.get("/:id", ProductController.getProduct);
router.get("", ProductController.allProducts);
router.get("/dashboard/featured", ProductController.featuredProducts);

router.post("/uploadfile", checkAuth, admin, ProductController.uploadFile);
router.post("/files", checkAuth, admin, ProductController.files);
router.post("/resolve/:id", checkAuth, admin, ProductController.resolveFile);

export default router;
