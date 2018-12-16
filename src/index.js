var idCounter = 0;
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  // console.table(gifts)

  fetch("http://localhost:3000/gifts").then(res => res.json()).then(loadGiftsHandler);

  document.getElementById('new-gift-form').addEventListener("submit", createGiftHandler);
  document.getElementById("filter-input").addEventListener("keyup", searchGiftHandler);

});
