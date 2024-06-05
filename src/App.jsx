import { position } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
let mousePos = { x: 0, y: 0 };
function DropBox(props) {
  const [mouseOver, setMouseOver] = useState(false);
  var style = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexJustify: "flex-start",
    alignItems: "flex-start",
    alightContent: "space-between",
    border: "3px dotted black",
    borderRadius: "10px",
    backgroundColor: "lightgray",
    minHeight: "1.5em",
  };
  return (
    <div
      style={{
        display: "inline",
        position: "static",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        <span
          style={{
            marginLeft: "30px",
            marginRight: "30px",
            alignSelf: "center",
            justifySelf: "flex-start",
          }}
        >
          <b>Rat Cage</b>
        </span>
        <div
          className={mouseOver ? "dropBox mouseOver" : "dropBox"}
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          style={style}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
function DropItem() {
  const [dragging, setDragging] = useState(false);
  const [draggingIntervalId, setDraggingIntervalId] = useState();
  const [style, setStyle] = useState({
    position: "static",
    userSelect: "none",
    border: "1px solid black",
    display: "inline-block",
    padding: "10px",
    backgroundColor: "lightgray",
    borderRadius: "10px",
    color: "pink",
    order: "2",
  });
  const commonBackgroundColors = ["#862d27", "#4d0f0f", "#322f2f", "#532323"];
  const rareBackgroundColors = ["#cfbebe"];
  const possibleBackgroundColors = commonBackgroundColors.concat(
    commonBackgroundColors,
    commonBackgroundColors,
    commonBackgroundColors,
    commonBackgroundColors,
    commonBackgroundColors,
    commonBackgroundColors,
    rareBackgroundColors,
  );
  function newBackgroundColor() {
    let grough = {};
    Object.assign(grough, style);
    grough.backgroundColor =
      possibleBackgroundColors[
        Math.floor(Math.random() * possibleBackgroundColors.length)
      ];
    if (grough.backgroundColor == "#cfbebe") {
      grough.color = "red";
    }
    setStyle(grough);
  }
  if (!possibleBackgroundColors.includes(style.backgroundColor)) {
    newBackgroundColor();
  } //*/
  function draggingPeriodic() {
    let newStyle = {};
    Object.assign(newStyle, style);
    newStyle.left = mousePos.x - 10 + "px";
    newStyle.top = mousePos.y - 10 + "px";
    setStyle(newStyle);
    /*for (let i of document
      .elementsFromPoint(mousePos.x, mousePos.y)) {
      let newHeight = (i.dragging="true" ? i.clientHeight : 0)
      if(i.classList.contains('dropBox')){
        i.style.height = (i.style.height ? parseInt(i.style.height) : 0)+newHeight + "px"
      }
    }*/
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
    event.target.style.position = "absolute";
  }
  function mouseUpHandler(event) {
    setDragging(false);
    clearInterval(draggingIntervalId);
    setDraggingIntervalId(null);
    let oldElement = document.elementFromPoint(mousePos.x, mousePos.y);
    let oldElementParent = oldElement.parentNode;
    oldElement.remove();
    if (
      document
        .elementFromPoint(mousePos.x, mousePos.y)
        .classList.contains("dropBox")
    ) {
      document.elementFromPoint(mousePos.x, mousePos.y).appendChild(oldElement);
      oldElement.classList.remove("error-animation");
    } else if (
      document
        .elementFromPoint(mousePos.x, mousePos.y)
        .parentNode.classList.contains("dropBox")
    ) {document.elementFromPoint(mousePos.x, mousePos.y).parentNode.appendChild(oldElement);
      oldElement.classList.remove("error-animation");
    } else {
      oldElementParent.appendChild(oldElement);
      oldElement.classList.add("error-animation");
    }
    event.target.style.position = "static";
  }
  return (
    <div
      style={style}
      onMouseDown={(event) => mouseDownHandler(event)}
      onMouseUp={(event) => mouseUpHandler(event)}
      className="dropItem"
      dragging={toString(dragging)}
    >
      rat
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
    <div id="parend" className="dropBox">
      <DropBox>
        <DropItem />
        <DropItem />
        <DropItem />
        <DropItem />
        <DropItem />
        <DropItem />
        <DropItem />
        <DropItem />
        <DropItem />
        <DropItem />
        <DropItem />
        <DropItem />
      </DropBox>
      <DropItem />
      <DropItem />
      <DropItem />
    </div>
  );
}
