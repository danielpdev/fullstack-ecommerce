
import Brand from '../models/brand';

export const addBrand = async (req, res) => {
    const brand = new Brand(req.body);
    try {
        const createdBrand = await brand.save();
        return res.status(200).json({
            brand: createdBrand
        })
    } catch {
        return res.json({
            message: "Failed to create brand"
        });
    }
}

export const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find({});
        return res.status(200).send({
                brands
            });
    } catch {
        return res.status(400).send({
            message: "Failed to get brands"
        });
    }
}

export const getBrand = async (req, res) => {
    const brandId = req.params.id;

    try {
        const brand = await Brand.findOne({_id: brandId});
        return res.status(200).send({
                brand
            });
    } catch {
        return res.status(400).send({
            message: "Failed to get brands"
        });
    }
}

export const editBrand = async (req, res) => {
    try {
        const brand = await Brand.findOne({_id: req.body.id});

        const { description, name } = req.body;
        brand.description = description;
        brand.name = name;
        
        await brand.save();
        return res.status(200).send({
            brand
        });
    } catch {
        return res.status(400).send({
            message: "Failed to edit brand"
        });
    }
}