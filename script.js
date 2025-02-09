function nextPage() {
  window.location.href = "/valentines-day/idea.html";
}

function moveButton() {
  var noButton = document.getElementById("no-button");
  var x = Math.random() * (window.innerWidth - noButton.offsetWidth);
  var y = Math.random() * (window.innerHeight - noButton.offsetHeight);
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

function selectOption(option) {
  window.location.href = '/valentines-day/date.html?option=' + option;
}

