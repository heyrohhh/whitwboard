import { TextField, Radio, RadioGroup, FormControlLabel, ButtonGroup, Button } from '@mui/material';
import { useRef, useState } from 'react';
import Canvas from '../canvas';
import React from 'react';

const Roompage = ({user, socket,uuid}) => {
  const canvasref = useRef(null);
  const ctxref = useRef(null);
    console.log(user);
  const [tool, setTool] = useState("Pen");
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]); // List of drawn elements
  const [redoStack, setRedoStack] = useState([]); // Stack for undone elements to support redo

  // Handle undo
  const handleUndo = () => {
    if (elements.length === 0) return; // Nothing to undo

    const newElements = [...elements];
    const lastElement = newElements.pop(); // Remove the last element
    setElements(newElements); // Update elements with the undone state
    setRedoStack((prevRedoStack) => [...prevRedoStack, lastElement]); // Push the removed element to the redo stack
  };

  // Handle redo
  const handleRedo = () => {
    if (redoStack.length === 0) return; // Nothing to redo

    const newRedoStack = [...redoStack];
    const restoredElement = newRedoStack.pop(); // Get the last undone element
    setRedoStack(newRedoStack); // Update redo stack
    setElements((prevElements) => [...prevElements, restoredElement]); // Add the restored element back to the canvas
  };

  // Handle clear canvas
  const handleClearCanvas = () => {
    setElements([]); // Clear all elements
    setRedoStack([]); // Clear redo stack
  };

  return (
    <div style={{ width: "99vw", marginTop: "1%" }}>
      <h1 style={{ textAlign: "center" }}>
        White Board Sharing App
      </h1>

     
            <div style={{ marginTop: ".8rem", display: 'flex', justifyContent: "space-around", justifyItems: "center" }}>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Pen"
          name="radio-buttons-group"
        >
          <FormControlLabel value="Pen" control={<Radio />} onChange={(e) => setTool(e.target.value)} label="Pen" />
          <FormControlLabel value="Line" control={<Radio />} onChange={(e) => setTool(e.target.value)} label="Line" />
          <FormControlLabel value="Rectangle" control={<Radio />} onChange={(e) => setTool(e.target.value)} label="Rectangle" />
          <FormControlLabel value="Circle" control={<Radio />} onChange={(e) => setTool(e.target.value)} label="Circle" /> {/* New Circle Option */}
        </RadioGroup>

        <TextField
          sx={{ width: "10rem", borderRadius: "3px", height: "40%", marginTop: ".7%", marginLeft: "4%" }}
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />

        <ButtonGroup sx={{ gap: ".5rem", borderRadius: "3px", height: "40%", marginTop: ".7%", marginLeft: "4%" }}>
          <Button variant='contained' onClick={handleUndo}>Undo</Button>
          <Button variant='contained' color='secondary' onClick={handleRedo}>Redo</Button>
          <Button variant='contained' color='error' onClick={handleClearCanvas}>Clear Canvas</Button>
        </ButtonGroup>
      </div>
        
      
      

      <div>
        <Canvas canvasref={canvasref} ctxref={ctxref} elements={elements} setElements={setElements} tool={tool} color={color} />
      </div>
    </div>
  );
};

export default Roompage;