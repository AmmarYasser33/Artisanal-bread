const fs = require("fs");
const path = require("path");

const rootPath = path.join(__dirname, "../", "uploads");
const usersPath = path.join(rootPath, "users");
const categoriesPath = path.join(rootPath, "categories");
const productsPath = path.join(rootPath, "products");

function ensureDirectories() {
  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath);
    console.log("Created uploads directory");
  }

  if (!fs.existsSync(usersPath)) {
    fs.mkdirSync(usersPath);
    console.log("Created users directory");
  }

  if (!fs.existsSync(categoriesPath)) {
    fs.mkdirSync(categoriesPath);
    console.log("Created categories directory");
  }

  if (!fs.existsSync(productsPath)) {
    fs.mkdirSync(productsPath);
    console.log("Created products directory");
  }
}

module.exports = ensureDirectories;
