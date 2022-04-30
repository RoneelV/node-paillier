const express = require('express')
const JSONbig = require('json-bigint')
const { findGeoFences } = require('./geofence');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/location", async (req, res) => {
	const { x, y, n, g } = req.body;
	const geofences = await findGeoFences(BigInt(x), BigInt(y), BigInt(n), BigInt(g));
	res.json({ offsets: JSONbig.stringify(geofences) });
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});
