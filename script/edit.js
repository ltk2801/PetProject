'use strict';
// Title
const sidebarTitleEl = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');
sidebarTitleEl.addEventListener('click', function() {
    sidebarEl.classList.toggle('active');
});
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
const tableBodyEl = document.getElementById('tbody');
const formEL = document.getElementById('container-form');
const submitBtn = document.getElementById('submit-btn');

var petArr = JSON.parse(getFromStorage('Pet-Array')) || [];

// hiển thị danh sách thú cưng lên trên bảng
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
        <td>
          <button type="button" class="btn btn-warning" onclick = editPet("${
            petArr[i].id
          }")>Edit</button>
        </td>
      </tr>`;
        tableBodyEl.appendChild(row);
    }
}
renderTableData(petArr);

// Chỉnh sửa Breed

const breedArr = JSON.parse(getFromStorage('breed-Array')) || [];

function renderBreed(breedArr) {
    for (let i = 0; i < breedArr.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = `<option>${breedArr[i].breed}</option>`;
        breedInput.appendChild(option);
    }
}

// Onchange event
const changeType = function() {
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
// Edit pet

function editPet(petID) {
    formEL.classList.remove('hide');
    const breedDog = breedArr.filter(obj => obj.type === 'Dog');
    const breedCat = breedArr.filter(obj => obj.type === 'Cat');
    // Hiện thị thông tin thú cưng
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id == petID) {
            if (petArr[i].type === 'Cat') {
                renderBreed(breedCat);
            }
            if (petArr[i].type === 'Dog') {
                renderBreed(breedDog);
            }
            idInput.value = petID;
            nameInput.value = petArr[i].petName;
            ageInput.value = petArr[i].age;
            typeInput.value = petArr[i].type;
            weightInput.value = petArr[i].weight;
            lengthInput.value = petArr[i].length;
            colorInput.value = petArr[i].color;
            vaccinInput.checked = petArr[i].vaccin;
            deworInput.checked = petArr[i].dewor;
            sterilizedInput.checked = petArr[i].sterilized;
            breedInput.value = petArr[i].breed;
        }
    }
}

// hàm kiểu tra dữ liệu hợp lệ
function validateData(data) {
    // Check không có dữ liệu bị nhập thiếu
    if (
        data.petName === '' &&
        data.age === '' &&
        data.weight === '' &&
        data.length === ''
    ) {
        alert('Please input');
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
    return true;
}
// Tạo 1 biến pet tạm

// Bắt sự kiện khi ấn vào Submit
submitBtn.addEventListener('click', function() {
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
    };
    // biến kiểm tra dữ liệu hộp lệ
    const checkvar = validateData(data);
    // Set time out
    let myTimeout;
    if (checkvar) {
        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].id === idInput.value) {
                const checkConfirm = confirm('Are you sure about that? ');
                if (checkConfirm) {
                    petArr[i].petName = nameInput.value;
                    petArr[i].age = ageInput.value;
                    petArr[i].type = typeInput.value;
                    petArr[i].weight = weightInput.value;
                    petArr[i].length = lengthInput.value;
                    petArr[i].color = colorInput.value;
                    petArr[i].breed = breedInput.value;
                    petArr[i].vaccin = vaccinInput.checked;
                    petArr[i].dewor = deworInput.checked;
                    petArr[i].sterilized = sterilizedInput.checked;
                    alert('You have successfully fixed !');
                    myTimeout = setTimeout(function() {
                        formEL.classList.add('hide');
                    }, 1000);
                }
                console.log(petArr);
                saveToStorage('Pet-Array', JSON.stringify(petArr));
            }
        }
    }
    renderTableData(petArr);
});