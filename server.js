const express = require("express");
const JSONbig = require("json-bigint")({
  alwaysParseAsBig: true,
  useNativeBigInt: true,
});
const { calcOffsets } = require("./calcOffsets");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send(
    "Hello, anon! It seems you have reached this webpage, though I'm afraid you won't find it very useful."
  );
});

app.post("/locate", async (req, res) => {
  try {
    const { payload } = req.body;

    const { lat, lng, n, g } = JSONbig.parse(payload);

    const geofences = await calcOffsets(lat, lng, n, g);

    res.json({ offsetStr: JSONbig.stringify(geofences) });
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
