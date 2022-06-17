  function plotTimeSeries(data,label,elementID){

      const ctx = document.getElementById(elementID);

      const chart = new Chart(ctx, {
	  type: 'line',
	  data: {
	      datasets: [
		  {
		      label: 'reanalysis',
		      borderColor: 'rgb(0, 0, 0)',
		      backgroundColor: 'rgb(0, 0, 0)',
		      xAxisID: 'x',
		      parsing: { xAxisKey: 'time', yAxisKey: 'values' },
		      data: data[1]
		    },
		  {
		      label: 'observations',
		      borderColor: 'rgb(75, 192, 192)',
		      backgroundColor: 'rgb(75, 192, 192)',
		      xAxisID: 'x',
		      parsing: { xAxisKey: 'DATE', yAxisKey: 'TAVG' },
		      data: data[0]
		    },
		]
	    },
	  options: {
	      scales: {
		  x: { type: 'time', time: { unit: 'month' } }
		},
	      plugins: {
		  title: {
		      display: true,
		      text: 'Surface temperature from reanalysis and observations'
		    }
		}

	    }
	});

	return chart;

    }
  

