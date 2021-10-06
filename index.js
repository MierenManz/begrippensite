/// <reference lib="dom"/>

const toggle = {};

onload = () => {
  const keys = ["interweb", "hardware", "network", "cmds", "osi"];
  for (const val of keys) {
    const button = document.getElementById(val);
    button.onclick = async () => await eventHandler(val);
  }
};

async function eventHandler(emitter) {
  const displayCategory = !toggle[emitter];
  const node = document.getElementById(`display_${emitter}`);
  if (displayCategory) await showNode(node, emitter); //node.setAttribute("style", "display: flex");
  else await hideNode(node, emitter);
  // else node.removeAttribute("style");
  toggle[emitter] = displayCategory;
}

/**
  @param { Node } containerNode
 */
async function hideNode(containerNode, emitter) {
  const animationRing = [];
  const cat = document.getElementById(`cat_${emitter}`);
  const containerAnimation = containerNode.animate({
    transform: [
      "rotateY(0deg)",
      "rotateY(90deg)",
    ],
  }, 300);

  animationRing[0] = containerAnimation;

  for (const indx in cat.children) {
    const child = cat.children[indx];
    // Filter out non card nodes
    if (child.className !== "card") continue;

    const animation = child.animate({
      transform: [
        "translateY(0px) scaleY(1)",
        `translateY(-50%) scaleY(0)`,
      ],
    }, 300);
    animationRing[parseInt(indx) + 1] = animation;
  }
  await Promise.allSettled(animationRing.map((x) => {
    x.play();
    x.finished;
  }));

  await containerAnimation.finished;
  containerNode.removeAttribute("style");
}

async function showNode(containerNode, emitter) {
  const animationRing = [];
  const cat = document.getElementById(`cat_${emitter}`);
  const containerAnimation = containerNode.animate({
    transform: [
      "rotateY(90deg)",
      "rotateY(0deg)",
    ],
  }, 300);

  animationRing[0] = containerNode.setAttribute("style", "display: flex");
  animationRing[1] = containerAnimation;
  for (const indx in cat.children) {
    const child = cat.children[indx];
    // Filter out non card nodes
    if (child.className !== "card") continue;

    const animation = child.animate({
      transform: [
        "translateY(-50%) scaleY(0)",
        `translateY(0) scaleY(1)`,
      ],
    }, 200);
    animationRing[parseInt(indx) + 2] = animation;
  }
  await Promise.allSettled(animationRing.map((x) => {
    x?.play();
    x?.finished;
  }));

  await containerAnimation.finished;
}
