$(document).ready(function () {});

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
        (higestindex = initialData.length - 1);
    });
}

//1.Dispay Data
function displayPage() {
  //Insert HTML tag to ".personinfo" div tag
  let htmlString = "";
  const container = $(".personinfo");
  //get search strings from searchbox
  let searchstring = $("#myInput").val();

  //create name group by first letter of first name
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  alphabet = alphabet.toUpperCase();

  if (searchstring === "") {
    for (j = 0; j < alphabet.length; j++) {
      htmlString += `<div class="contactlist">${alphabet[j]}</div>`; //->create divide box
      for (i = 0; i < initialData.length; i++) {
        if (initialData[i].firstname.length > 0) {
          if (alphabet[j] === initialData[i].firstname[0]) {
            htmlString += createHTMLstring(initialData[i]);
          }
        } else if (initialData[i].lastname.length > 0) {
          if (alphabet[j] === initialData[i].lastname[0]) {
            htmlString += createHTMLstring(initialData[i]);
          }
        }
      }
    }
    container.html(htmlString);
  } else {
    htmlString = "";
    const container = $(".personinfo");
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
        searchstring_lower === lastname_lower ||
        searchstring_lower === `${firstname_lower} ${lastname_lower}`
      ) {
        htmlString += createHTMLstring(initialData[i]);
        container.html(htmlString);
      }
    }
  }
}

function createHTMLstring(initialData) {
  return `
    <div id ="info-toggle" class="name" onclick="$('#detail-info${initialData.dataindex}').toggle();">
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
let deletecounter = 0;
function openDeleteBox(fullname) {
  deletecounter++;
  deleted_data = fullname;
  $(".delete-modal").css("display", "flex").show();
  console.log("open delete box");
}

function deleteName() {
  console.log("delete name");
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
  $(".delete-modal").hide();
}

//3-1. Delete Box Control
//close delete box
$(".deletepopup-close").click(function () {
  $(".delete-modal").hide();
});

$(".discard").click(function () {
  $(".delete-modal").hide();
});

getData();
displayPage();

//4. Addinfo
let newinfo = {};

//Activate when popup submit button click
function addNewInfo() {
  adddataindex = higestindex + 1;
  newinfo.dataindex = String(adddataindex);
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
  initialData.push(newinfo);
  $(".bg-modal").hide();
  newinfo = {};
  modifiedinfo = {};
  displayPage();
}

//Get New Info from popup window
function uppercaseName(str) {
  if (str === "") {
    return str;
  } else {
    return str[0].toUpperCase() + str.substring(1, str.length);
  }
}

function getFirstName() {
  str = $("#newfirstname").val();
  newinfo.firstname = uppercaseName(str);
}

function getLastName() {
  str = $("#newlastname").val();
  newinfo.lastname = uppercaseName(str);
}

function getMobile() {
  new_mobile = $("#newmobile").val();
  newinfo.mobile = new_mobile;
}

function getEmail() {
  new_email = $("#newemail").val();
  newinfo.email = new_email;
}

function getAddress() {
  new_address = $("#newaddress").val();
  newinfo.address = new_address;
}

//4-1. Add Box Control
//close info popup
$(".addpopup-close").click(function () {
  modifydataindex = "";
  console.log(modifydataindex);
  $(".bg-modal").hide();
});

//open add info popup
$(".addnew").click(function () {
  $(".bg-modal").css("display", "flex").show();
  $("#newfirstname").val("");
  $("#newlastname").val("");
  $("#newmobile").val("");
  $("#newemail").val("");
  $("#newaddress").val("");
  console.log("addbuttonclick");
  modifydataindex = undefined;
});

//5. Edit
let modifydata;
let modiftdataindex;
function findId(id) {
  return initialData.findIndex(function (entry) {
    return entry.dataindex == id;
  });
}

//5-1.Fill currentinfo to inputbox
function openEditBox(dataindex) {
  console.log(deletecounter);
  console.log(dataindex);
  console.log("editclick");

  modifydataindex = findId(dataindex);

  console.log(initialData[modifydataindex].firstname);
  $(".bg-modal").css("display", "flex").show();

  $("#newfirstname").val(`${initialData[modifydataindex].firstname}`);
  $("#newlastname").val(`${initialData[modifydataindex].lastname}`);
  $("#newmobile").val(`${initialData[modifydataindex].mobile}`);
  $("#newemail").val(`${initialData[modifydataindex].email}`);
  $("#newaddress").val(`${initialData[modifydataindex].address}`);
}

function loadInfo() {
  let newFirstname = document.createTextNode(
    `${initialData[modifydataindex].firstname}`
  );
  console.log(newFirstname);
}

function checkModifyorAdd() {
  if (modifydataindex == undefined) {
    addNewInfo();
    console.log("nonmodified");
  } else {
    newinfo_entries = Object.entries(newinfo);

    for (i = 0; i < newinfo_entries.length; ++i) {
      initialData[modifydataindex][newinfo_entries[i][0]] =
        newinfo_entries[i][1];
    }

    newinfo = {};

    $(".bg-modal").hide();
  }
  displayPage();
  console.log(initialData);
}

//HTML Events
$(".searchbox").keyup(function () {
  displayPage();
});

$(".newfirstname").keyup(function () {
  getFirstName();
});
$(".lastname").keyup(function () {
  getLastName();
});
$(".mobile").keyup(function () {
  getMobile();
});
$(".email").keyup(function () {
  getEmail();
});
$(".address").keyup(function () {
  getAddress();
});

$(".submitbutton").on("click", function () {
  if (newinfo.firstname === "" || newinfo.lastname === "") {
    mandatoryalert();
  } else {
    checkModifyorAdd();
  }
});

$(".yes").click(function () {
  deleteName();
});

// $("#info-toggle").click(function () {
//   $(".detailinfo").toggle();
//   console.log("clicked");
// });
