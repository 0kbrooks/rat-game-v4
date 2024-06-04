import { position } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
let mousePos = { x: 0, y: 0 };
function DropBox() {
  return <div className="dropBox">grough</div>;
}
function DropItem() {
  const [dragging, setDragging] = useState(false);
  const [draggingIntervalId, setDraggingIntervalId] = useState();
  const [mousePosX, setMousePosX] = useState(0);
  const [mousePosY, setMousePosY] = useState(0);
  const [style,setStyle] = useState({
    position:"absolute",
    top:"100px",
    left:"100px"
  })
  function draggingPeriodic(e) {
    if(dragging){
      
    }
  }
  function mouseDownHandler() {
    setDragging(true);
    if (!draggingIntervalId) {
      setDraggingIntervalId(setInterval(draggingPeriodic, 100));
    }
  }
  function mouseUpHandler() {
    setDragging(false);
    clearInterval(draggingIntervalId);
    setDraggingIntervalId(null);
  }
  return (
    <span
      style={style}
    >
      pegnis
    </span>
  );
}
async function afterLoad() {
  console.log('penis')
  await new Promise((resolve) => window.addEventListener("load", resolve))
  document.addEventListener("pointermove", (event) => {mousePos = {x:event.clientX,y:event.clientY};})
}
afterLoad()
export default function App() {
  return (
    <div id="parend">
      <DropBox />
      <DropItem />
    </div>
  );
}
