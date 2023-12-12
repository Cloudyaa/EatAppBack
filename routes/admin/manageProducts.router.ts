import { Router } from 'express';
import { ProductRecord } from '../../records';
import { ProductDTO } from '../../types';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

export const manageProducts = Router();
const productImagePath = path.join(__dirname, '../../../eat-app-front/public/img/products');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productImagePath);
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

manageProducts
  .get('/', async (req, res) => {
    const products = await ProductRecord.find('');
    res.status(200).json(products);
  })

  .put('/:productId', async (req, res) => {
    const productData: ProductDTO = req.body;
    const { productId } = req.params;

    const productToUpdate = await ProductRecord.findById(productId);

    if (productToUpdate.length === 0) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'Product not found',
      });
    }

    const product = new ProductRecord({ ...productData, productId });
    await product.update();

    res.status(200).json({
      status: res.statusCode,
      message: 'Product updated successfully',
    });
  })

  .delete('/:productId', async (req, res) => {
    const productId = req.params.productId;

    const productToDelete = await ProductRecord.findById(productId);

    if (productToDelete.length === 0) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'Product not found',
      });
    }

    await ProductRecord.delete(productId);

    res.status(200).json({
      status: res.statusCode,
      message: 'Product removed successfully',
    });
  })

  .post('/new', async (req, res) => {
    const product: ProductDTO = req.body;

    const newProduct = new ProductRecord(product);

    const productId = await newProduct.insert();

    res.status(200).json({
      status: res.statusCode,
      message: 'Product added successfully',
      productId,
    });
  })

  .post('/upload', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: 'No binary data provided',
        });
      }

      res.status(200).json({
        status: res.statusCode,
        message: 'Image saved successfully',
      });
    } catch (error) {
      console.error('Error during binary data upload:', error);
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      });
    }

    // Access the file buffer with req.file.buffer
    const fileBuffer = req?.file?.buffer;

    // Generate a unique filename based on the original filename and timestamp
    const fileName = `${req?.file?.filename}_${Date.now()}.jpg`;

    // Specify the file path where you want to save the image
    const filePath = `${productImagePath}/${fileName}`;

    console.log(filePath);

    // Write the file buffer to the file
    fileBuffer && fs.writeFileSync(filePath, fileBuffer);
  });
