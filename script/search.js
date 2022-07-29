'use strict';
// Title
const sidebarTitleEl = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');
sidebarTitleEl.addEventListener('click', function() {
    sidebarEl.classList.toggle('active');
});

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const typeInput = document.getElementById('input-type');
const breedInput = document.getElementById('input-breed');
const vaccinInput = document.getElementById('input-vaccinated');
const deworInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const findBtn = document.getElementById('find-btn');
const tableBodyEl = document.getElementById('tbody');

// Lấy mảng thú cưng
var petArr = JSON.parse(getFromStorage('Pet-Array'));

// Chỉnh sửa Breed

const breedArr = JSON.parse(getFromStorage('breed-Array'));

function renderBreed(breedArr) {
    for (let i = 0; i < breedArr.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = `<option>${breedArr[i].breed}</option>`;
        breedInput.appendChild(option);
    }
}

// Onchange event
const changeType = function() {
    // breedInput.innerHTML = `<option>Select Breed </option>`;
    // Lấy danh sách breed theo hết
    renderBreed(breedArr);
};
changeType();
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
      </tr>`;
        tableBodyEl.appendChild(row);
    }
}
findBtn.addEventListener('click', function() {
    // Giá trị cần tìm kiếm
    const searchId = idInput.value.toLowerCase();
    const searchName = nameInput.value.toLowerCase();
    const searchType = typeInput.value;
    const searchBreed = breedInput.value;
    const searchVaccin = vaccinInput.checked;
    const searchDewor = deworInput.checked;
    const searchSter = sterilizedInput.checked;
    let filteredPet = [];
    if (!searchId &&
        !searchName &&
        !searchType &&
        !searchBreed &&
        !searchVaccin &&
        !searchSter &&
        !searchDewor
    ) {
        filteredPet = petArr.filter(pet => {
            return (
                pet.vaccin === searchVaccin &&
                pet.dewor === searchDewor &&
                pet.sterilized === searchSter
            );
        });
    } else {
        filteredPet = petArr.filter(pet => {
            return (
                pet.id.toLowerCase().includes(searchId) &&
                pet.petName.toLowerCase().includes(searchName) &&
                pet.type.includes(searchType) &&
                pet.breed.includes(searchBreed)
            );
        });
        if (searchVaccin) {
            filteredPet = filteredPet.filter(pet => pet.vaccin === searchVaccin);
        }
        if (searchDewor) {
            filteredPet = filteredPet.filter(pet => pet.dewor === searchDewor);
        }
        if (searchSter) {
            filteredPet = filteredPet.filter(pet => pet.sterilized === searchSter);
        }
    }
    console.log(searchVaccin);
    renderTableData(filteredPet);
});