# TreeCanvas

TreeCanvas is a React-based project that visualizes hierarchical directory structures using D3.js. The visualization includes an interactive canvas and a minimap for easier navigation.

## Features

- Renders a hierarchical tree structure from `data.js`
- Supports zooming and panning
- Displays a minimap for better navigation
- Highlights nodes and links dynamically
- Uses D3.js for force simulation and interaction

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/tree-canvas.git
   cd tree-canvas
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure

```
├── src
│   ├── components
│   │   ├── TreeCanvas.jsx  # Main visualization component
│   ├── data.js            # Directory data
│   ├── App.jsx            # Root component
│   ├── index.js           # Entry point
├── public
├── index.html         # HTML template
├── package.json           # Project dependencies
├── README.md              # Project documentation
```

## Usage

- Modify `data.js` to update the directory structure.
- Click and drag on the canvas to pan.
- Use the minimap for quick navigation.
- Zoom in and out using the scroll wheel.

## Dependencies

- React
- D3.js
- react-monaco-editor

## License

This project is not licensed under the MIT License. Please refer to the project's repository or documentation for licensing details.

