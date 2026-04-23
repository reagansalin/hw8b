const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

let articles = [
  { id: 1, title: "Learning Express" },
  { id: 2, title: "Web Servers with Node.js" },
  { id: 3, title: "HTML Forms and Routes" }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "css")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "ex1.html"));
});

app.post("/submit", (req, res) => {
  const { name, email } = req.body;
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Confirmation</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div class="container">
    <h1>Form Submitted</h1>
    <div class="card">
      <p><strong>Name:</strong> ${escapeHtml(name || "")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || "")}</p>
      <a class="button-link" href="/form">Back to Form</a>
      <a class="button-link secondary" href="/">Home</a>
    </div>
  </div>
</body>
</html>`);
});

app.get("/ex2", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "ex2.html"));
});

app.post("/api/countries", (req, res) => {
  const name = req.body.name || "Traveler";
  const countries = Array.isArray(req.body.countries) ? req.body.countries : [];
  const count = countries.length;

  res.json({
    message: `${name} visited ${count} countr${count === 1 ? "y" : "ies"}.`
  });
});

app.get("/ex3", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "ex3.html"));
});

app.post("/articles", (req, res) => {
  const title = (req.body.title || "").trim();

  if (!title) {
    return res.status(400).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Article Error</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div class="container">
    <h1>Article Error</h1>
    <div class="card">
      <p>Please enter an article title.</p>
      <a class="button-link" href="/ex3">Back</a>
    </div>
  </div>
</body>
</html>`);
  }

  const maxId = Math.max(...articles.map((article) => article.id));
  const newId = maxId + 1;
  const newArticle = { id: newId, title };
  articles.push(newArticle);

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Article Added</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div class="container">
    <h1>Article Added</h1>
    <div class="card">
      <p><strong>Title:</strong> ${escapeHtml(title)}</p>
      <p><strong>ID:</strong> ${newId}</p>
      <a class="button-link" href="/ex3">Add Another Article</a>
      <a class="button-link secondary" href="/">Home</a>
    </div>
  </div>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
