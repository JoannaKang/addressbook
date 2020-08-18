//fetch info from the json
function loadItems() {
  return fetch("Data/data.json")
    .then((response) => response.json())
    .then((json) => json.personalinfo);
}

function displayItems(personalinfo) {
  const container = document.querySelector(".personinfo");
  container.innerHTML = personalinfo
    .map((info) => createHTMLString(info))
    .join("");

  console.log(container);
}

function createHTMLString(personalinfo) {
  return `
  <div class="name">
    <img src="${personalinfo.imgsrc}" alt="" /> ${personalinfo.firstname} ${personalinfo.lastname} 
  </div>

  <div class="detailinfo">
    <ul>
      Mobile: ${personalinfo.mobile}
    </ul>
    <ul>
      Email: ${personalinfo.email}
    </ul>
    <ul>
      Address: ${personalinfo.address}
    </ul>

    <div class="actionbuttons">
      <button class="icon">
        <i class="fab fa-facebook-messenger"></i>
      </button>
      <button class="icon">
        <i class="fas fa-phone-alt"></i>
      </button>
      <button class="icon">
        <i class="fas fa-envelope"></i>
      </button>
      <button class="text-edit">
        EDIT
      </button>
      <button class="text-delete">
        DELETE
      </button>
    </div>

  </div>

  `;
}

//get info from json
loadItems()
  .then((personalinfo) => {
    displayItems(personalinfo);
  })
  .catch(console.log);
