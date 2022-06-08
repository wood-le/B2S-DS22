console.log("Hello B2S");

let viz;

// 1. Grab the container from the index page
// We have stored the container as a constant, which we can reference later on
const containerDiv = document.getElementById("vizContainer");
// 2. Define some vis options (device, width and height)
const options = {
  device: "desktop",
  hideToolbar: false,
  height: 1000,
  width: 1000,
};
// 3. Create a variable to hold the dashboard URL
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

// Create function
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

// Call function
initViz();

const pdfButton1 = document.getElementById("exportPDF");
pdfButton1.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

const pdfButton2 = document.getElementById("exportPPT");
pdfButton2.addEventListener("click", function () {
  viz.showExportPowerPointDialog();
});

// function that grabs the filter values and filters the viz
function getRangeValues() {
  // get the values from the input boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // get the workbook
  const workbook = viz.getWorkbook();
  //    active sheet - either a dashboard, or a worksheet
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
}

document
  .getElementById("filterButton")
  .addEventListener("click", getRangeValues);

// Wait until the document is loaded before initiating function
document.addEventListener("DOMContentLoaded", initViz);
