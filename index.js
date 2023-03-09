"use strict";
// interface Pixel {
//     [x: string]: any
//     dataset: {
//         date : string
//         col : string
//     }   
// }
function setMonths(pixel) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const tableHead = document.getElementById("tableHead");
    const column = pixel.dataset.col;
    const date = pixel.dataset.date;
    for (let i = 0; i < months.length; i++) {
        const month = months[i];
        if ((date === null || date === void 0 ? void 0 : date.includes(`${("0" + (i + 1)).slice(-2)}-01`)) && column !== undefined) {
            console.log(column);
            // console.log(`${("0" + (i+1)).slice(-2)}-01`)
            const monthTd = document.createElement("div");
            monthTd.innerHTML = month;
            monthTd.setAttribute("style", `left:${parseInt(column) * 16}px; height: 0px`);
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
    console.log("startDate is " + startDate);
    for (let i = 0; i < 7; i++) {
        let row = document.createElement("tr");
        row.className = "row";
        for (let j = 0; j < 53; j++) {
            if (i > dayOfWeek && j == 52)
                break;
            let pixel = document.createElement("td");
            let commitDate = new Date(startDate);
            commitDate.setDate(startDate.getDate() + (j * 7 + i));
            // console.log(commitDate)
            pixel.className = "pixel";
            pixel.dataset.col = `${j}`;
            pixel.dataset.date = commitDate.getFullYear() + "-" + ('0' + (commitDate.getMonth() + 1)).slice(-2) + "-" + ("0" + commitDate.getDate()).slice(-2);
            row.appendChild(pixel);
            setMonths(pixel);
            // console.log(row.children.length)
            // console.log(commitDate.getMonth())
            // if (pixel.get)
        }
        graph === null || graph === void 0 ? void 0 : graph.appendChild(row);
    }
}
function setUp() {
    setGraph();
}
const dafaltColor = "#ebedf0";
let penColor = "#196127";
let isDrawing = false;
setUp();
