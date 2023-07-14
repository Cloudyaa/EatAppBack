import { Router } from 'express';
import { ProductRecord } from '../../records';
import { ProductDTO } from '../../types';

export const manageProducts = Router();

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
  });
