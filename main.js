function loadPage() {
  //fetch info from the json

  function loadItems() {
    return fetch("Data/data.json")
      .then((response) => response.json())
      .then((json) => json.personalinfo);
  }

  //get info from json
  loadItems()
    .then((personalinfo) => {
      displayItems(personalinfo);
    })
    .catch(console.log);

  let searchstring = document.getElementById("myInput").value;
  console.log(searchstring);

  function displayItems(personalinfo) {
    if (searchstring === "") {
      const container = document.querySelector(".personinfo");
      let htmlString = "";
      let alpaphet = "abcdefghijklmnopqrstuvwxyz";
      alpaphet = alpaphet.toUpperCase();

      for (j = 0; j < alpaphet.length; j++) {
        htmlString += `<div class="contactlist">${alpaphet[j]}</div>`;
        for (i = 0; i < personalinfo.length; i++) {
          if (personalinfo[i].firstname[0] === alpaphet[j]) {
            console.log(personalinfo[i].firstname);
            htmlString += createHTMLString(personalinfo[i]);
          }
        }
      }
      container.innerHTML = htmlString;
    } else {
      htmlString = "";
      const container = document.querySelector(".personinfo");
      container.innerHTML = htmlString;
      for (i = 0; i < personalinfo.length; i++) {
        lowercase_search = searchstring.toLowerCase();
        lowercase_lastname = personalinfo[i].lastname
          .substring(0, searchstring.length)
          .toLowerCase();
        lowercase_firstname = personalinfo[i].firstname
          .substring(0, searchstring.length)
          .toLowerCase();
        if (
          lowercase_search === lowercase_lastname ||
          lowercase_search === lowercase_firstname
        ) {
          htmlString += createHTMLString(personalinfo[i]);
          container.innerHTML = htmlString;
        }
      }
    }
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
}

loadPage();
