import {paintGraph} from "./modules/printGraph.js";

const btnShowMatrix2 = document.getElementById("btn-show-weighted-graph");
const matrix2Row = document.getElementById("weighted-graph-row");
const matrix2Block = document.getElementById("weighted-graph-block");

btnShowMatrix2.addEventListener("click", showInformation2);

function showInformation2() {
  let containerWithElements = document.getElementById("matrix-field-2");
  if (!containerWithElements) {
    showMatrix2();
    createCanvas();
    showResultButton2();
    return;
  }
  containerWithElements.remove();
  let fieldWithCanvas = document.getElementById("mynetwork");
  let resultBtn = document.getElementById("btn-show-result-2");
  resultBtn.remove();
  fieldWithCanvas.remove();
  showMatrix2();
  createCanvas();
  showResultButton2();
}

function createEndPoint() {
  const matrixField2 = document.getElementById("matrix-field-2");
  const divEndPoint = document.createElement("div");
  divEndPoint.textContent = "Enter end point ";
  const endPoint = document.createElement("select");
  endPoint.id = "select-end";
  for (let i = 0; i < matrix2Row.value; i++) {
    const option = document.createElement("option");
    option.id = "end";
    option.value = `${i}`;
    option.text = `${i}`;
    endPoint.appendChild(option);
  }
  divEndPoint.appendChild(endPoint);
  matrixField2.appendChild(divEndPoint);
}

function createStartPoint() {
  const matrixField2 = document.getElementById("matrix-field-2");
  const divStartPoint = document.createElement("div");
  divStartPoint.textContent = "Введите начальную точку ";
  const startPoint = document.createElement("select");
  startPoint.id = "select-start";
  for (let i = 0; i < matrix2Row.value; i++) {
    const option = document.createElement("option");
    option.id = "start";
    option.value = `${i}`;
    option.text = `${i}`;
    startPoint.appendChild(option);
  }
  divStartPoint.appendChild(startPoint);
  matrixField2.appendChild(divStartPoint);
}

function getStartValue() {
  const selectStartValue = document.getElementById("select-start");
  return selectStartValue.value;
}

function getEndValue() {
  const selectStartValue = document.getElementById("select-end");
  return selectStartValue.value;
}

function showResultButton2() {
  const resultButton = document.createElement("button");
  resultButton.id = "btn-show-result-2";
  resultButton.className = "btn-show-result";
  resultButton.textContent = "Вывести результат";
  matrix2Block.appendChild(resultButton);
  resultButton.addEventListener("click", shortestPathInGraph);
}

function fieldWithAnswer() {
  const resultDiv = document.createElement("div");
  resultDiv.textContent = "Кратчайший путь равен:";
  const resultSpan = document.createElement("span");
  resultSpan.id = "answer-2";
  resultSpan.className = "answer-2";
  resultDiv.appendChild(resultSpan);
  matrix2Block.appendChild(resultDiv);
}

function shortestPathInGraph() {
  fieldWithAnswer();
  let arr = [].map.call(
    document.querySelectorAll(".inputBlock-2"),
    function (block) {
      return [].map.call(
        block.querySelectorAll(".matrix-input-2"),
        function (inp) {
          return Number(inp.value);
        }
      );
    }
  );

  if (checkMatrixForSymmetry(arr)===false){
    invalidMatrix();
  }else {
    console.log("///////////eeee");
    console.log(arr);
    paintGraph(arr);
    let start = Number(getStartValue());
    let end = Number(getEndValue());
    dijkstra(start, end, arr, true);
  }
}
function invalidMatrix(){
  const divIfInvalidMatrix=document.createElement('div');
  divIfInvalidMatrix.id='invalidMatrix';
  divIfInvalidMatrix.textContent='Матрица не симметрична, попробуйте ещё раз'
  const block=document.getElementById('matrix-field-2');
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
  divWithCanvas.id = "mynetwork";
  divWithCanvas.className = "mynetwork";
  matrix2Block.appendChild(divWithCanvas);
}

function showMatrix2() {
  const textNode = document.createTextNode("The matrix must be symmetrical");

  const matrixField2 = document.createElement("div");
  matrixField2.id = "matrix-field-2";
  matrix2Block.appendChild(matrixField2);
  matrixField2.appendChild(textNode);
  const divForLabelsX2 = document.createElement("div");
  for (let i = 0; i < matrix2Row.value; i++) {
    const labelsForMatrix2 = document.createElement("span");
    labelsForMatrix2.id = "matrix-label-X-2";
    labelsForMatrix2.className = "matrix-label-X-2";
    labelsForMatrix2.textContent = `${i}`;
    divForLabelsX2.appendChild(labelsForMatrix2);
  }
  matrixField2.appendChild(divForLabelsX2);

  for (let i = 0; i < matrix2Row.value; i++) {
    let inputBlock = document.createElement("div");
    inputBlock.className = "inputBlock-2";
    let matrixLabel = document.createElement("span");
    matrixLabel.innerHTML = `${i}`;
    inputBlock.appendChild(matrixLabel);

    for (let j = 0; j < matrix2Row.value; j++) {
      let newInput = document.createElement("input");
      newInput.className = "matrix-input-2";
      inputBlock.appendChild(newInput);
    }
    matrixField2.appendChild(inputBlock);
  }
  createStartPoint();
  createEndPoint();
}

function dijkstra(a, b, matrix, showLog = false) {
  if (showLog) {
    console.log(
      `| Finding the shortest path |\n - Startpoint: ${a}\n - Endpoint: ${b}`
    );
  }

  // Check that startpoint and endpoint are in distance matrix if not return null
  if (a < 0 || b < 0 || a >= matrix.length || b >= matrix.length) {
    if (showLog) {
      console.log(`Error, Check arguments`);
    }
    return null;
  }

  // Define variables
  let nodes = [[]];
  let currentNode = a;
  let nextNode = [null, Infinity];
  let distanceCosts = [];

  // Create object array based on the distance matrix
  for (let i = 0; i < matrix.length; i++) {
    distanceCosts[i] = {know: false, cost: Infinity, path: null, route: []};
  }

  // Set the start node know state to true and cost to zero
  distanceCosts[currentNode].know = true;
  distanceCosts[currentNode].cost = 0;

  // Find all the connected nodes and add their indexes and costs to array
  for (let i = 0; i < matrix.length; i++) {
    if (i !== 0) nodes.push([]);
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] !== 0) {
        nodes[nodes.length - 1].push([j, matrix[i][j]]);
      }
    }
  }

  while (true) {
    // Go through all the nodes that are connected to current node
    nodes[currentNode].forEach(function (node, index) {
      if (!distanceCosts[node[0]].know) {
        if (
          distanceCosts[node[0]].cost >
          node[1] + distanceCosts[currentNode].cost
        ) {
          // Set the current lowest cost
          distanceCosts[node[0]].cost =
            node[1] + distanceCosts[currentNode].cost;
          distanceCosts[node[0]].path = currentNode;
        } else if (nextNode[1] > node[1] + distanceCosts[currentNode].cost) {
          // Change node to continue path
          nextNode[0] = node[0];
          nextNode[1] = node[1] + distanceCosts[currentNode].cost;
        }
      }
    });

    // If the all nodes that are connected to current node are visited. Then found new lowest cost node to be continue
    if (nextNode[0] == null) {
      for (let i = 0; i < distanceCosts.length; i++) {
        if (!distanceCosts[i].know) {
          let tempNode = [null, Infinity];

          for (let i = 0; i < distanceCosts.length; i++) {
            if (
              !distanceCosts[i].know &&
              distanceCosts[i].cost !== Infinity &&
              distanceCosts[i].cost < tempNode[1]
            ) {
              // Set the new found node index and cost
              tempNode[0] = i;
              tempNode[1] = distanceCosts[i].cost;
            }
          }
          if (tempNode[0] != null) {
            distanceCosts[tempNode[0]].know = true;
            nextNode[0] = tempNode[0];
            break;
          }
        }
      }

      // If all nodes have been visited and no new nodes are found.
      if (nextNode[0] == null) {
        // Collect all the node paths to create route arrays
        for (let i = 0; i < distanceCosts.length; i++) {
          let x = 0;

          if (!(distanceCosts[i].path == null)) {
            // Add the current node index number to route array
            distanceCosts[i].route.push(i);
            x = distanceCosts[i].path;

            // Collect all paths and add them to route array
            while (!(distanceCosts[x].path == null)) {
              distanceCosts[i].route.push(x);
              x = distanceCosts[x].path;
            }
            // Add the last node index number to route array and reverse array
            distanceCosts[i].route.push(x);
            distanceCosts[i].route.reverse();
          }
        }

        if (showLog) {
          let costs = distanceCosts[b].cost;
          let route = distanceCosts[b].route;
          if (route.length !== 0) {
            console.log(
              `\nThe shortest path is through ${route} points and costs ${costs}`
            );
            document.querySelector(".answer-2").innerHTML = costs;
          } else {
            console.log(`\nNo path was found between points ${a} and ${b}`);
          }
        }

        // Return the completed distance costs and paths object array
        return distanceCosts;
      }
    }

    // Update current shortests path and cost to object array
    if (nextNode[1] < distanceCosts[nextNode[0]].cost) {
      distanceCosts[nextNode[0]].cost = nextNode[1];
      distanceCosts[nextNode[0]].path = currentNode;
    }

    // Change the current node and continue loop
    currentNode = nextNode[0];
    distanceCosts[currentNode].know = true;
    nextNode = [null, Infinity];
  }
}

//взвешенный граф
