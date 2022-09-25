import {paintGraph} from "./modules/printGraph.js";

const btnShowWeightedGraph = document.getElementById("btn-show-weighted-graph");
const weightedGraphRow = document.getElementById("weighted-graph-row");
const matrixBlockForGraph = document.getElementById("weighted-graph-block");

btnShowWeightedGraph.addEventListener("click", showGraphContent);

function showGraphContent() {
  let containerWithElements = document.getElementById("weighted-graph-matrix");
  if (!containerWithElements) {
    showMatrixForGraph();
    createCanvas();
    createButtonWithGraphResult();
    return;
  }
  containerWithElements.remove();
  let fieldWithCanvas = document.getElementById("canvasForPrint");
  let resultBtn = document.getElementById("btn-show-graph-result");
  resultBtn.remove();
  fieldWithCanvas.remove();
  showMatrixForGraph();
  createCanvas();
  createButtonWithGraphResult();
}

function createEndPoint() {
  const weightedGraphMatrix = document.getElementById("weighted-graph-matrix");
  const divEndPoint = document.createElement("div");
  divEndPoint.textContent = "Введите конечную точку ";
  const endPoint = document.createElement("select");
  endPoint.id = "select-end";
  for (let i = 0; i < weightedGraphRow.value; i++) {
    const option = document.createElement("option");
    option.id = "end";
    option.value = `${i}`;
    option.text = `${i}`;
    endPoint.appendChild(option);
  }
  divEndPoint.appendChild(endPoint);
  weightedGraphMatrix.appendChild(divEndPoint);
}

function createStartPoint() {
  const weightedGraphMatrix = document.getElementById("weighted-graph-matrix");
  const divStartPoint = document.createElement("div");
  divStartPoint.textContent = "Введите начальную точку ";
  const startPoint = document.createElement("select");
  startPoint.id = "select-start";
  for (let i = 0; i < weightedGraphRow.value; i++) {
    const option = document.createElement("option");
    option.id = "start";
    option.value = `${i}`;
    option.text = `${i}`;
    startPoint.appendChild(option);
  }
  divStartPoint.appendChild(startPoint);
  weightedGraphMatrix.appendChild(divStartPoint);
}

function getStartValue() {
  const selectStartValue = document.getElementById("select-start");
  return selectStartValue.value;
}

function getEndValue() {
  const selectStartValue = document.getElementById("select-end");
  return selectStartValue.value;
}

function createButtonWithGraphResult() {
  const resultButton = document.createElement("button");
  resultButton.id = "btn-show-graph-result";
  resultButton.className = "btn-show-result";
  resultButton.textContent = "Вывести результат";
  matrixBlockForGraph.appendChild(resultButton);
  resultButton.addEventListener("click", shortestPathInGraph);
}

function fieldWithAnswer() {
  const resultDiv = document.createElement("div");
  resultDiv.textContent = "Кратчайший путь равен:";
  resultDiv.id='result-of-graph';
  const resultSpan = document.createElement("span");
  resultSpan.id = "answer-for-graph";
  resultSpan.className = "answer-for-graph";
  resultDiv.appendChild(resultSpan);
  matrixBlockForGraph.appendChild(resultDiv);
}

function shortestPathInGraph() {
  let arrFromMatrix = [].map.call(
    document.querySelectorAll(".inputBlock-in-matrix"),
    function (block) {
      return [].map.call(
        block.querySelectorAll(".graph-matrix-input"),
        function (input) {
          return Number(input.value);
        }
      );
    }
  );

  if (checkMatrixForSymmetry(arrFromMatrix)===false){
    invalidMatrix();
    fieldWithAnswer();
  }else {
    paintGraph(arrFromMatrix);
    let start = Number(getStartValue());
    let end = Number(getEndValue());
    fieldWithAnswer();
    dijkstraAlgorithm(start, end, arrFromMatrix, true);
  }
}
function invalidMatrix(){
  const divIfInvalidMatrix=document.createElement('div');
  divIfInvalidMatrix.id='invalidMatrix';
  divIfInvalidMatrix.textContent='Матрица не симметрична, попробуйте ещё раз'
  const block=document.getElementById('weighted-graph-matrix');
  block.appendChild(divIfInvalidMatrix);
}

function checkMatrixForSymmetry(matrix){
  for(let i=0;i<matrix.length;i++){
    for (let j=0;j<matrix.length;j++){
      if (matrix[i][j] !== matrix[j][i])
        return false;
    }
    return true;
  }
}

function createCanvas() {
  let divWithCanvas = document.createElement("div");
  divWithCanvas.id = "canvasForPrint";
  divWithCanvas.className = "canvasForPrint";
  matrixBlockForGraph.appendChild(divWithCanvas);
}

function showMatrixForGraph() {
  const textNode = document.createTextNode("Матрица должна быть симметричной");
  const matrixWeightedGraph = document.createElement("div");
  matrixWeightedGraph.id = "weighted-graph-matrix";
  matrixBlockForGraph.appendChild(matrixWeightedGraph);
  matrixWeightedGraph.appendChild(textNode);
  const divForLabelsX2 = document.createElement("div");
  for (let i = 0; i < weightedGraphRow.value; i++) {
    const labelsForMatrix2 = document.createElement("span");
    labelsForMatrix2.id = "matrix-label-X-2";
    labelsForMatrix2.className = "matrix-label-X-2";
    labelsForMatrix2.textContent = `${i}`;
    divForLabelsX2.appendChild(labelsForMatrix2);
  }
  matrixWeightedGraph.appendChild(divForLabelsX2);

  for (let i = 0; i < weightedGraphRow.value; i++) {
    let inputBlock = document.createElement("div");
    inputBlock.className = "inputBlock-in-matrix";
    let matrixLabel = document.createElement("span");
    matrixLabel.innerHTML = `${i}`;
    inputBlock.appendChild(matrixLabel);

    for (let j = 0; j < weightedGraphRow.value; j++) {
      let newInput = document.createElement("input");
      newInput.className = "graph-matrix-input";
      inputBlock.appendChild(newInput);
    }
    matrixWeightedGraph.appendChild(inputBlock);
  }
  createStartPoint();
  createEndPoint();
}

function dijkstraAlgorithm(startPoint, endPoint, matrix, showLog = false) {
  let nodes = [[]];
  let currentPoint = startPoint;
  let nextPoint = [null, Infinity];
  let distanceWeight = [];

  for (let i = 0; i < matrix.length; i++) {
    distanceWeight[i] = {visited: false, weight: Infinity, path: null, route: []};
  }

  distanceWeight[currentPoint].visited = true;
  distanceWeight[currentPoint].weight = 0;

  for (let i = 0; i < matrix.length; i++) {
    if (i !== 0) nodes.push([]);
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] !== 0) {
        nodes[nodes.length - 1].push([j, matrix[i][j]]);
      }
    }
  }

  while (true) {
    nodes[currentPoint].forEach(function (node) {
      if (!distanceWeight[node[0]].visited) {

        if (distanceWeight[node[0]].weight > node[1] + distanceWeight[currentPoint].weight) {
          distanceWeight[node[0]].weight = node[1] + distanceWeight[currentPoint].weight;
          distanceWeight[node[0]].path = currentPoint;
        } else if (nextPoint[1] > node[1] + distanceWeight[currentPoint].weight) {
          nextPoint[0] = node[0];
          nextPoint[1] = node[1] + distanceWeight[currentPoint].weight;
        }
      }
    });

    if (nextPoint[0] == null) {
      for (let i = 0; i < distanceWeight.length; i++) {
        if (!distanceWeight[i].visited) {
          let tempNode = [null, Infinity];

          for (let i = 0; i < distanceWeight.length; i++) {
            if (
              !distanceWeight[i].visited &&
              distanceWeight[i].weight !== Infinity &&
              distanceWeight[i].weight < tempNode[1]
            ) {
              tempNode[0] = i;
              tempNode[1] = distanceWeight[i].weight;
            }
          }
          if (tempNode[0] != null) {
            distanceWeight[tempNode[0]].visited = true;
            nextPoint[0] = tempNode[0];
            break;
          }
        }
      }

      if (nextPoint[0] == null) {
        for (let i = 0; i < distanceWeight.length; i++) {
          let x = 0;
          if (!(distanceWeight[i].path == null)) {
            distanceWeight[i].route.push(i);
            x = distanceWeight[i].path;
            while (!(distanceWeight[x].path == null)) {
              distanceWeight[i].route.push(x);
              x = distanceWeight[x].path;
            }
            distanceWeight[i].route.push(x);
            distanceWeight[i].route.reverse();
          }
        }

        if (showLog) {
          let result = distanceWeight[endPoint].weight;
          let route = distanceWeight[endPoint].route;
          if (route.length !== 0) {
            document.querySelector(".answer-for-graph").innerHTML = result;
          } else {
            noWayInGraph(startPoint,endPoint);
          }
        }
        return distanceWeight;
      }
    }
    if (nextPoint[1] < distanceWeight[nextPoint[0]].weight) {
      distanceWeight[nextPoint[0]].weight = nextPoint[1];
      distanceWeight[nextPoint[0]].path = currentPoint;
    }
    currentPoint = nextPoint[0];
    distanceWeight[currentPoint].visited = true;
    nextPoint = [null, Infinity];
  }
}
function noWayInGraph(start,end){
  const divWithFalseAnswer=document.createElement('div');
  divWithFalseAnswer.textContent=`Нет пути между точками ${start} и ${end}`;
  const block=document.getElementById('weighted-graph-block');
  block.appendChild(divWithFalseAnswer);
}