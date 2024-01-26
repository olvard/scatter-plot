function parseCSV(url) {
    const csvUrl = url;
    const dataArray = [];

    return fetch(csvUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(csvText => {
            const rows = csvText.split('\n');
            rows.forEach((row, index) => {
                const columns = row.split(',');
                if (columns.length === 3 && !isNaN(columns[0]) && !isNaN(columns[1]) && (columns[2] === 'a' || columns[2] === 'b' || columns[2] === 'c')) {
                    dataArray.push({
                        x: parseFloat(columns[0]),
                        y: parseFloat(columns[1]),
                        type: columns[2]
                    });
                }
            });

            return dataArray; 
        })
        .catch(error => {
            console.error('Error reading CSV file:', error.message);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    parseCSV('data1.csv').then(data => {
        drawPlot(data);
    });
});

function drawPlot(data) {
    const canvas = document.getElementById("plotly")
	const plot = canvas.getContext("2d");

	// Define the dimensions and scales of the plot
	const width = 800;
	const height = 600;
	const margin = 30;
	const xScale = (width - 2 * margin) / 20; // Adjust the scale to better fit your data
	const yScale = (height - 2 * margin) / 20; // Adjust the scale to better fit your data
  
	// Define the number of ticks and the spacing between them
	const numXTicks = 20;
	const numYTicks = 20;
	const xTickSpacing = (width - 2 * margin) / numXTicks;
	const yTickSpacing = (height - 2 * margin) / numYTicks;
  
	// Draw the grid
	plot.strokeStyle = '#ddd'; // Light grey for the grid
	for (let i = 0; i <= numXTicks; i++) {
	  plot.beginPath();
	  plot.moveTo(margin + i * xTickSpacing, margin);
	  plot.lineTo(margin + i * xTickSpacing, height - margin);
	  plot.stroke();
	}
  
	for (let i = 0; i <= numYTicks; i++) {
	  plot.beginPath();
	  plot.moveTo(margin, margin + i * yTickSpacing);
	  plot.lineTo(width - margin, margin + i * yTickSpacing);
	  plot.stroke();
	}
  
	// Draw the axes
	plot.strokeStyle = '#000'; // Black for the axes
	plot.beginPath();
	plot.moveTo(margin, margin);
	plot.lineTo(margin, height - margin);
	plot.lineTo(width - margin, height - margin);
	plot.stroke();
  
	// Draw the ticks
	for (let i = 0; i <= numXTicks; i++) {
	  plot.beginPath();
	  plot.moveTo(margin + i * xTickSpacing, height - margin);
	  plot.lineTo(margin + i * xTickSpacing, height - margin + 10); // 10 pixels long ticks
	  plot.stroke();
	}
  
	for (let i = 0; i <= numYTicks; i++) {
	  plot.beginPath();
	  plot.moveTo(margin, margin + i * yTickSpacing);
	  plot.lineTo(margin - 10, margin + i * yTickSpacing); // 10 pixels long ticks
	  plot.stroke();
	}


    for (var i = 0; i < data.length; i++) {
		// const x = margin + data[i].x * xScale;
    	// const y = height - margin - data[i].y * yScale;

		const x = margin + data[i].x*10;
    	const y = height - margin - data[i].y*10;
		console.log(x)
		console.log(y)

		plot.fillRect(x, y, 4, 4);
	}

    //document.body.appendChild(canvas);
}
