const fs = require("fs");
const path = require("path");

const rootPath = path.join(__dirname, "../", "uploads");
const usersPath = path.join(rootPath, "users");
const productsPath = path.join(rootPath, "products");
const coursesPath = path.join(rootPath, "courses");
const designsPath = path.join(rootPath, "designs");

function ensureDirectories() {
  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath);
    console.log("Created uploads directory");
  }

  if (!fs.existsSync(usersPath)) {
    fs.mkdirSync(usersPath);
    console.log("Created users directory");
  }

  if (!fs.existsSync(productsPath)) {
    fs.mkdirSync(productsPath);
    console.log("Created products directory");
  }

  if (!fs.existsSync(coursesPath)) {
    fs.mkdirSync(coursesPath);
    console.log("Created courses directory");
  }

  if (!fs.existsSync(designsPath)) {
    fs.mkdirSync(designsPath);
    console.log("Created designs directory");
  }
}

module.exports = ensureDirectories;
