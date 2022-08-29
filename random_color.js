const { groupNumber, groupDivider } = require("./config");
const fs = require("fs");

async function main() {
  var dir = "./output";
  var json = ``;
  var start = groupNumber * groupDivider;
  var stop = start + groupDivider;

  console.log("[1] Generating color...");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  try {
    for (let i = start; i < stop; i++) {
      if (i == start) {
        json += "[ ";
      }

      let colorCode = Math.floor(Math.random() * 16777215).toString(16);
      if (colorCode.toString().length < 6) {
        colorCode =
          colorCode.toString() + "0".repeat(6 - colorCode.toString().length);
      }
      json += `"#${colorCode}",`;
      // console.log(json);

      if (i == stop - 1) {
        json += " ]";
      }

      let data = JSON.stringify(
        `const colors = ${json}\nmodule.exports = colors;`
      );
      fs.writeFileSync("./output/colors.js", JSON.parse(data));
    }
    console.log("[1] Completed 🎉");
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
