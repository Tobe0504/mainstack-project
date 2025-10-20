import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, "../../../public/images");
const outputFile = path.join(__dirname, "../../../src/utils/images.js");

function toKey(filename) {
  return filename
    .replace(path.extname(filename), "")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toUpperCase();
}

const files = fs
  .readdirSync(imagesDir)
  .filter((file) => /\.(png|jpe?g|svg|gif|webp)$/i.test(file));

const imagesObject = {};
files.forEach((file) => {
  imagesObject[toKey(file)] = `/images/${file}`;
});

const fileContent = `// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY
export const IMAGES = ${JSON.stringify(imagesObject, null, 2)};
`;

fs.writeFileSync(outputFile, fileContent, "utf8");
console.log(`Generated ${outputFile} with ${files.length} images.`);
