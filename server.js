import express from "express";
import bodyParser from "body-parser";
import routes from "routes";

const app = express();
const port = parseInt(process.argv[2]) || process.env.PORT || 4242;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
