import * as Snap from "snapsvg-cjs";

export default ({ object, startPoint, mouse }) => {
  let mapZpd = Snap("#map").select("g");
  let matrixTransform = mapZpd.transform().localMatrix.split();
  let mouseX, mouseY, clientX, clientY;

  mouseX = (mouse.x - matrixTransform.dx) / matrixTransform.scalex;
  mouseY = (mouse.y - matrixTransform.dy) / matrixTransform.scaley;

  clientX = (startPoint.clientX - matrixTransform.dx) / matrixTransform.scalex;
  clientY = (startPoint.clientY - matrixTransform.dy) / matrixTransform.scaley;

  return {
    ...object,
    x: mouseX - (clientX - startPoint.objectX),
    y: mouseY - (clientY - startPoint.objectY)
  };
};
