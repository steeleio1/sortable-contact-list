import $ from 'jquery';

var allResults; //stores results from API call

//=============== Run API call ===========
function getNames() {
  return $.ajax({
    url: "https://demo1227708.mockable.io/people",
  });
}

getNames().then(renderPeople);

//======= Render people to table, on page load ========
function renderPeople(response) {
  allResults = response;
  let ascArray = allResults.slice(0);
  let ageSortASC = ascArray.sort(sortByAge);
  renderTable(ascArray); //grab renderTable func, plug in data from ascArray to fill table
  //console.log(response, "getNames works");
  //console.log(allResults, "allResults array");
  //console.log(ageSortASC, "ageSortASC: ");
}

//========= Generate Person Template ======
function personTemplate(data) {
  if (data.age < 21) {
    var underageClass = "underage";
  } else {
    var underageClass = "";
  }
  return `
	    <li class="nameBox ${underageClass}">
  			<span class="name"> ${data.firstName} ${data.lastName}</span>
	  		<span class="age">Age: ${data.age}</span>
      </li>
	  `;
}

//============= Sort Age ======================
function sortByAge(a, b) {
  if (a.age < b.age) {
    return -1;
  }
  if (a.age > b.age) {
    return 1;
  }
  return 0;
}

//============= Sort First Name =================
function sortByFirstName(a, b) {
  if (a.firstName < b.firstName) {
    return -1;
  }
  if (a.firstName > b.firstName) {
    return 1;
  }
  return 0;
}

//============= Sort Last Name =================
function sortByLastName(a, b) {
  if (a.lastName < b.lastName) {
    return -1;
  }
  if (a.lastName > b.lastName) {
    return 1;
  }
  return 0
}

//=============== Render Table ================
function renderTable(items) {
  $("ul").html(""); //clears table
  items.forEach(function(person) {
    let html = personTemplate(person);
    $(".nameListBox").append(html);
  });
}

//======== iterate user selections on button click ======
$(".button").on("click", updateTable);

function updateTable(event) {
  let filter = $("select").val();
  //console.log(filter);
  let direction = $(".radio:checked").val();
  if (filter === "age") {
    var sortedItems = allResults.sort(sortByAge);
  } else if (filter === "firstName") {
    var sortedItems = allResults.sort(sortByFirstName);
  } else if (filter === "lastName") {
    var sortedItems = allResults.sort(sortByLastName);
  }

  if (direction !== "asc") {
    sortedItems = sortedItems.reverse();
  }

  renderTable(sortedItems); //get&run renderTable func, plug in 		sortedItems data to put make HTML table
}
