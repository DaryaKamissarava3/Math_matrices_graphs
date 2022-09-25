import { matrix1Row, matrix1Col } from "../firstMatrix.js";

function createStartPointX() {
  const matrixField = document.getElementById("matrix-field");
  const divForStartXPoint = document.createElement("div");
  divForStartXPoint.textContent = "Введите начальную точку по X";
  const startPointX = document.createElement("select");
  startPointX.id = "select-start-point-x";
  for (let i = 0; i < matrix1Col.value; i++) {
    const option = document.createElement("option");
    option.id = "start-x-point";
    option.value = `${i}`;
    option.text = `${i}`;
    startPointX.appendChild(option);
  }
  divForStartXPoint.appendChild(startPointX);
  matrixField.appendChild(divForStartXPoint);
}

function createEndPointX() {
  const matrixField = document.getElementById("matrix-field");
  const divForEndPointX = document.createElement("div");
  divForEndPointX.textContent = "Введите конечную точку по X";
  const endPointX = document.createElement("select");
  endPointX.id = "select-end-point-x";
  for (let i = 0; i < matrix1Col.value; i++) {
    const option = document.createElement("option");
    option.id = "end-x-point";
    option.value = `${i}`;
    option.text = `${i}`;
    endPointX.appendChild(option);
  }
  divForEndPointX.appendChild(endPointX);
  matrixField.appendChild(divForEndPointX);
}

function createStartPointY() {
  const matrixField = document.getElementById("matrix-field");
  const divForStartPointY = document.createElement("div");
  divForStartPointY.textContent = "Введите начальную точку по Y";
  const startPointY = document.createElement("select");
  startPointY.id = "select-start-point-y";
  for (let i = 0; i < matrix1Row.value; i++) {
    const option = document.createElement("option");
    option.id = "start-y-point";
    option.value = `${i}`;
    option.text = `${i}`;
    startPointY.appendChild(option);
  }
  divForStartPointY.appendChild(startPointY);
  matrixField.appendChild(divForStartPointY);
}

function createEndPointY() {
  const matrixField = document.getElementById("matrix-field");
  const divForEndPointY = document.createElement("div");
  divForEndPointY.textContent = "Введите конечную точку по Y";
  const endPointY = document.createElement("select");
  endPointY.id = "select-end-point-Y";
  for (let i = 0; i < matrix1Row.value; i++) {
    const option = document.createElement("option");
    option.id = "end-y-point";
    option.value = `${i}`;
    option.text = `${i}`;
    endPointY.appendChild(option);
  }
  divForEndPointY.appendChild(endPointY);
  matrixField.appendChild(divForEndPointY);
}

export {
  createStartPointX,
  createStartPointY,
  createEndPointX,
  createEndPointY,
};
