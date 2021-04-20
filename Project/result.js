var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");
var total = queries[0].split("=")[1];
var correct = queries[1].split("=")[1];
var incorrect = queries[2].split("=")[1];
var accuracy = 30 / correct;
accuracy = Number((accuracy).toFixed(2));

document.getElementById("incorrectNumber").innerHTML = incorrect;
document.getElementById("correctNumber").innerHTML = correct;
document.getElementById("meanTime").innerHTML = accuracy;

var ctx = document.getElementById('chart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                title: {
                    text: "Accuracy",
                    verticalAlign: "center",
                    dockInsidePlotArea: true
                },
                data: {
                    datasets: [{
                        data: [correct, incorrect],
                        backgroundColor: [
                            '#04bebd',
                            '#ff61a9'
                        ],
                        borderColor: [
                            '#04bebd',
                            '#ff61a9'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    cutoutPercentage: 70
                }
            });