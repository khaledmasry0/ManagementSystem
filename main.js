let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let createbtnname = "create";
let empty;
let searchempty = "title";

// total price

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = " ";
    total.style.backgroundColor = "#6b3131";
  }
}

//adding data to local storage
//creating an array of objects

let data;

if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

submit.onclick = function () {
  let myobj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (createbtnname === "create") {
    if (myobj.count > 1) {
      for (i = 0; i < myobj.count; i++) {
        data.push(myobj);
      }
    } else {
      data.push(myobj);
    }
  } else {
    data[empty] = myobj; // ###############################################
    createbtnname = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(data));
  clrear();
  addingDom();
};

function clrear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  ads.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
  total.style.backgroundColor = "#6b3131";
}

//creating elements inside table

function addingDom() {
  let tabledata = "";
  for (let i = 0; i < data.length; i++) {
    tabledata += `
    <tr>
      <td>${i + 1}</td>
      <td>${data[i].title}</td>
      <td>${data[i].price}</td>
      <td>${data[i].taxes}</td>
      <td>${data[i].ads}</td>
      <td>${data[i].discount}</td>
      <td>${data[i].total}</td>
      <td>${data[i].category}</td>
      <td><button id="update" onclick = "updateproduct(${i})" >update</button></td>
      <td><button id="delate" onclick = "deleteproduct(${i})" >delete</button></td>
  </tr>
    `;
  }
  document.querySelector(".tbody").innerHTML = tabledata;
  let deletebutton = document.querySelector(".deleteAll");
  if (data.length > 0) {
    deletebutton.innerHTML = `
    <button onclick = "deletall()">delete all (${data.length})</button>
    `;
  } else {
    deletebutton.innerHTML = "";
  }
}
addingDom();

//deleting an product

function deleteproduct(index) {
  // confirm("are you sure");
  // data.splice(index, 1);
  // localStorage.product = JSON.stringify(data);
  // addingDom();
  if (confirm("are you sure you want to delete this product")) {
    data.splice(index, 1);
    localStorage.product = JSON.stringify(data);
    addingDom();
  }
}

function deletall() {
  if (confirm("are you sure you want to delete all Products")) {
    localStorage.clear();
    data.splice(0);
    addingDom();
  }
}

//update a product

function updateproduct(index) {
  title.value = data[index].title;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  price.value = data[index].price;
  taxes.value = data[index].taxes;
  ads.value = data[index].ads;
  discount.value = data[index].discount;
  getTotal();
  count.style.display = "none";
  category.value = data[index].category;
  submit.innerHTML = "Update";
  createbtnname = "update";
  empty = index;
  search.value = "";
  // title.focus();
}

// when using search bar

function changingsearch(id) {
  if (id == "searchTitle") {
    searchempty = "title";
    search.setAttribute("Placeholder", "Search by title");
  } else {
    searchempty = "category";
    search.setAttribute("Placeholder", "Search by category");
  }
  search.focus();
  search.value = "";
  addingDom();
}

function searchdata(value) {
  let tabledata = "";
  if (searchempty == "title") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().includes(value.toLowerCase())) {
        tabledata += `
    <tr>
      <td>${i + 1}</td>
      <td>${data[i].title}</td>
      <td>${data[i].price}</td>
      <td>${data[i].taxes}</td>
      <td>${data[i].ads}</td>
      <td>${data[i].discount}</td>
      <td>${data[i].total}</td>
      <td>${data[i].category}</td>
      <td><button id="update" onclick = "updateproduct(${i})" >update</button></td>
      <td><button id="delate" onclick = "deleteproduct(${i})" >delete</button></td>
    </tr>
      `;
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].category.toLowerCase().includes(value.toLowerCase())) {
        tabledata += `
    <tr>
      <td>${i + 1}</td>
      <td>${data[i].title}</td>
      <td>${data[i].price}</td>
      <td>${data[i].taxes}</td>
      <td>${data[i].ads}</td>
      <td>${data[i].discount}</td>
      <td>${data[i].total}</td>
      <td>${data[i].category}</td>
      <td><button id="update" onclick = "updateproduct(${i})" >update</button></td>
      <td><button id="delate" onclick = "deleteproduct(${i})" >delete</button></td>
    </tr>
      `;
      }
    }
  }
  document.querySelector(".tbody").innerHTML = tabledata;
}

//FINISH ########################################
