const Product = require("../models/product");
const path = require("path");
const resourcesFolder = `${path.resolve(__dirname, "..")}/resources/`;

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      img: req.body.img,
      datasheet: req.body.datasheet,
      price: req.body.price,
    });

    res.status(200).json({
      message: "Product created",
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(
      products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        img: p.img,
        datasheet: p.datasheet,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getProductsWithPrice = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(
      products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        img: p.img,
        datasheet: p.datasheet,
        price: p.price,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const downloadProductDS = async (req, res) => {
  //const file = resourcesFolder + `temp/${req.params.id}.mp4`;
  const { ds } = req.params;
  const file = resourcesFolder + ds;
  console.log(file);
  res.download(file, (err) => {
    if (err)
      return res.status(400).json({
        error: "Something went wrong",
      });
  });
  console.log(file);
};

const downloadProductDSNoAuth = async (req, res) => {
  const { ds } = req.params;
  const file = resourcesFolder + ds;

  //   if (!email)
  //     return res.status(400).json({
  //       error: "Email not submitted",
  //     });

  res.download(file, (err) => {
    if (err)
      return res.status(400).json({ error: "Something wrong with file" });
    else console.log("Successful download");
  });
};

module.exports = {
  createProduct,
  getProducts,
  downloadProductDS,
  getProductsWithPrice,
  downloadProductDSNoAuth,
};
