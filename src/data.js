export const projectData = {
    name: "mern-project",
    type: "folder",
    children: [
      { name: "package.json", type: "file", content: "{...}" },
      { name: "server.js", type: "file", content: "const express = require('express');" },
      {
        name: "client",
        type: "folder",
        children: [
          { name: "index.html", type: "file", content: "<html>...</html>" },
          { name: "App.js", type: "file", content: "function App() { return <h1>Hello</h1> }" },
        ],
      },
      {
        name: "server",
        type: "folder",
        children: [
          { name: "routes", type: "folder", children: [{ name: "api.js", type: "file", content: "export default ..." }] },
          { name: "models", type: "folder", children: [{ name: "User.js", type: "file", content: "const mongoose = ..." }] },
        ],
      },
    ],
  };
  