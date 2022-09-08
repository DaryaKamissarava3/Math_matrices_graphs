import {createEndPointX, createEndPointY, createStartPointX, createStartPointY} from "./modules/createPoints.js";

const selectWithOptions = document.getElementById('select');
const matrix1 = document.getElementById('matrix-1');
const matrix2 = document.getElementById('matrix-2');

selectWithOptions.addEventListener('change', function handleChange(event) {
    if (event.target.value === 'matrix-1') {
        matrix1.style.display = 'block';
    } else {
        matrix1.style.display = 'none';
    }
    if (event.target.value === 'matrix-2') {
        matrix2.style.display = 'block';
    } else {
        matrix2.style.display = 'none';
    }
});

const btnShowMatrix1 = document.getElementById('btn-show-matrix-1');
const btnShowMatrix2 = document.getElementById('btn-show-matrix-2');
const matrix1Row = document.getElementById('matrix-1-row');
const matrix1Col = document.getElementById('matrix-1-col');
const matrix2Row = document.getElementById('matrix-2-row');
const matrix1Block = document.getElementById('matrix-1-block');
const matrixField2 = document.getElementById('matrix-field-2');
const btnShowResult = document.getElementById('btn-show-result');

showMatrix2();

btnShowMatrix1.addEventListener('click', showInformation);

function showInformation() {
    let containerWithElements = document.getElementById('matrix-field');
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

}

function showMatrix() {
    const matrixField = document.createElement('div');
    matrixField.id = 'matrix-field';
    matrix1Block.appendChild(matrixField);
    const divForLabelsX = document.createElement('div');

    for (let i = 0; i < matrix1Col.value; i++) {
        const labelsForMatrix = document.createElement('span');
        labelsForMatrix.id = 'matrix-label-X';
        labelsForMatrix.className = 'matrix-label-X';
        labelsForMatrix.textContent = `${i}`;
        divForLabelsX.appendChild(labelsForMatrix);
    }
    matrixField.appendChild(divForLabelsX);

    for (let i = 0; i < matrix1Row.value; i++) {
        let inputBlock = document.createElement('div');
        inputBlock.className = 'inputBlock';
        let matrixLabelY = document.createElement('span');
        matrixLabelY.innerHTML = `${i}`;
        inputBlock.appendChild(matrixLabelY);

        for (let j = 0; j < matrix1Col.value; j++) {
            let newInput = document.createElement('input');
            newInput.className = 'matrix-input';
            inputBlock.appendChild(newInput);
        }
        matrixField.appendChild(inputBlock);
    }
}

function showResultButton() {
    const resultButton = document.createElement('button');
    resultButton.id = 'btn-show-result';
    resultButton.className = 'btn-show-result';
    resultButton.textContent = 'Show result';
    matrix1Block.appendChild(resultButton);

    resultButton.addEventListener('click', showShotestDestination);
}

function createFieldWithAnswer() {
    const divForResult = document.createElement('div');
    divForResult.textContent = 'The shortest path is equal:'
    const spanWithResult = document.createElement('span');
    spanWithResult.id = 'answer';
    spanWithResult.className = 'answer';
    divForResult.appendChild(spanWithResult);
    matrix1Block.appendChild(divForResult);
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


function showShotestDestination() {
    createFieldWithAnswer();
    let arr = [].map.call(document.querySelectorAll('.inputBlock'), function (block) {
        return [].map.call(block.querySelectorAll('.matrix-input'), function (inp) {
            return Number(inp.value);
        });
    });
    console.log(arr);

    function findPath(maze, src, dest) {
        const checkNode = (node) => {
            return !(!node || !Number.isInteger(node.row) ||
                node.row < 0 || !Number.isInteger(node.col) ||
                node.col < 0);
        };

        if (!maze || !Array.isArray(maze) ||
            !Array.isArray(maze[0]) ||
            !checkNode(src) || !checkNode(dest)) {
            return NaN;
        }

        const isEqual = (node1, node2) => {
            return node1.row === node2.row && node1.col === node2.col;
        };

        if (isEqual(src, dest)) {
            return 0;
        }

        const rowNum = [-1, 0, 1, 0];
        const colNum = [0, 1, 0, -1];
        const nodeProto = (row, col, dist = 0) => {
            return {row, col, dist};
        };
        let q = [];
        let visited = new Set();

        src.dist = 0;
        q.push(src);

        while (q.length > 0) {
            let node = q.shift();
            if (isEqual(node, dest)) {
                return node.dist;
            }

            for (let i = 0; i < 4; i++) {
                let row = rowNum[i] + node.row;
                let col = colNum[i] + node.col;
                if (row < 0 || row > arr.length - 1 || col < 0 || col > arr[0].length - 1) {
                    continue;
                }
                let _node = nodeProto(row, col, node.dist + 1);
                if (arr[row][col] === 1 && !visited.has(_node.row.toString() + _node.col.toString())) {
                    visited.add(_node.row.toString() + _node.col.toString());
                    q.push(_node);
                }
            }
        }
    }

    const startX = Number(getValueOfStartPointX());
    const startY = Number( getValueOfStartPointY());
    const endX =  Number(getValueOfEndPointX());
    const endY =  Number(getValueOfEndPointY());

    const result = findPath(arr, {row: startY, col: startX}, {
        row: endY,
        col: endX
    });
    console.log(result);
    document.querySelector(".answer").innerHTML = result;
}


function showMatrix2() {
    btnShowMatrix2.addEventListener('click', () => {

        const textNode = document.createTextNode('The matrix must be symmetrical');
        matrixField2.append(textNode);

        for (let i = 0; i < matrix2Row.value; i++) {

            let inputBlock = document.createElement('div');
            inputBlock.className = 'inputBlock';

            let matrixLabel = document.createElement('span');
            matrixLabel.innerHTML = `${i}`;
            inputBlock.appendChild(matrixLabel);

            for (let j = 0; j < matrix2Row.value; j++) {
                let newInput = document.createElement('input');
                newInput.className = 'matrix-input';
                inputBlock.appendChild(newInput);
            }
            matrixField2.appendChild(inputBlock);
        }
    });
}

export {matrix1Row, matrix1Col};