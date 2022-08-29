const { height, width, groupNumber, groupDivider } = require("./config");
const colors = require("./output/colors");
const fs = require("fs");
const { createCanvas } = require("canvas");

async function main() {
  var dir = "./output/img";
  var start = groupNumber * groupDivider;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  console.log("[2] Generating .png files...");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  try {
    colors.forEach((i, index) => {
      context.fillStyle = i;
      context.fillRect(0, 0, width, height);
      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync(
        `./output/img/${(start + index).toString()}.png`,
        buffer
      );
    });
    console.log("[2] Completed 🎉");
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
