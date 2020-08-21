//0.Get Data
//set initial variable to save json data
let initialData = new Array();
let higestindex;

//save json data into initialData variable
function getData() {
  fetch("/Data/data.json")
    .then((response) => response.json())
    .then(function setInitialdata(json) {
      (initialData = json.personalinfo),
        displayPage(),
        (higestindex = initialData.length);
    });
}

//1.Dispay Data
function displayPage() {
  //Insert HTML tag to ".personinfo" div tag
  let htmlString = "";
  const container = document.querySelector(".personinfo");

  //get search strings from searchbox
  let searchstring = document.getElementById("myInput").value;

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
    <div id ="info-toggle" class="name"  onclick="$('#detail-info${initialData.dataindex}').toggle();")>
      <img class="profileimg" id="profileimg" src="${initialData.imgsrc}" alt="" /> 
      <span id="full-name">${initialData.firstname} ${initialData.lastname}</span> 
    </div>
  
    <div class="detailinfo" id ="detail-info${initialData.dataindex}">
      <ul>
        Mobile: ${initialData.mobile}
      </ul>
      <ul>
        Email: ${initialData.email}
      </ul>
      <ul>
        Address: ${initialData.address}
      </ul>
  
      <div class="actionbuttons" id="icons">
        <button class="icon">
          <i class="fab fa-facebook-messenger"></i>
        </button>
        <button class="icon">
          <i class="fas fa-phone-alt"></i>
        </button>
        <button class="icon">
          <i class="fas fa-envelope"></i>
        </button>
        <button class="text-edit" onclick="openEditBox('${initialData.dataindex}');">
          EDIT
        </button>
        <button class="text-delete" onclick="openDeleteBox('${initialData.firstname} ${initialData.lastname}');">
          DELETE
        </button>
      </div>
  
    </div>
    `;
}

//3. Delete data
let deleted_data;
function openDeleteBox(fullname) {
  deleted_data = fullname;
  document.querySelector(".delete-modal").style.display = "flex";
  console.log("open delete box");
}

function deleteName() {
  console.log("delete name");
  console.log(deleted_data);
  for (i = 0; i < initialData.length; i++) {
    if (
      deleted_data ===
      initialData[i].firstname + " " + initialData[i].lastname
    ) {
      console.log("deleting value " + i);
      deletedarray = initialData.splice(i, 1);
      console.log(initialData);
    }
  }
  displayPage();
  document.querySelector(".delete-modal").style.display = "none";
}

//3-1. Delete Box Control
//close delete box
document
  .querySelector(".deletepopup-close")
  .addEventListener("click", function () {
    document.querySelector(".delete-modal").style.display = "none";
  });

document.querySelector(".discard").addEventListener("click", function () {
  document.querySelector(".delete-modal").style.display = "none";
});

//open delete check popup

getData();
displayPage();

//4. Addinfo
let newinfo = {};
let new_firstname;
let new_lastname;
let new_mobile;
let new_email;
let new_address;
let new_profile;

//Activate when popup submit button click
function addNewInfo() {
  newinfo.dataindex = higestindex + 1;
  imglist = [
    "../icon/1752632-pokemon/png/032-avatar.png",
    "../icon/1752632-pokemon/png/033-avatar.png",
    "../icon/1752632-pokemon/png/034-avatar.png",
    "../icon/1752632-pokemon/png/036-avatar.png",
    "../icon/1752632-pokemon/png/037-avatar.png",
    "../icon/1752632-pokemon/png/039-avatar.png",
    "../icon/1752632-pokemon/png/041-avatar.png",
  ];
  let rand = Math.floor(Math.random() * imglist.length);
  newinfo.imgsrc = imglist[rand];
  //console.log(newinfo);
  initialData.push(newinfo);
  //console.log(initialData);
  document.querySelector(".bg-modal").style.display = "none";
  displayPage();
}

//Get New Info from popup window
function getFirstName() {
  new_firstname = document.getElementById("newfirstname").value;
  new_firstname =
    new_firstname[0].toUpperCase() +
    new_firstname.substring(1, new_firstname.length);
  newinfo.firstname = new_firstname;
  console.log(new_firstname);
}

function getLastName() {
  new_lastname = document.getElementById("newlastname").value;
  new_lastname =
    new_lastname[0].toUpperCase() +
    new_lastname.substring(1, new_lastname.length);
  newinfo.lastname = new_lastname;
}

function getMobile() {
  new_mobile = document.getElementById("newmobile").value;
  newinfo.mobile = new_mobile;
}

function getEmail() {
  new_email = document.getElementById("newemail").value;
  newinfo.email = new_email;
}

function getAddress() {
  new_address = document.getElementById("newaddress").value;
  newinfo.address = new_address;
}

//4-1. Add Box Control
//close info popup
document
  .querySelector(".addpopup-close")
  .addEventListener("click", function () {
    modifydataindex = "";
    console.log(modifydataindex);
    document.querySelector(".bg-modal").style.display = "none";
  });

//open add info popup
document.getElementById("addbutton").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "flex";
  console.log("addbuttonclick");
});

//5. Edit
let modifydata;
let modifydataindex;

function getEditedDataIndex(dataindex) {
  modifydataindex = dataindex;
  console.log(modifydataindex);
}

//5-1.fill currentinfo to inputbox

function openEditBox(dataindex) {
  modifydataindex = dataindex;
  console.log("editclick");
  console.log(modifydataindex);
  console.log(initialData[modifydataindex].firstname);
  document.querySelector(".bg-modal").style.display = "flex";

  document.getElementById(
    "newfirstname"
  ).value = `${initialData[modifydataindex].firstname}`;
  document.getElementById(
    "newlastname"
  ).value = `${initialData[modifydataindex].lastname}`;
  document.getElementById(
    "newmobile"
  ).value = `${initialData[modifydataindex].mobile}`;
  document.getElementById(
    "newemail"
  ).value = `${initialData[modifydataindex].email}`;
  document.getElementById(
    "newaddress"
  ).value = `${initialData[modifydataindex].address}`;
}

let modifiedinfo = {};
let modified_firstname;
let modified_lastname;
let modified_mobile;
let modified_email;
let modified_address;

function loadInfo() {
  let newFirstname = document.createTextNode(
    `${initialData[modifydataindex].firstname}`
  );
}

function checkModifyorAdd() {
  if (modifydataindex == undefined) {
    addNewInfo();
    console.log(modified_firstname);
    console.log("nonmodified");
  } else {
    newinfo_entries = Object.entries(newinfo);

    for (i = 0; i < newinfo_entries.length; ++i) {
      initialData[modifydataindex][newinfo_entries[i][0]] =
        newinfo_entries[i][1];
    }

    newinfo = {};

    initialData[modifydataindex];
    imglist = [
      "../icon/1752632-pokemon/png/032-avatar.png",
      "../icon/1752632-pokemon/png/033-avatar.png",
      "../icon/1752632-pokemon/png/034-avatar.png",
      "../icon/1752632-pokemon/png/036-avatar.png",
      "../icon/1752632-pokemon/png/037-avatar.png",
      "../icon/1752632-pokemon/png/039-avatar.png",
      "../icon/1752632-pokemon/png/041-avatar.png",
    ];
    let rand = Math.floor(Math.random() * imglist.length);
    newinfo.imgsrc = imglist[rand];

    //initialData[modifydataindex] = newinfo;

    document.querySelector(".bg-modal").style.display = "none";
  }
  displayPage();
}

//6. Toggle detail info under name
