document.addEventListener('DOMContentLoaded', function () {
    fetchData();
  });
  
  const itemsPerPage = 10; // Number of items to display per page
  let currentPage = 1;
  let allCurrencies = [];
  
  function fetchData() {
    const url = 'https://api.coinbase.com/v2/currencies/';
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        allCurrencies = data.data;
        displayData();
        setupPagination(allCurrencies.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  function displayData() {
    const table = document.getElementById('data-table');
    const tbody = document.getElementById('data-body');
    const pageCountDisplay = document.getElementById('page-count');
  
    // Clear existing rows
    while (tbody.rows.length > 0) {
      tbody.deleteRow(0);
    }
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedCurrencies = allCurrencies.slice(startIndex, endIndex);
  
    displayedCurrencies.forEach(currency => {
      const row = tbody.insertRow();
      const idCell = row.insertCell(0);
      const nameCell = row.insertCell(1);
  
      idCell.textContent = currency.id;
      nameCell.textContent = currency.name;
    });
  
    // Update page count display
    pageCountDisplay.textContent = `Page ${currentPage} of ${Math.ceil(allCurrencies.length / itemsPerPage)}`;
  }
  
  function setupPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById('pagination-container');
  
    // Clear existing pagination
    paginationContainer.innerHTML = '';
  
    const paginationList = document.createElement('ul');
    paginationList.classList.add('pagination', 'justify-content-center');
  
    // Create "Previous" button
    const previousPageItem = document.createElement('li');
    previousPageItem.classList.add('page-item');
    const previousPageLink = document.createElement('a');
    previousPageLink.href = '#';
    previousPageLink.textContent = 'Previous';
    previousPageLink.classList.add('page-link');
    previousPageLink.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--;
        displayData();
      }
    });
    previousPageItem.appendChild(previousPageLink);
    paginationList.appendChild(previousPageItem);
  
    // Create page numbers (up to 3)
    for (let i = 1; i <= Math.min(totalPages, 3); i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
  
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.classList.add('page-link');
      pageLink.addEventListener('click', function () {
        currentPage = i;
        displayData();
      });
  
      pageItem.appendChild(pageLink);
      paginationList.appendChild(pageItem);
    }
  
    // Create "Next" button for the rest of the pages
    const nextPageItem = document.createElement('li');
    nextPageItem.classList.add('page-item');
    const nextPageLink = document.createElement('a');
    nextPageLink.href = '#';
    nextPageLink.textContent = 'Next';
    nextPageLink.classList.add('page-link');
    nextPageLink.addEventListener('click', function () {
      if (currentPage < totalPages) {
        currentPage++;
        displayData();
      }
    });
    nextPageItem.appendChild(nextPageLink);
    paginationList.appendChild(nextPageItem);
  
    paginationContainer.appendChild(paginationList);
  }
  