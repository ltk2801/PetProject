'use strict';
// Title
const sidebarTitleEl = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');
sidebarTitleEl.addEventListener('click', function() {
    sidebarEl.classList.toggle('active');
});
// Lấy DOM Element
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinInput = document.getElementById('input-vaccinated');
const deworInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const submitBtn = document.getElementById('submit-btn');
const showHealthy = document.getElementById('healthy-btn');
const tableBodyEl = document.getElementById('tbody');
const showAll = document.getElementById('all-btn');
const BMI = document.getElementById('BMI-btn');

var petArr = JSON.parse(getFromStorage('Pet-Array')) || [];
var petArrHealthy = JSON.parse(getFromStorage('Pet-Array-HT')) || [];

function checkHealthy(data) {
    if (data.vaccin && data.dewor && data.sterilized) {
        return true;
    }
    return false;
}

// hàm kiểu tra dữ liệu hợp lệ
function validateData(data) {
    // Check không có dữ liệu bị nhập thiếu
    if (
        data.id === '' &&
        data.petName === '' &&
        data.age === '' &&
        data.weight === '' &&
        data.length === ''
    ) {
        alert('Please input');
        return false;
    }
    if (data.id === '') {
        alert('Please input for Pet ID');
        return false;
    }
    if (data.petName === '') {
        alert('Please input for Pet Name');
        return false;
    }
    if (data.age === '') {
        alert('Please input for Age');
        return false;
    }
    if (data.weight === '') {
        alert('Please input for Weight');
        return false;
    }
    if (data.length === '') {
        alert('Please input for Length');
        return false;
    }
    // Check Age
    if (data.age < 1 || data.age > 15) {
        alert('Age must be between 1 and 15!');
        return false;
    }

    // Check Weight
    if (data.weight < 1 || data.weight > 15) {
        alert('Weight must be between 1 and 15!');
        return false;
    }
    // Check Length
    if (data.length < 1 || data.length > 100) {
        alert('Length must be between 1 and 100!');
        return false;
    }
    // Check Type
    if (data.type === 'Select Type') {
        alert('Please select Type!');
        return false;
    }
    // Check breed
    if (data.breed === 'Select Breed') {
        alert('Please select Breed!');
        return false;
    }
    // Check Trùng ID
    for (let i = 0; i < petArr.length; i++) {
        if (data.id == petArr[i].id) {
            alert('duplicate ID !');
            return false;
        }
    }

    return true;
}
// Xóa dữ liệu vừa nhập trên form
function clearInput() {
    idInput.value = '';
    nameInput.value = '';
    ageInput.value = '';
    typeInput.value = 'Select Type';
    weightInput.value = '';
    lengthInput.value = '';
    colorInput.value = '#000000';
    breedInput.value = 'Select Breed';
    vaccinInput.checked = false;
    deworInput.checked = false;
    sterilizedInput.checked = false;
}
// Xóa bảng hiện có và hiển thị danh sách lên trên bảng

function renderTableData(petArr) {
    tableBodyEl.innerHTML = '';
    for (let i = 0; i < petArr.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<tr>
        <th>${petArr[i].id}</th>
        <td>${petArr[i].petName}</td>
        <td>${petArr[i].age}</td>
        <td>${petArr[i].type}</td>
        <td>${petArr[i].weight} kg</td>
        <td>${petArr[i].length} cm</td>
        <td>${petArr[i].breed}</td>
        <td>
          <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
        </td>
        <td>${
          // Nếu Vaccin là true thì hiển thị icon check, không thì X
          petArr[i].vaccin
            ? '<i class="bi bi-check-circle-fill"></i>'
            : '<i class="bi bi-x-circle-fill"></i>'
        } </td>
        <td>
        ${
          petArr[i].dewor
            ? '<i class="bi bi-check-circle-fill"></i>'
            : '<i class="bi bi-x-circle-fill"></i>'
        }</td>
        <td>
        ${
          petArr[i].sterilized
            ? '<i class="bi bi-check-circle-fill"></i>'
            : '<i class="bi bi-x-circle-fill"></i>'
        }</td>
        <td>${petArr[i].bmi ? petArr[i].bmi : `?`} </td>
        <td>
          <button type="button" class="btn btn-danger" onclick=deletePet("${
            petArr[i].id
          }")>Delete</button>
        </td>
      </tr>`;
    tableBodyEl.appendChild(row);
  }
}

//  Xóa pet

function deletePet(petID) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id == petID) {
      // Đồng thời xóa pet khỏe mạnh ra khỏi mảng
      for (let j = 0; j < petArrHealthy.length; j++) {
        if (petArr[i].id == petArrHealthy[j].id) {
          petArrHealthy.splice(j, 1);
          deleteStorage('Pet-Array-HT');
          saveToStorage('Pet-Array-HT', JSON.stringify(petArrHealthy));
        }
      }
      const checkConfirm = confirm('Are you sure about that?');
      if (checkConfirm) {
        petArr.splice(i, 1);
        renderTableData(petArr);
        deleteStorage('pet-Array');
        saveToStorage('Pet-Array', JSON.stringify(petArr));
        alert('You have successfully deleted');
      }
    }
  }
}
// Hàm chuyển đổi nút show all và show healthy Pet

function switchBtn() {
  showHealthy.classList.toggle('hidden');
  showAll.classList.toggle('hidden');
}
//

renderTableData(petArr);
// Thêm thú cưng
submitBtn.addEventListener('click', function () {
  const data = {
    id: idInput.value,
    petName: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccin: vaccinInput.checked,
    dewor: deworInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
    bmi: 0,
  };
  // biến kiểm tra dữ liệu hộp lệ
  const checkvar = validateData(data);
  // kiểm tra khỏe mạnh
  const checkvar1 = checkHealthy(data);

  if (checkvar) {
    petArr.push(data);
    saveToStorage('Pet-Array', JSON.stringify(petArr));
    if (checkvar1) {
      petArrHealthy.push(data);
      saveToStorage('Pet-Array-HT', JSON.stringify(petArrHealthy));
    }
    clearInput();
  }

  renderTableData(petArr);
});

showHealthy.addEventListener('click', function () {
  switchBtn();
  renderTableData(petArrHealthy);
});

showAll.addEventListener('click', function () {
  switchBtn();
  renderTableData(petArr);
});

BMI.addEventListener('click', function () {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === 'Dog') {
      petArr[i].bmi = (
        (petArr[i].weight * 703) /
        petArr[i].length ** 2
      ).toFixed(2);
    } else {
      petArr[i].bmi = (
        (petArr[i].weight * 886) /
        petArr[i].length ** 2
      ).toFixed(2);
    }
  }
  renderTableData(petArr);
});

// Hiển thị breed trong màn hình quản lý thú cưng

const breedArr = JSON.parse(getFromStorage('breed-Array')) || [];

function renderBreed(breedArr) {
  for (let i = 0; i < breedArr.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = `<option>${breedArr[i].breed}</option>`;
    breedInput.appendChild(option);
  }
}

// Onchange event
const changeType = function () {
  breedInput.innerHTML = `<option>Select Breed </option>`;
  // Lấy danh sách breed theo type
  const breedDog = breedArr.filter(obj => obj.type === 'Dog');
  const breedCat = breedArr.filter(obj => obj.type === 'Cat');
  if (typeInput.value === 'Cat') {
    renderBreed(breedCat);
  }
  if (typeInput.value === 'Dog') {
    renderBreed(breedDog);
  }
};