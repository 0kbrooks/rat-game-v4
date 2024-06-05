import { position } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
let mousePos = { x: 0, y: 0 };
function DropBox() {
  const [mouseOver, setMouseOver] = useState(false);
  var style = {
    display:"flex",
    flexDirection:"column",
    flexWrap:"wrap"
  }
  return (
    <>
    <div
      className={(mouseOver ? "dropBox mouseOver" : "dropBox")}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={style}
    >
      placeholder
    </div></>
  );
}
function DropItem() {
  const [dragging, setDragging] = useState(false);
  const [draggingIntervalId, setDraggingIntervalId] = useState();
  const [style, setStyle] = useState({
    position: "fixed",
    userSelect:"none",
  });
  function draggingPeriodic() {
    let newStyle = {};
    Object.assign(newStyle, style);
    newStyle.left = mousePos.x - 10 + "px";
    newStyle.top = mousePos.y - 10 + "px";
    setStyle(newStyle);
  }
  function mouseDownHandler(event) {
    setDragging(true);
    let newStyle = {};
    Object.assign(newStyle, style);
    newStyle.left = mousePos.x - 10 + "px";
    newStyle.top = mousePos.y - 10 + "px";
    setStyle(newStyle);
    if (!draggingIntervalId) {
      setDraggingIntervalId(setInterval(draggingPeriodic, 100));
    }
    event.target.style.position="absolute"
  }
  function mouseUpHandler(event) {
    setDragging(false);
    clearInterval(draggingIntervalId);
    setDraggingIntervalId(null);
    let oldElement = document.elementFromPoint(mousePos.x,mousePos.y)
    oldElement.remove()
    document.elementFromPoint(mousePos.x,mousePos.y).appendChild(oldElement)
    event.target.style.position="static"
  }
  return (
    <div
      style={style}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      className="penis"
    >
      placeholder text
    </div>
  );
}
async function afterLoad() {
  await new Promise((resolve) => window.addEventListener("load", resolve));
  document.addEventListener("pointermove", (event) => {
    mousePos = { x: event.clientX, y: event.clientY };
  });
}
afterLoad();
export default function App() {
  return (
    <div id="parend">
      <DropBox />
      <DropItem />
    </div>
  );
}
