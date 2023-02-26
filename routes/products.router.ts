import { Router } from 'express';
import { ProductRecord } from '../records/product.record';

export const productsRouter = Router();

productsRouter
  // get all products when empty string provided
  .get('/search/:name?', async (req, res) => {
    const found = await ProductRecord.find(req.params.name ?? '');

    const products = found.map((product) => {
      return {
        ...product,
        qtyInBasket: 0, // req.body.qtyInBasket??
      };
    });

    if (products.length === 0) {
      res.json(`No results were found matching ${req.params.name}`);
    } else {
      res.json(products);
    }
  })

  // get one product if id is found
  .get('/:id', async (req, res) => {
    const product = await ProductRecord.getOne(req.params.id);
    if (product === null) {
      res.json(`Cannot find product with id ${req.params.id}`);
    } else {
      res.json(product);
    }
  })

  // send data from FE to db
  .post('/', async (req, res) => {
    const product = new ProductRecord(req.body);
    await product.insert();
    res.json(product);
  });
