const { PublicKey } = require("paillier-bigint");
let geobases = require("./mapbases.json");

const latMultiplier = -1e15;
const randMultiplier = 1e9;

let bases = geobases.features.map((base) => {
  let coords = base.geometry.coordinates[0];

  return {
    name: base.properties.name,
    // return coordinates of the opposite corners of the rectangle
    // converted to integer, negated

    corners: [
      {
        lng: BigInt(Math.ceil(coords[0][0] * latMultiplier)),
        lat: BigInt(Math.ceil(coords[0][1] * latMultiplier)),
      },
      {
        lng: BigInt(Math.ceil(coords[2][0] * latMultiplier)),
        lat: BigInt(Math.ceil(coords[2][1] * latMultiplier)),
      },
    ],
  };
});

/**
 *
 * @param {bigint} lat
 * @param {bigint} lng
 * @param {bigint} n
 * @param {bigint} g
 * @returns
 */
async function calcOffsets(lat, lng, n, g) {
  const publicKey = new PublicKey(n, g);

  let offsets = bases
    .filter((base) => base.name != "Outer Bound")
    .map(({ name, corners }) => {
      return {
        name,
        lat1: publicKey.multiply(
          publicKey.plaintextAddition(lat, corners[0].lat),
          Math.ceil(Math.random() * randMultiplier)
        ),
        lng1: publicKey.multiply(
          publicKey.plaintextAddition(lng, corners[0].lng),
          Math.ceil(Math.random() * randMultiplier)
        ),
        lat2: publicKey.multiply(
          publicKey.plaintextAddition(lat, corners[1].lat),
          Math.ceil(Math.random() * randMultiplier)
        ),
        lng2: publicKey.multiply(
          publicKey.plaintextAddition(lng, corners[1].lng),
          Math.ceil(Math.random() * randMultiplier)
        ),
      };
    });

  return offsets;
}

module.exports = {
  calcOffsets,
};
