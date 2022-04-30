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
	// const { x, y, n, g } = req.body;
	console.log(JSONbig.parse(req.body.reqdata));
	const geofences = await findGeoFences(x, y, n, g);
	console.log(JSONbig.parse(JSONbig.stringify(geofences)));
	res.json({ offsetStr: JSONbig.stringify(geofences) });
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});
