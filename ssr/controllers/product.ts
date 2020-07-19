import Product from '../models/product';
import { resolve } from 'path';
import { readdir as readdirNoPromise, unlink as unlinkNoPromise } from 'fs';
import { promisify } from 'util';
import { parse } from 'url';
const readdir = promisify(readdirNoPromise);
const unlink = promisify(unlinkNoPromise);

import { configureDiskStorage, getUploadHandler } from 'ssr/config/multer';

const UPLOAD_PATH = 'products/';

export const uploadFile = (req, res, next) => {
    const uploadHandler = getUploadHandler(configureDiskStorage(UPLOAD_PATH));
    uploadHandler(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                message: "Failed to upload picture"
            })
        }
        next();
    });
}

export const files = async (req, res) => {
    const dir = resolve(".") + '/uploads/';
    try {
        const items = await readdir(dir);
        return res.status(200).send(items);
    } catch {
        return res.status(400).send({
            message: "Failed to get files"
        });
    }
}

export const resolveFile = (req, res) => {
    const file = resolve(".") + `/uploads/${req.params.id}`;
    res.download(file)
}

export const allProducts = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    const queryFilters = req.query.filters;
    if (queryFilters) {
        const filters = parse(queryFilters || {}, true);
        for (let [key, value] of Object.entries(filters.query)) {
            findArgs[key] = value;
        }
    }



    Product.
        find(findArgs).
        populate('brand').
        sort([[sortBy, order]]).
        skip(skip).
        limit(limit).
        exec((err, products) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({
                size: products.length,
                products
            })
        })
}
export const featuredProducts = (req, res) => {
    const findArgs = {};
    findArgs['publish'] = true;
    findArgs['featured'] = true;

    Product.
        find(findArgs).
        populate('brand').
        limit(9).
        exec((err, products) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({
                size: products.length,
                products
            })
        })
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        await Product.findOneAndDelete({ _id: productId });
        return res.status(200).send({});
    } catch {
        return res.status(500).send({
            message: 'Failed to remove product'
        });
    }

}

export const getProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findOne({ _id: productId }).populate('brand');
        return res.status(200).send({
            product
        });
    } catch {
        return res.status(500).send({
            message: 'Failed to find product'
        });
    }
}

export const editProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.body.id });
        let pathToImage;

        if (req.file) {
            await unlink(__dirname + "/../../products/" + product.images[0].split("/").pop());
            pathToImage = `${req.protocol}://${req.get('host')}/products_pics/${req.file.filename}`;
            product.images = [pathToImage];
        }
        const { available, availableQuantity, description, featured, name, price, publish, shipping,
            brand } = req.body;
        product.available = available;
        product.availableQuantity = availableQuantity;
        product.description = description;
        product.featured = featured;
        product.name = name;
        product.price = price;
        product.publish = publish;
        product.shipping = shipping;
        product.brand = brand;
        await product.save();
        return res.status(200).send({
            product
        })
    } catch {
        return res.status(400).send({
            message: "Failed to edit product"
        });
    }
}

export const addProduct = async (req, res) => {
    const pathToImage = `${req.protocol}://${req.get('host')}/products_pics/${req.file.filename}`;
    const isTrue = v => v === 'true';
    const product = new Product({
        ...req.body,
        available: isTrue(req.body.available),
        shipping: isTrue(req.body.shipping),
        publish: isTrue(req.body.publish),
        featured: isTrue(req.body.featured),
        images: [pathToImage]
    });

    try {
        const productCreated = await product.save();
        return res.status(200).send({
            product: productCreated
        });
    } catch (err) {
        return res.status(400).send({
            message: "Failed to create product"
        });
    }
}