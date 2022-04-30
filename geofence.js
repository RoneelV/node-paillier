const { PublicKey } = require('paillier-bigint');

async function findGeoFences(locx, locy, n, g) {
	const points = [
		{
			x: 10,
			y: 10,
		},
		{
			x: 300,
			y: 300,
		},
		{
			x: 380,
			y: 120,
		},
		{
			x: 150,
			y: 150,
		},
		{
			x: 180,
			y: 100,
		},
		{
			x: 200,
			y: 80,
		},
	]

	const publicKey = new PublicKey(n, g);

	const fences = points.map(({ x, y }) => ({
		t: publicKey.encrypt(-(y - 10)),
		b: publicKey.encrypt(-(y + 10)),
		l: publicKey.encrypt(-(x - 10)),
		r: publicKey.encrypt(-(x + 10)),
	}))

	const offsets = fences.map(({ t, b, l, r }) => ({
		t: publicKey.addition(t, locy),
		b: publicKey.addition(b, locy),
		l: publicKey.addition(l, locx),
		r: publicKey.addition(r, locx),
	}))

	return offsets;
}

module.exports = {
	findGeoFences: findGeoFences
};