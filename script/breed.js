'use strict';
// Title
const sidebarTitleEl = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');
sidebarTitleEl.addEventListener('click', function() {
    sidebarEl.classList.toggle('active');
});

const breedInput = document.querySelector('#input-breed');
const typeInput = document.querySelector('#input-type');
const submitBtn = document.querySelector('#submit-btn');
const breedTable = document.querySelector('#tbody');

// Tạo mảng breedArr
let breedArr = JSON.parse(getFromStorage('breed-Array')) || [];

// Kiểm tra dữ liệu nhập vào
function validateData(data) {
    // Kiểm tra dữ liệu trống
    if (data.breed === '') {
        alert('Please input for breed ');
        return false;
    }
    if (data.type === 'Select Type') {
        alert('Please select Type!');
        return false;
    }
    return true;
}
// Xóa breed theo tên
function deleteBreed(breedName) {
    for (let i = 0; i < breedArr.length; i++) {
        if (breedArr[i].breed == breedName) {
            breedArr.splice(i, 1);
            renderBreedTable(breedArr);
            deleteStorage('breed-Array');
            saveToStorage('breed-Array', JSON.stringify(breedArr));
        }
    }
}

// Xóa dữ liệu vừa nhập trên form
function clearInput() {
    typeInput.value = 'Select Type';
    breedInput.value = '';
}

// Hiện bảng breed
function renderBreedTable(breedArr) {
    breedTable.innerHTML = '';
    for (let i = 0; i < breedArr.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<tr>
        <th>${i + 1}</th>
        <td>${breedArr[i].breed}</td>
        <td>${breedArr[i].type}</td>
        <td>
          <button type="button" class="btn btn-danger" onclick=deleteBreed(${
            breedArr[i].breed
          })>Delete</button>
        </td>
      </tr>`;
        breedTable.appendChild(row);
    }
}

// Thêm breed
renderBreedTable(breedArr);
submitBtn.addEventListener('click', function() {
    const data = {
        breed: breedInput.value,
        type: typeInput.value,
    };
    // kiểm tra dữ liệu hợp lệ
    const checkvar = validateData(data);
    if (checkvar) {
        breedArr.push(data);
        saveToStorage('breed-Array', JSON.stringify(breedArr));
    }
    clearInput();
    renderBreedTable(breedArr);
});