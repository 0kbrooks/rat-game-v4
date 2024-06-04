import { position } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
let mousePos = { x: 0, y: 0 };
function DropBox() {
  const [mouseOver, setMouseOver] = useState(false)
  return <div className={mouseOver ? "dropBox mouseOver" : "dropBox"} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>grough</div>;
}
function DropItem() {
  const [dragging, setDragging] = useState(false);
  const [draggingIntervalId, setDraggingIntervalId] = useState();
  const [style,setStyle] = useState({
    position:"fixed",
    top:"100px",
    left:"100px"
  })
  function draggingPeriodic() {
    let newStyle = {}
    Object.assign(newStyle,style)
    newStyle.left = mousePos.x-10+"px"
    newStyle.top = mousePos.y-10+"px"
    setStyle(newStyle)
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
    for(let i of document.getElementsByClassName("dropBox")){
      console.log(i)
    }
  }
  return (
    <span
      style={style}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    >
      pegnis
    </span>
  );
}
async function afterLoad() {
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
