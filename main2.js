//set initial variable to save json data
let initialData = new Array();

//save json data into initialData variable
function getData() {
  fetch("/Data/data.json")
    .then((response) => response.json())
    .then(function setInitialdata(json) {
      (initialData = json.personalinfo), displayPage();
    });
}

function displayPage() {
  //Insert HTML tag to ".personinfo" div tag
  let htmlString = "";
  const container = document.querySelector(".personinfo");

  //get search strings from searchbox
  let searchstring = document.getElementById("myInput").value;
  console.log(searchstring);

  //create name group by first letter of first name
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  alphabet = alphabet.toUpperCase();

  if (searchstring === "") {
    for (j = 0; j < alphabet.length; j++) {
      htmlString += `<div class="contactlist">${alphabet[j]}</div>`; //->create divide box
      for (i = 0; i < initialData.length; i++) {
        if (alphabet[j] === initialData[i].firstname[0]) {
          htmlString += createHTMLstring(initialData[i]);
        }
      }
    }
    container.innerHTML = htmlString;
  } else {
    htmlString = "";
    const container = document.querySelector(".personinfo");
    container.innerHTML = htmlString;

    for (i = 0; i < initialData.length; i++) {
      searchstring_lower = searchstring.toLowerCase();
      firstname_lower = initialData[i].firstname
        .substring(0, searchstring.length)
        .toLowerCase();
      lastname_lower = initialData[i].lastname
        .substring(0, searchstring.length)
        .toLowerCase();
      if (
        searchstring_lower === firstname_lower ||
        searchstring_lower === lastname_lower
      ) {
        htmlString += createHTMLstring(initialData[i]);
        container.innerHTML = htmlString;
      }
    }
  }
}

function createHTMLstring(initialData) {
  return `
    <div class="name">
      <img src="${initialData.imgsrc}" alt="" /> ${initialData.firstname} ${initialData.lastname} 
    </div>
  
    <div class="detailinfo">
      <ul>
        Mobile: ${initialData.mobile}
      </ul>
      <ul>
        Email: ${initialData.email}
      </ul>
      <ul>
        Address: ${initialData.address}
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
        <button class="text-delete" onclick="openDeleteBox('${initialData.firstname} ${initialData.lastname}');">
          DELETE
        </button>
      </div>
  
    </div>
    `;
}
//open deletebox
function openDeleteBox(fullname) {
  console.log(fullname);
  document.querySelector(".delete-modal").style.display = "flex";
  console.log("open delete box");
}

//close delete box
document
  .querySelector(".deletepopup-close")
  .addEventListener("click", function () {
    document.querySelector(".delete-modal").style.display = "none";
  });

//open add info popup
document.getElementById("addbutton").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "flex";
});

//close info popup
document
  .querySelector(".addpopup-close")
  .addEventListener("click", function () {
    document.querySelector(".bg-modal").style.display = "none";
  });

//open delete check popup

getData();
displayPage();
