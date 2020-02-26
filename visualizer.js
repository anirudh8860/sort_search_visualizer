var tbl, input_arr;
var binaryClicked = false, linearClicked = false;
var timeoutTime = 1000, range = 1000;

function showSearchInput(visibility) {
  let searchPara = document.getElementById("search_para");

  searchPara.style.visibility = visibility;
}

function setSearchValue(val1, val2) {
  if (tbl) {
    tbl.remove();
  }
  linearClicked = val1;
  binaryClicked = val2;

  showSearchInput("visible");
}

function createTable() {
  tbl = document.createElement('table');
  input_arr = generateInput();

  if (input_arr.length == 0) {
    alert("Please enter data set or data set size!!!!!")
  }

  console.log(input_arr);

  if (binaryClicked) {
    input_arr = quickSort(input_arr, 0, input_arr.length - 1);
  }

  let body = document.getElementsByTagName('body')[0];
  tbl.style.height = '100px';
  tbl.setAttribute('align', 'center');
  let tbdy = document.createElement('tbody');
  let tr = tbl.insertRow(0);
  for (let i in input_arr) {
      var td = tr.insertCell();
      td.style.textAlign = "center";
      td.innerHTML = input_arr[i];
      tr.appendChild(td);
      tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl);
}

function generateInput() {
  let arr = [];
  let getInput = document.getElementById("user_input").value;
  let randomLength = document.getElementById("random_length").value;

  if (getInput) {
    arr = getInput.split(",");

    for (let i in input_arr)
      arr[i] = parseInt(arr[i]);
  }
  else if (randomLength) {
    randomLength = parseInt(randomLength);
    console.log(randomLength);

    for (let i = 0; i < randomLength; i++)
      arr[i] = getDistinctValue(arr, range);
  }

  return arr;
}

function getDistinctValue(array, range){
   var n = Math.floor((Math.random() * range));
   if(array.indexOf(n) == -1){
    return n;
   } else {
    return getDistinctValue(array, range);
   }
}

function doSearch() {
  let index = -1;
  let val;
  if (tbl) {
    tbl.remove();
  }

  if (linearClicked) {
    createTable();
    let data = tbl.getElementsByTagName("td");
    val = document.getElementById("search_data").value;

    for (let i = 0; i < data.length; i++)
      data[i].style.backgroundColor = "white"

    index = linearSearch(data, val);
    displayOutput(val, index);
  }
  else if (binaryClicked) {
    createTable();
    let data = tbl.getElementsByTagName("td");
    val = document.getElementById("search_data").value;

    for (let i = 0; i < data.length; i++)
      data[i].style.backgroundColor = "white"

    index = binarySearch(data, val);
    displayOutput(val, index);
  }
  else {
    console.log("No search selected");
    alert("Select a search type!!!!")
  }

}

function displayOutput(val, index) {
  if (index != -1)
    textNode = "Value " + val + " found at " + index + " from start";
  else
    textNode = "Value " + val + " not found in list"

  document.getElementById("output").innerHTML = textNode;
}

function linearSearch(data, val) {
  let index = -1;
  for (let i = 0; i < data.length; i++)  {
    if (val == input_arr[i]) {
      setTimeout(function () {
          data[i].style.backgroundColor = "green";
      }, timeoutTime*(i+1));
      index = i;
      break;
    }
    else {
      setTimeout(function () {
          data[i].style.backgroundColor = "red";
      }, timeoutTime*(i+1));
    }
  }

  return index;
}

function binarySearch(data, val) {
  let low = 0;
  let high = data.length - 1;
  let j = 1;
  let index = -1;
  let textNode;

  while (low <= high) {
    let i = Math.floor((low + high) / 2);
    if (val == input_arr[i]) {
      setTimeout(function () {
          data[i].style.backgroundColor = "green";
      }, timeoutTime*j++);
      index = i;
      break;
    }
    else if (input_arr[i] < val) {
      setTimeout(function () {
          data[i].style.backgroundColor = "red";
      }, timeoutTime*j++);
      low = i + 1;
    }
    else {
      setTimeout(function () {
          data[i].style.backgroundColor = "red";
      }, timeoutTime*j++);
      high = i - 1;
    }
  }

  return index;
}


function doSort(val3, val4) {
  if (tbl) {
    tbl.remove();
  }
  showSearchInput("hidden");
  linearClicked = false;
  binaryClicked = false;

  createTable();
  let data = tbl.getElementsByTagName("td");

  for (let i = 0; i < data.length; i++)
      data[i].style.backgroundColor = getRandomColor();

  if (val3)
    selectionSort(data);
  else if (val4)
    bubbleSort(data);
  else
    console.log("No sort selected");
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function selectionSort(data) {
  let len = data.length;
  for (let i = 0; i < len; i++) {
    let min = i;

    setTimeout(function() {
      for (let j = i + 1; j < len; j++) {
          if (input_arr[min] > input_arr[j]) {
              min = j;
          }
      }
      if (min !== i) {
          let temp = input_arr[i];

          input_arr[i] = input_arr[min];
          data[i].innerHTML = data[min].innerHTML;

          input_arr[min] = temp;
          data[min].innerHTML = temp;
      }
    }, timeoutTime*(i+1));
  }
}

function bubbleSort(data) {
  let len = data.length;
  for (let i = 0; i < len; i++) {
    setTimeout(function() {
      for (let j = 0; j < len; j++) {
        if (input_arr[j] > input_arr[j + 1]) {
          let temp = input_arr[j];

          input_arr[j] = input_arr[j + 1];
          data[j].innerHTML = data[j+1].innerHTML;

          input_arr[j + 1] = temp;
          data[j+1].innerHTML = temp;
        }
      }
    }, timeoutTime*(i+1));
  }
}

function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
      index = partition(items, left, right);
      if (left < index - 1) {
          quickSort(items, left, index - 1);
      }
      if (index < right) {
          quickSort(items, index, right);
      }
  }
  return items;
}

function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)],
      i = left,
      j = right;
  while (i <= j) {
      while (items[i] < pivot) {
          i++;
      }
      while (items[j] > pivot) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
      }
  }
  return i;
}

function swap(items, leftIndex, rightIndex){
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
