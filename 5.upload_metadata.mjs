import { NFTStorage } from "nft.storage";
import { filesFromPath } from "files-from-path";
import path from "path";
import * as fs from "fs";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUwMUY4RTVEQ2FFYkFlMjBhNTcwY0RFYjZmRTMzOTA2QzRhZjkwOEEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0Njk5MTE4OTU1NywibmFtZSI6ImZhbnRhc3RpYyJ9.RXZ-NGij1qFbGxpuGq4oyGtb5rLywF5UKc8c4C4eEZw";

async function main() {
  // you'll probably want more sophisticated argument parsing in a real app
  if (process.argv.length !== 3) {
    console.error(
      `usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`
    );
  }
  const directoryPath = process.argv[2];
  const files = filesFromPath(directoryPath, {
    pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  });

  const storage = new NFTStorage({ token });

  console.log(`storing file(s) from ${path}`);
  const cid = await storage.storeDirectory(files);
  const data = `const cid = "${cid}"\nmodule.exports = cid`;
  fs.writeFileSync("./output/metadata_cid.js", data);
  console.log({ cid });

  const status = await storage.status(cid);
  console.log(status);
}
main();
