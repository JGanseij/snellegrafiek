// script.js
document.getElementById('chartForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const chartTitle = document.getElementById('chartTitle').value;
    const chartType = document.getElementById('chartType').value;
    const labelsInput = document.getElementById('labelsInput').value;
    const barDataName = document.getElementById('barDataName').value;
    const dataInput = document.getElementById('dataInput').value;
    const lineDataName = document.getElementById('lineDataName').value;
    const lineDataInput = document.getElementById('lineDataInput').value;
    
    const labels = labelsInput.split(',');
    const data = dataInput.split(',').map(Number);
    const lineData = lineDataInput.split(',').map(Number);
    
    const ctx = document.createElement('canvas');
    document.getElementById('chartContainer').innerHTML = '';
    document.getElementById('chartContainer').appendChild(ctx);
    
    const datasets = [{
      label: barDataName,
      data: data,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      datalabels: {
        align: 'end',
        anchor: 'end',
        display: true,
        color: 'black',
        font: {
          weight: 'bold'
        },
        formatter: function(value, context) {
          return value;
        }
      }
    }];
    
    if (chartType === 'combined' && lineData.length === data.length) {
      datasets.push({
        label: lineDataName,
        data: lineData,
        type: 'line',
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        datalabels: {
          align: 'end',
          anchor: 'end',
          display: true,
          color: 'black',
          font: {
            weight: 'bold'
          },
          formatter: function(value, context) {
            return value;
          }
        }
      });
    }
    
    new Chart(ctx, {
      type: chartType === 'combined' ? 'bar' : chartType,
      data: {
        labels: labels,
        datasets: datasets
      },
      plugins: [ChartDataLabels],
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: chartTitle
          },
          datalabels: {
            color: 'black',
            font: {
              weight: 'bold'
            },
            formatter: function(value, context) {
              return value;
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            beginAtZero: true
          }
        }
      }
    });
  });
  
  document.getElementById('printButton').addEventListener('click', function() {
    const chartContainer = document.getElementById('chartContainer');
    const chartImage = chartContainer.querySelector('canvas').toDataURL('image/png');
    
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Chart</title>
          <style>
            @media print {
              @page {
                size: landscape;
              }
            }
          </style>
        </head>
        <body>
          <img src="${chartImage}" style="width: 100%;">
        </body>
      </html>
    `);
    printWindow.document.close();
    
    printWindow.print();
    printWindow.close();
        });