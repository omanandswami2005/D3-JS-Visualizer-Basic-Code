// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { projectData } from "../data";
import MonacoEditor from "react-monaco-editor";
  
const TreeCanvas = () => {
  const canvasRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const root = d3.hierarchy(projectData);
    const treeLayout = d3.tree().size([width, height - 100]);
    treeLayout(root);

    let transform = d3.zoomIdentity;

    const drawGrid = () => {
      const gridSize = 50;
      context.strokeStyle = "#000";
      context.lineWidth = 0.5;

      for (let x = 0; x < width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    };

    const render = () => {
      context.save();
      context.clearRect(0, 0, width, height);
      context.translate(transform.x, transform.y);
      context.scale(transform.k, transform.k);
      drawGrid();

      context.strokeStyle = "#aaa";
      context.beginPath();
      root.links().forEach((link) => {
        context.moveTo(link.source.x, link.source.y);
        context.lineTo(link.target.x, link.target.y);
      });
      context.stroke();

      root.descendants().forEach((node) => {
        context.beginPath();
        context.arc(node.x, node.y, 5, 0, 2 * Math.PI);


        if (node.data.type === "file") {
          context.fillStyle = "rgba(102,255,153,0.6)"; // Light green for file nodes
          context.strokeStyle = selectedNode === node ? "#007bff" : "rgba(0,0,0,0.7)" ; // Border for selected and regular file nodes
          context.lineWidth = selectedNode === node ? 3 : 1; // Thicker for selected
          context.fill();
          context.stroke();
        } else {
            context.fillStyle = "#1f2937"; // Standard style for nodes that are not files
           context.fill();
        }
        context.closePath();

        context.fillStyle = "#374151";
        context.font = "12px sans-serif";
        context.textAlign = "center";
        context.fillText(node.data.name, node.x, node.y - 10);
      });

      context.restore();
    };

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])

      .on("zoom", (event) => {
        transform = event.transform;
        render();
      });

    d3.select(canvas).call(zoom);
    render();

    const handleClick = (event) => {
  const [mouseX, mouseY] = d3.pointer(event, canvasRef.current);
  console.log(mouseX, mouseY);

  let clickedNode = null;
  root.descendants().forEach((node) => {
      const distance = Math.sqrt(Math.pow(node.x - mouseX, 2) + Math.pow(node.y - mouseY, 2));
    const radius = 20;

    if (distance < radius) {
      clickedNode = node;
    }
  });
  if (clickedNode) {
      if (clickedNode.data.type === "file") {
          setSelectedFile(clickedNode.data);
          setSelectedNode(clickedNode);
        } else{
          setSelectedFile(null); // reset selected if clicked on a directory
          setSelectedNode(null);
        }
      
      render(); // Re-render with new click
  }
};

const handleMouseMove = (event) => {
    const [mouseX, mouseY] = d3.pointer(event, canvasRef.current);
    let isNodeHovered = false;
    root.descendants().forEach((node) => {
      const distance = Math.sqrt(Math.pow(node.x - mouseX, 2) + Math.pow(node.y - mouseY, 2));
      const radius = 20;

      if (distance < radius && node.data.type === "file") {
        isNodeHovered = true;
      }
    });
    canvasRef.current.style.cursor = isNodeHovered ? "pointer" : "default";
  };

canvasRef.current.addEventListener("click", handleClick);
canvasRef.current.addEventListener("mousemove", handleMouseMove);

return () => {
//   canvasRef.current.removeEventListener("click", handleClick);
//   canvasRef.current.removeEventListener("mousemove", handleMouseMove);

}
}, [selectedNode]); // Added selectedNode to dependecy array to re-render when the node is selected


  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="bg-gray-100"
      />

{selectedFile && (
    console.log(selectedFile),
  <div className="absolute top-10 left-10 bg-black shadow-lg border p-2">
    <h3 className="text-lg font-bold">{selectedFile.name}</h3>
    <MonacoEditor
      width="600"
      height="400"
      language="javascript"
      theme="vs-dark"
      value={selectedFile.content}
      onChange={(newValue) => {
        setSelectedFile({ ...selectedFile, content: newValue });
      }}
    />
  </div>
)}

    </div>
  );
};

export default TreeCanvas;
