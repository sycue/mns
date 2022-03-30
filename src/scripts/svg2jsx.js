const fs = require("fs");
const path = require("path");
const svgtojsx = require("svg-to-jsx");

const dir = path.join(__dirname, "../assets/FlatWeb");

function readSvgFormFile(filename) {
  if (filename.endsWith(".svg")) {
    const data = fs.readFileSync(filename);
    return data;
  }
  return null;
}

function exportJsxForDirectory(directory) {
  const fileList = fs.readdirSync(directory);
  console.info("Looking for svg files in: " + directory);
  fileList.forEach((filename) => {
    var svg = readSvgFormFile(path.join(directory, filename));
    if (svg !== null) {
      var jsxFile = path.join(directory, filename.replace(/svg/g, "js"));
      svgtojsx(svg).then(function (jsx) {
        fs.writeFileSync(jsxFile, generateJsxFile(jsx));
        console.info("JSX generated and output file wrote to: " + jsxFile);
      });
    }
  });
}

function generateJsxFile(jsx) {
  // <svg id="24314328" viewBox="0 0 700 600" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
  // const jsxData = jsx.replace(/<svg/g, "<Icon");
  const data = `export default function Illustration(props) {
  return (
${jsx}
  );
}`;

  return data;
}

function main() {
  fs.stat(dir, (err, stats) => {
    if (!err && stats.isDirectory()) {
      exportJsxForDirectory(dir);
    } else {
      console.error(err);
    }
  });
}

main();
