const height = 100;
const width = 100;
let ds; // global variable for data

// pull in csv data and parse it out to a object
// d3.json d3.txt d3.xhr etc....
d3.csv("MonthlySales.csv", function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log(data);
        ds = data;
        console.log(ds);
    }
});