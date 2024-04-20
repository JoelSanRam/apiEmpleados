import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to my first API with Node js!");
});

app.get("/employees", (req, res) => {
  const data = readData();
  res.json(data.employees);
});

app.get("/employees/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const book = data.employees.find((book) => book.id === id);
  res.json(book);
});

app.post("/employees", (req, res) => {
  const data = readData();
  const body = req.body;
  const newBook = {
    id: data.employees.length + 1,
    ...body,
  };
  data.employees.push(newBook);
  writeData(data);
  res.json(newBook);
});

app.put("/employees/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const bookIndex = data.employees.findIndex((book) => book.id === id);
  data.employees[bookIndex] = {
    ...data.employees[bookIndex],
    ...body,
  };
  writeData(data);
  res.json({ message: "Book updated successfully" });
});

app.delete("/employees/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const bookIndex = data.employees.findIndex((book) => book.id === id);
  data.employees.splice(bookIndex, 1);
  writeData(data);
  res.json({ message: "Book deleted successfully" });
});

app.listen(3002, () => {
  console.log("Server listening on port 3002");
});
