// You can add your event handlers here!

function loadGiftsHandler(giftArr) {
  let ulNode = document.querySelector(".gift-list");
  if(gifts.length < 1) {
    ulNode.firstElementChild.style.display = 'inline';
  } else {
    ulNode.firstElementChild.style.display = 'none';
    for(gift of giftArr) {
      liNode = document.createElement("li");
      txt = document.createTextNode(gift.name);
      liNode.appendChild(txt);
      liNode.setAttribute("data-id", gift.id);
      liNode.innerHTML += ' <button type="button">delete</button>';
      liNode.lastChild.addEventListener("click", deleteGift);
      ulNode.appendChild(liNode);
    }
  }

  intializer(giftArr);
}

function intializer(giftArr) {
  idCounter = giftArr[giftArr.length - 1].id + 1;
}

function searchGiftHandler(e) {
  let q = e.target.value;

  fetch("http://localhost:3000/gifts").then(res => res.json()).then(data => {
    filter(data, function(el) {
      if(el.name.includes(`${q}`))
        return true;
      else
        return false;
    })
  });
}

function filter(list, predicate) {
    if (!(list instanceof Array)) {
      list = Object.values(list);
    }

    newList = [];

    for(let i = 0; i < list.length; i++) {
      if (predicate(list[i]))
        newList.push(list[i]);
    }
    
    let liChild = document.querySelector(".gift-list").firstElementChild;
    let ulRoot = document.querySelector(".gift-list")
    ulRoot.innerHTML = "";
    ulRoot.appendChild(liChild);

    loadGiftsHandler(newList);
}

function deleteGift(e) {
  let dataID = parseInt(e.target.parentNode.dataset.id);

  fetch(`http://localhost:3000/gifts/${dataID}`, { method: "DELETE"})
  window.location.reload();
}

function createGiftHandler(e) {
  let gName = e.target.elements["gift-name-input"].value;
  let gImage = e.target.elements["gift-image-input"].value;

  fetch("http://localhost:3000/gifts", { method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: idCounter, name: gName, image: gImage })
  }).then(res => res.json()).then(loadGiftsHandler)
}
