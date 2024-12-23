class ScheduleTable {
  constructor(columnNames, tableItems, options) {
    this.columns = columnNames;
    this.rows = tableItems;
    if (options) {
      this.indexColumn = options.indexColumn || false;
      this.tableClasses = options.tableClassList || null;
      this.tableHeadClasses = options.tableHeadClassList || null;
      this.tableBodyClasses = options.tableBodyClassList || null;
    }
  }

  getTable() {
    //CREATING TABLE
    const table = document.createElement("table");
    this.tableClasses && table.classList.add(...this.tableClasses);

    //CREATING HEAD OF TABLE
    const tableHead = document.createElement("thead");
    this.tableHeadClasses && tableHead.classList.add(...this.tableHeadClasses);
    const rowHead = document.createElement("tr");
    if (this.indexColumn) {
      const indexField = document.createElement("th");
      indexField.setAttribute("scope", "col");
      indexField.textContent = "lp.";
      rowHead.appendChild(indexField);
    }
    this.columns.forEach((item) => {
      const headField = document.createElement("th");
      headField.setAttribute("scope", "col");
      headField.textContent = item;
      rowHead.appendChild(headField);
    });
    tableHead.appendChild(rowHead);

    //CREATING BODY OF TABLE
    const tableBody = document.createElement("tbody");
    this.tableBodyClasses && tableBody.classList.add(...this.tableBodyClasses);
    this.rows.forEach((row, index) => {
      const newRow = createTableRow(row, index);
      tableBody.appendChild(newRow);
    });

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    return table;
  }
}

function createTableRow(data, index) {
  const row = document.createElement("tr");
  if (this.indexColumn) {
    const indexField = document.createElement("th");
    indexField.setAttribute("scope", "row");
    indexField.textContent = index;
    row.appendChild(indexField);
  }
  Object.values(data).forEach((item) => {
    const commonField = document.createElement("td");
    commonField.textContent = item;
    row.appendChild(commonField);
  });
  return row;
}
