import { position } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
function DropBox() {
  return <div className="dropBox">penis</div>;
}
function DropItem() {
  const [dragging, setDragging] = useState(false);
  const [draggingIntervalId, setDraggingIntervalId] = useState();
  const [mousePosX, setMousePosX] = useState(0);
  const [mousePosY, setMousePosY] = useState(0);
  let t = "0px"
  function draggingPeriodic(e) {
    if(dragging){
      setMousePosX({ x: e.clientX, y: e.clientY });
      setMousePosY(e.clientY)
      t = mousePosY+'px'
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
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseMove={() => {draggingPeriodic(event)}}
      style={{position:"absolute",top:{t}}}
    >
      {mousePosY}
    </span>
  );
}
export default function App() {
  return (
    <div>
      <DropBox />
      <DropItem />
    </div>
  );
}
