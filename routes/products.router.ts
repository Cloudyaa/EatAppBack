import { Router } from 'express';
import { ProductRecord } from '../records';

export const productsRouter = Router();

productsRouter
  // get all products when empty string provided or search result
  .get('/search/:name?', async (req, res) => {
    const found = await ProductRecord.find(req.params.name ?? '');

    const products = found.map((product) => {
      return product;
    });

    if (products.length === 0) {
      res.status(404).json({
        status: res.statusCode,
        message: `No results were found matching ${req.params.name}`,
      });
    } else {
      res.status(200).json(products);
    }
  })

  // get bestselling products
  .get('/bestsellers', async (req, res) => {
    const products = await ProductRecord.getBestsellers();
    if (products === null) {
      res.status(404).json({
        status: res.statusCode,
        message: 'No best selling products were found yet',
      });
    } else {
      res.status(200).json(products);
    }
  })

  // get one product if productId is found
  .get('/:id', async (req, res) => {
    const product = await ProductRecord.getOne(req.params.id);
    if (product === null) {
      res.status(404).json({
        status: res.statusCode,
        message: `Cannot find product with id ${req.params.id}`,
      });
    } else {
      res.status(200).json(product);
    }
  });
