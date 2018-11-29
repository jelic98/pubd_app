const API_URL = 'https://api.pubd.ml/';

$(document).ready(function() {
	$('#btnAddPlace').click(function() {
		$.ajax({
  			url: API_URL + 'places',
  			type: 'POST',
			cache: false,
  			success: function(data) {
  				if(data.error != undefined) {
					showError(data.message);
					return;
				}
			}
		});
	});	

	$('.place').each(function(i) {
		$('#btnRemovePlace' + $(this).attr("data-place")).click(function() {
			addRemovePlaceModal($(this));
			$('#removePlaceModal').modal('show');
		});
	});
});

var placesChart = new Chart($('#places-chart'), {
  type: 'pie',
  data: {
    labels: ['Red', 'Green', 'Yellow'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  },
  options: {
    responsive: true
  }
});

var sessionsChart = new Chart($('#sessions-chart'), {
  type: 'line',
  data: {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: [165, 180, 70, 69, 77, 57, 125, 165, 172, 91, 173, 138, 155, 89, 50, 161, 65, 163, 160, 103, 114, 185, 125, 196, 183, 64, 137, 95, 112, 175]
    }, {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: [92, 97, 80, 100, 86, 97, 83, 98, 87, 98, 93, 83, 87, 98, 96, 84, 91, 97, 88, 86, 94, 86, 95, 91, 98, 91, 92, 80, 83, 82]
    }, {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65]
    }]
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    }
  }
});

function showError(message) {
	$('main').append('<div class="alert alert-danger" role="alert">' + message + '</div>');
}

function addRemovePlaceModal(placeRow) {
	var placeId = placeRow.attr('data-id');

	$('main').append(
		'<div class="modal fade" id="removePlaceModal" tabindex="-1" role="dialog" aria-labelledby="removePlaceModel" aria-hidden="true">'
		+ '<div class="modal-dialog" role="document">'
   		+ '<div class="modal-content">'
      	+ '<div class="modal-header">'
        + '<h5 class="modal-title" id="removePlaceModal">Remove place</h5>'
        + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
        + '<span aria-hidden="true">&times;</span>'
       	+ '</button>'
     	+ '</div>'
    	+ '<div class="modal-body">'
		+ 'Are you sure you want to remove this place?'
		+ '</div>'
    	+ '<div class="modal-footer">'
     	+ '<button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>'
      	+ '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="removePlace()">Yes</button>'
    	+ '</div>'
 		+ '</div>'
		+ '</div>');

	$('#removePlaceModal').on('hide.bs.modal', function(e) {
		$(this).remove();
	});
}

function removePlace() {
	$.ajax({
  		url: API_URL + 'place',
  		type: 'DELETE',
		cache: false,
  		success: function(data) {		
			if(data.error != undefined) {
				showError(data.message);
				return;
			}
		}
	});
}
