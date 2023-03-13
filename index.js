"use strict";
const defaultColor = "#ebedf0";
let penColor = "#2d333b";
let isDrawing = false;
let Counter = 0;
const currentYear = "";
function setMonths(pixel) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const tableHead = document.getElementById("tableHead");
    const column = pixel.dataset.col;
    const date = pixel.dataset.date;
    for (let i = 0; i < months.length; i++) {
        const month = months[i];
        if ((date === null || date === void 0 ? void 0 : date.includes(`${("0" + (i + 1)).slice(-2)}-01`)) && column !== undefined) {
            const monthTd = document.createElement("div");
            monthTd.innerHTML = month;
            monthTd.setAttribute("style", `left:${parseInt(column) * 16}px`);
            // monthTd.setAttribute("colspan", "4");
            tableHead === null || tableHead === void 0 ? void 0 : tableHead.appendChild(monthTd);
        }
    }
}
function setGraph() {
    const graph = document.getElementById("graph");
    let date = new Date();
    let dayOfWeek = date.getDay();
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - (365 + dayOfWeek) + 1);
    for (let i = 0; i < 7; i++) {
        let row = document.createElement("tr");
        row.className = "row";
        for (let j = 0; j < 53; j++) {
            if (i > dayOfWeek && j == 52)
                break;
            let pixel = document.createElement("td");
            let commitDate = new Date(startDate);
            commitDate.setDate(startDate.getDate() + (j * 7 + i));
            pixel.className = "pixel";
            pixel.dataset.col = `${j}`;
            pixel.dataset.date = commitDate.getFullYear() + "-" + ('0' + (commitDate.getMonth() + 1)).slice(-2) + "-" + ("0" + commitDate.getDate()).slice(-2);
            row.appendChild(pixel);
            setMonths(pixel);
        }
        graph === null || graph === void 0 ? void 0 : graph.appendChild(row);
    }
}
// { dataset: { color: string; }; }
function setColor(element) {
    penColor = element.dataset.color;
}
function draw(element) {
    element.style.backgroundColor = penColor;
}
function setPenColorOnHover(target) {
    document.querySelectorAll('.pen').forEach(function (item) {
        item.setAttribute("style", "border: none");
        target.setAttribute("style", "border: 2px solid white");
    });
}
function setContributionCounter() {
    const color1 = Array.from(document.querySelectorAll('td[style="background-color: rgb(198, 228, 139);"]'));
    const color2 = Array.from(document.querySelectorAll('td[style="background-color: rgb(123, 201, 111);"]'));
    const color3 = Array.from(document.querySelectorAll('td[style="background-color: rgb(35, 154, 59);"]'));
    const color4 = Array.from(document.querySelectorAll('td[style="background-color: rgb(25, 97, 39);"]'));
    const contributionTitle = document.getElementById("contribution-title");
    let year = new Date();
    const currentYear = year.getFullYear();
    const counter = (color1.length * 1) + (color2.length * 2) + (color3.length * 4) + (color4.length * 7);
    // const color2: NodeListOf<HTMLElement> = document.querySelectorAll("td[style="background-color: rgb(198, 228, 139);"]");
    console.log(color1);
    // if (color === "background-color: rgb(198, 228, 139);") {
    //   Counter = Counter + 1
    //   counter.innerText = `${Counter} contributions in ${currentYear}`
    // }
    // if (color === "background-color: rgb(123, 201, 111);") {
    //   Counter = Counter + 3
    //   counter.innerText = `${Counter} contributions in ${currentYear}`
    // }
    // if (color === "background-color: rgb(35, 154, 59);") {
    //   Counter = Counter + 5
    //   counter.innerText = `${Counter} contributions in ${currentYear}`
    // }
    // if (color === "background-color: rgb(25, 97, 39);") {
    //   Counter = Counter + 8
    contributionTitle.innerText = `${counter} contributions in ${currentYear}`;
    // }
}
function setUp() {
    var _a;
    setGraph();
    setContributionCounter();
    // set pen color on hover
    document.addEventListener('mouseover', function (event) {
        const target = event.target;
        if (target.classList.contains('pixel')) {
            if (isDrawing) {
                draw(target);
            }
        }
    });
    document.addEventListener('mouseup', function (event) {
        isDrawing = false;
    });
    (_a = document.getElementById("graph")) === null || _a === void 0 ? void 0 : _a.addEventListener('mousedown', function (event) {
        isDrawing = true;
        setContributionCounter();
    });
    document.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('pen')) {
            setPenColorOnHover(target);
            setColor(target);
        }
        if (target.classList.contains('pixel')) {
            draw(target);
        }
    }, false);
}
setUp();
