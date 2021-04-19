// ┌──────────────────────┐
// │   Global Variables   │	
// └──────────────────────┘

const height1 = 100;
const width1 = 400;
let ds; // global variable for data - dataset
let salesTotal = 0.0;
let salesAvg = 0.0;
let metrics = [];

// ┌─────────────────┐
// │   d3 csv call   │	
// └─────────────────┘

d3.csv("MonthlySales.csv", function(error, data){

    if(error){
        console.log(error);
    }else{
        //console.log(data);
        ds = data;
        console.log(ds);
        buildLine();
        showTotals();
    }
});


// ┌─────────────────────────┐
// │   Function Build Line   │	
// └─────────────────────────┘

function buildLine(){

     // Line function
    const lineFun = d3.svg.line()
    .x(function(d){return (d.month-20130001)/3.25})
    .y(function(d){return (height1-d.sales);})
    .interpolate("linear");

// Append svg to tag
const svg1 = d3.select("#csv")
            .append("svg")
            .attr({
                width: width1,
                height: height1
});

// Append visuals to svg
const viz = svg1.append("path")
                .attr({
                    d: lineFun(ds),
                    "stroke": "purple",
                    "stroke-width": 2,
                    "fill": "none"
    });

}

// ┌──────────────────────────┐
// │   Function Show Totals   │	
// └──────────────────────────┘

function showTotals(){

    const t = d3.select("#csv-table").append("table");

    // Get sales total
    for(let i = 0; i < ds.length; i++){
        salesTotal += ds[i]["sales"]*1; // convert to number
    }

    // Calculate sales Average
    salesAvg = salesTotal / ds.length;

    // Add metrics to array
    metrics.push("Sales Total: " + salesTotal);
    metrics.push("Sales Avg: " + salesAvg.toFixed(2));

    // Add metrics to table
    const tr = t.selectAll("tr")
                .data(metrics)
                .enter()
                .append("tr")
                .append("td")
                .text(function(d) {return d;});
}




// ┌───────────────┐
// │   JSON File   │	
// └───────────────┘

const height2 = 100;
const width2 = 400;
let ds1; // global variable for data - dataset

function buildJSONLine(){

    // Line function
   const lineFun = d3.svg.line()
   .x(function(d){return (d.month-20130001)/3.25})
   .y(function(d){return (height2-d.sales);})
   .interpolate("linear");

// Append svg to tag
const svg1 = d3.select("#json")
           .append("svg")
           .attr({
               width: width2,
               height: height2
});

// Append visuals to svg
const viz = svg1.append("path")
               .attr({
                   d: lineFun(ds1.monthlySales),
                   "stroke": "purple",
                   "stroke-width": 2,
                   "fill": "none"
   });

}

function showHeader() {
    d3.select("#json").append("h1")
                        .text(ds1.category + " Sales (2013)");
}

d3.json("MonthlySalesbyCategory.json", function(error, data){

    if(error){
        console.log(error);
    }else{
        ds1 = data;
        console.log(ds1);
        showHeader();
        buildJSONLine();
    }
});


// ┌────────────────┐
// │   JSON File 2  │	
// └────────────────┘


const height3 = 100;
const width3 = 400;
let ds2; // global variable for data - dataset

function buildJSONLine2(ds2){

    // Line function
   const lineFun = d3.svg.line()
   .x(function(d){return (d.month-20130001)/3.25})
   .y(function(d){return (height3-d.sales);})
   .interpolate("linear");

// Append svg to tag
const svg1 = d3.select("#json2")
           .append("svg")
           .attr({
               width: width3,
               height: height3
});

// Append visuals to svg
const viz = svg1.append("path")
               .attr({
                   d: lineFun(ds2.monthlySales),
                   "stroke": "purple",
                   "stroke-width": 2,
                   "fill": "none"
   });

}

function showHeader2(ds2) {
    d3.select("#json2").append("h1")
                        .text(ds2.category + " Sales (2013)");
}

d3.json("MonthlySalesbyCategoryMultiple.json", function(error, data){

    if(error){
        console.log(error);
    }else{
        ds2 = data;
        console.log(ds2);
    }

    data.contents.forEach(function(ds2){
        console.log(ds2);
        showHeader2(ds2);
        buildJSONLine2(ds2);
    })
});

