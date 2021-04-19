const height1 = 100;
const width1 = 400;
let ds; // global variable for data

// pull in csv data and parse it out to a object
// d3.json d3.txt d3.xhr etc....
// When this method is called it will run asynchronously
// Meaning its not going to run sequentially in order
// So you should type in code to draw data inside d3.csv
d3.csv("MonthlySales.csv", function(error, data){

    if(error){
        console.log(error);
    }else{
        console.log(data);
        ds = data;
        console.log(ds);
        buildLine();
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

