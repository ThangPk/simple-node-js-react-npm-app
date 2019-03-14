import * as Snap from "snapsvg-cjs";

export default ({ object, startPoint, mouse }) => {
  let mapZpd = Snap("#map").select("g");
  let matrixTransform = mapZpd.transform().localMatrix.split();
  let mouseX, mouseY;
  mouseX = (mouse.x - matrixTransform.dx) / matrixTransform.scalex;
  mouseY = (mouse.y - matrixTransform.dy) / matrixTransform.scaley;

  let angle = Math.atan2(
    startPoint.objectX + (object.width || 0) / 2 - mouseX,
    startPoint.objectY + (object.height || 0) / 2 - mouseY
  );

  let asDegree = (angle * 180) / Math.PI;
  let rotation = (asDegree + 45) * -1;

  return {
    ...object,
    rotate: rotation
  };
};
