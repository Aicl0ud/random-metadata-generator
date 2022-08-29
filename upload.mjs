import { NFTStorage } from "nft.storage";
import { filesFromPath } from "files-from-path";
import path from "path";
import * as fs from "fs";
require("dotenv").config();

const token = process.env.NFT_STORAGE_API;

async function main() {
  console.log("[IPFS] Uploading to IPFS...");

  // you'll probably want more sophisticated argument parsing in a real app
  if (process.argv.length !== 3) {
    console.error(
      `usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`
    );
  }
  const directoryPath = process.argv[2];
  const filename = directoryPath.split("/")[1] + "_cid";
  const files = filesFromPath(directoryPath, {
    pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  });

  const storage = new NFTStorage({ token });

  // console.log(`storing file(s) from ${path}`);
  const cid = await storage.storeDirectory(files);
  const data = `const cid = "${cid}"\nmodule.exports = cid`;
  fs.writeFileSync(`./output/${filename}.js`, data);
  console.log("[IPFS] Upload to IPFS successfully! 🎉");
  // console.log({ cid });

  // const status = await storage.status(cid);
  // console.log(status);
}
main();
