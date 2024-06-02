  function updateData() {
  
            const newData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50));

 
            crimeChart.data.datasets[0].data = newData;

            crimeChart.update();
        }

  
        const initialData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50));

        const crimeData = {
            labels: ['', '', '', '', ,'', '', '', '', '','', '', '', '', '','', '', '', '', '','', '', '', '', '','', '', '', '', ''],
            datasets: [{
                label: '犯罪率',
                data: initialData, 
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        };

        const ctx = document.getElementById('crimeChart').getContext('2d');

        const crimeChart = new Chart(ctx, {
            type: 'bar',
            data: crimeData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        setInterval(updateData, 3000);