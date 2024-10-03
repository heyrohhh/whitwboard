import rough from 'roughjs';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import './index.css';

function Canvas({ canvasref, ctxref, elements, setElements, tool, color }) {
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null); // Store starting position

  useEffect(() => {
    const canvas = canvasref.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctxref.current = ctx;
      canvas.width = 1100;
      canvas.height = 450;
    }
  }, [canvasref, ctxref]);

  // Redraw the elements whenever 'elements' state changes
  useLayoutEffect(() => {
    const canvas = canvasref.current;
    const ctx = ctxref.current;

    if (canvas && ctx) {
      const roughCanvas = rough.canvas(canvas);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before redrawing

      elements.forEach((element) => {
        if (element.type === 'pencil') {
          roughCanvas.linearPath(element.path, { stroke: element.stroke });
        } else if (element.type === 'line') {
          roughCanvas.line(...element.start, ...element.end, { stroke: element.stroke });
        } else if (element.type === 'rectangle') {
          roughCanvas.rectangle(...element.start, element.width, element.height, { stroke: element.stroke });
        } else if (element.type === 'circle') {
          roughCanvas.circle(...element.center, element.radius * 2, { stroke: element.stroke }); // Draw the circle
        }
      });
    }
  }, [elements]);

  function handleMousedown(e) {
    const canvas = canvasref.current;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setDrawing(true);
    setStartPos({ x: startX, y: startY }); // Save the starting position

    if (tool === 'Pen') {
      setElements((prevElements) => [
        ...prevElements,
        { type: 'pencil', path: [[startX, startY]], stroke: color },
      ]);
    } else if (tool === 'Line') {
      setElements((prevElements) => [
        ...prevElements,
        { type: 'line', start: [startX, startY], end: [startX, startY], stroke: color },
      ]);
    } else if (tool === 'Rectangle') {
      setElements((prevElements) => [
        ...prevElements,
        { type: 'rectangle', start: [startX, startY], width: 0, height: 0, stroke: color },
      ]);
    } else if (tool === 'Circle') {
      setElements((prevElements) => [
        ...prevElements,
        { type: 'circle', center: [startX, startY], radius: 0, stroke: color }, // Initialize the circle
      ]);
    }
  }

  function handleMousemove(e) {
    if (!drawing) return;

    const canvas = canvasref.current;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      const lastElement = updatedElements[updatedElements.length - 1];

      if (tool === 'Pen') {
        lastElement.path = [...lastElement.path, [currentX, currentY]];
      } else if (tool === 'Line') {
        lastElement.end = [currentX, currentY];
      } else if (tool === 'Rectangle') {
        lastElement.width = currentX - lastElement.start[0];
        lastElement.height = currentY - lastElement.start[1];
      } else if (tool === 'Circle') {
        const [centerX, centerY] = lastElement.center;
        const radius = Math.sqrt(Math.pow(currentX - centerX, 2) + Math.pow(currentY - centerY, 2)); // Calculate radius
        lastElement.radius = radius; // Update the radius dynamically
      }

      return updatedElements;
    });
  }

  function handleMouseup() {
    setDrawing(false);
    setStartPos(null); // Clear starting position on mouse up
  }

  return (
    <canvas
      ref={canvasref}
      onMouseDown={handleMousedown}
      onMouseMove={handleMousemove}
      onMouseUp={handleMouseup}
      style={{ border: '1px solid black' }}
    ></canvas>
  );
}

export default Canvas;