const { groupNumber, groupDivider } = require("./config");
const colors = require("./output/colors");
const cid = require("./output/img_cid");
const fs = require("fs");

async function main() {
  var dir = "./output/metadata";
  var start = groupNumber * groupDivider;

  console.log("[3] Generating metadata files...");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  try {
    colors.forEach((c, index) => {
      data = {
        name: `Color ${c}`,
        description: "Just a random color",
        external_link: "https://github.com/Aicl0ud",
        attributes: [
          {
            trait_type: "Red",
            value: hexToRgb(c).r,
          },
          {
            trait_type: "Green",
            value: hexToRgb(c).g,
          },
          {
            trait_type: "Blue",
            value: hexToRgb(c).b,
          },
        ],
        image: `ipfs://${cid}/${start + index}.png`,
        image_gateway: `https://nftstorage.link/ipfs/${cid}/${start +
          index}.png`,
      };
      fs.writeFileSync(
        `./output/metadata/${start + index}.json`,
        JSON.stringify(data)
      );
    });
    console.log("[3] Completed 🎉");
  } catch (e) {
    console.error(e);
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
