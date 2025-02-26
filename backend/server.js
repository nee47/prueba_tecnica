require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const path = require("path");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  })
);

app.use("/resources", express.static(path.join(__dirname, "resources")));
app.use(userRouter);
app.use(productRouter);

app.listen(port, () => {
  console.log(`Prueba tecnica app listening on port ${port}`);
});
