import {createEndPointX, createEndPointY, createStartPointX, createStartPointY,} from "./modules/createPoints.js";

const selectWithOptions = document.getElementById("select");
const adjacencyMatrix = document.getElementById("adjacency-matrix");
const weightedGraph = document.getElementById("weighted-graph");

selectWithOptions.addEventListener("change", function handleChange(event) {
  if (event.target.value === "adjacency-matrix") {
    adjacencyMatrix.style.display = "block";
  } else {
    adjacencyMatrix.style.display = "none";
  }
  if (event.target.value === "weighted-graph") {
    weightedGraph.style.display = "block";
  } else {
    weightedGraph.style.display = "none";
  }
});

const btnShowAdjacencyMatrix = document.getElementById("btn-show-adjacency-matrix");
const matrix1Row = document.getElementById("adjacency-matrix-row");
const matrix1Col = document.getElementById("adjacency-matrix-col");
const adjacencyMatrixBlock = document.getElementById("adjacency-matrix-block");

btnShowAdjacencyMatrix.addEventListener("click", showInformation);

function showInformation() {
  document.oninput = function () {
    let input = document.querySelector('.matrix-input');
    input.value = input.value.replace(/[^0-1.]/g, '');
  }
  let containerWithElements = document.getElementById("matrix-field");
  if (!containerWithElements) {
    showMatrix();
    createStartPointX();
    createStartPointY();
    createEndPointX();
    createEndPointY();
    showResultButton();
    return;
  }
  containerWithElements.remove();
  showMatrix();
  createStartPointX();
  createStartPointY();
  createEndPointX();
  createEndPointY();
  showResultButton();
}

function showMatrix() {
  const matrixField = document.createElement("div");
  matrixField.id = "matrix-field";
  adjacencyMatrixBlock.appendChild(matrixField);
  const divForLabelsX = document.createElement("div");

  for (let i = 0; i < matrix1Col.value; i++) {
    const labelsForMatrix = document.createElement("span");
    labelsForMatrix.id = "matrix-label-X";
    labelsForMatrix.className = "matrix-label-X";
    labelsForMatrix.textContent = `${i}`;
    divForLabelsX.appendChild(labelsForMatrix);
  }
  matrixField.appendChild(divForLabelsX);

  for (let i = 0; i < matrix1Row.value; i++) {
    let inputBlock = document.createElement("div");
    inputBlock.className = "inputBlock";
    let matrixLabelY = document.createElement("span");
    matrixLabelY.innerHTML = `${i}`;
    inputBlock.appendChild(matrixLabelY);

    for (let j = 0; j < matrix1Col.value; j++) {
      let newInput = document.createElement("input");
      newInput.className = "matrix-input";
      newInput.maxLength = 1;
      inputBlock.appendChild(newInput);
    }
    matrixField.appendChild(inputBlock);
  }
}

function showResultButton() {
  const resultButton = document.createElement("button");
  resultButton.id = "btn-show-result";
  resultButton.className = "btn-show-result";
  resultButton.textContent = "Вывести результат";
  let matrixField = document.getElementById('matrix-field');
  matrixField.appendChild(resultButton);

  resultButton.addEventListener("click", showShortestPath);
}

function createFieldWithAnswer() {
  const divForResult = document.createElement("div");
  divForResult.textContent = "Кратчайший путь равняется:";
  const spanWithResult = document.createElement("span");
  spanWithResult.id = "answer";
  spanWithResult.className = "answer";
  divForResult.appendChild(spanWithResult);
  adjacencyMatrixBlock.appendChild(divForResult);
}

function getValueOfStartPointX() {
  const select = document.getElementById("select-start-point-x");
  return select.value;
}

function getValueOfStartPointY() {
  const select = document.getElementById("select-start-point-y");
  return select.value;
}

function getValueOfEndPointX() {
  const select = document.getElementById("select-end-point-x");
  return select.value;
}

function getValueOfEndPointY() {
  const select = document.getElementById("select-end-point-Y");
  return select.value;
}

function showShortestPath() {
  createFieldWithAnswer();
  let arrayFromMatrix = [].map.call(
    document.querySelectorAll(".inputBlock"),
    function (block) {
      return [].map.call(
        block.querySelectorAll(".matrix-input"),
        function (input) {
          return Number(input.value);
        }
      );
    }
  );

  function findShortestPath(labyrinth, exit, finalPoint) {
    const checkNode = (point) => {
      return !(!point || !Number.isInteger(point.row) || point.row < 0 || !Number.isInteger(point.col) || point.col < 0);
    };

    if (!labyrinth || !Array.isArray(labyrinth) || !Array.isArray(labyrinth[0]) || !checkNode(exit) || !checkNode(finalPoint)) {
      return null;
    }

    const isEqual = (point1, point2) => {
      return point1.row === point2.row && point1.col === point2.col;
    };

    if (isEqual(exit, finalPoint)) {
      return 0;
    }

    const rowNumber = [-1, 0, 1, 0];
    const colNumber = [0, 1, 0, -1];
    const nodeProto = (row, col, dist = 0) => {
      return {row, col, dist};
    };
    let q = [];
    let visitedNode = new Set();

    exit.dist = 0;
    q.push(exit);

    while (q.length > 0) {
      let node = q.shift();
      if (isEqual(node, finalPoint)) {
        return node.dist;
      }

      for (let i = 0; i < 4; i++) {
        let row = rowNumber[i] + node.row;
        let col = colNumber[i] + node.col;
        if (
          row < 0 ||
          row > arrayFromMatrix.length - 1 ||
          col < 0 ||
          col > arrayFromMatrix[0].length - 1
        ) {
          continue;
        }
        let _node = nodeProto(row, col, node.dist + 1);
        if (
          arrayFromMatrix[row][col] === 1 &&
          !visitedNode.has(_node.row.toString() + _node.col.toString())
        ) {
          visitedNode.add(_node.row.toString() + _node.col.toString());
          q.push(_node);
        }
      }
    }
  }

  const startPointX = Number(getValueOfStartPointX());
  const startPointY = Number(getValueOfStartPointY());
  const endPointX = Number(getValueOfEndPointX());
  const endPointY = Number(getValueOfEndPointY());

  document.querySelector(".answer").innerHTML = findShortestPath(
    arrayFromMatrix,
    {row: startPointY, col: startPointX},
    {row: endPointY, col: endPointX }
  );
}

export {matrix1Row, matrix1Col};