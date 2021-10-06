/// <reference lib="dom"/>

const toggle = {};
onload = () => {
  const keys = ["interweb", "hardware", "network", "cmds", "osi"];
  for (const val of keys) {
    const button = document.getElementById(val);
    button.onclick = () => eventHandler(val);
  }
};

function eventHandler(emitter) {
  const displayCategory = !toggle[emitter];
  const node = document.getElementById(`display_${emitter}`);
  if (displayCategory) node.setAttribute("style", "display: flex");
  else node.removeAttribute("style");
  toggle[emitter] = displayCategory;
}

// /**
//   @param { Node } node
//  */
// function hideNode(node) {
//   const animation = node.animate();
//   animation.play();
//   node.removeAttribute("style");
// }
