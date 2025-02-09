const movieLocation = "Vue Cinema, Glasgow Fort Shopping Park, Glasgow G34 9DL";
const potteryLocation = "Firepit & Kiln, 6 Springfield Quay, Kinning Park, Glasgow G5 8NP";

document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const selectedOption = params.get('option') || '';
  console.log("Selected option:", selectedOption);

  var calendarBody = document.querySelector('#calendar tbody');

  generateCalendar(new Date());

  function generateCalendar(date) {
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var currentDate = new Date(firstDay);

    calendarBody.innerHTML = '';

    var dayIndex = firstDay.getDay();

    if (dayIndex === 0) dayIndex = 7;

    var row = document.createElement('tr');
    for (var i = 1; i < dayIndex; i++) {
      var emptyCell = document.createElement('td');
      row.appendChild(emptyCell);
    }

    for (var i = dayIndex; i <= 7; i++) {
      if (currentDate.getMonth() === date.getMonth() && currentDate <= lastDay) {
        var cell = document.createElement('td');
        cell.textContent = currentDate.getDate();
        cell.setAttribute('data-date', currentDate.toISOString().split('T')[0]);
        cell.addEventListener('click', function () {
          createCalendarEvent(this.getAttribute('data-date'));
        });
        row.appendChild(cell);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    calendarBody.appendChild(row);

    while (currentDate <= lastDay) {
      var row = document.createElement('tr');
      for (var i = 0; i < 7; i++) {
        var cell = document.createElement('td');
        if (currentDate.getMonth() === date.getMonth() && currentDate <= lastDay) {
          cell.textContent = currentDate.getDate();
          cell.setAttribute('data-date', currentDate.toISOString().split('T')[0]);
          cell.addEventListener('click', function () {
            createCalendarEvent(this.getAttribute('data-date'));
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }

  function createCalendarEvent(selectedDate) {

    var dateObj = new Date(selectedDate);
    var startYear = dateObj.getFullYear();
    var startMonth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    var startDay = dateObj.getDate().toString().padStart(2, '0');
    var start = '' + startYear + startMonth + startDay;

    dateObj.setDate(dateObj.getDate() + 1);
    var endYear = dateObj.getFullYear();
    var endMonth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    var endDay = dateObj.getDate().toString().padStart(2, '0');
    var end = '' + endYear + endMonth + endDay;

    var location = '';
    if (selectedOption === 'movie') {
      location = movieLocation;
    } else if (selectedOption === 'pottery') {
      location = potteryLocation;
    }

    var url = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=Gmail+Calendar+Meet" +
      "&dates=" + start + "/" + end +
      "&location=" + encodeURIComponent(location);

    window.location.href = url;
  }
});
