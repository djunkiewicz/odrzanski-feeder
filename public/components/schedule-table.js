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
      const indexField = createField("th", "lp.", "col");
      rowHead.appendChild(indexField);
    }
    this.columns.forEach((item) => {
      const headField = createField("th", item, "col");
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
    const indexField = createField("th", index, "row");
    row.appendChild(indexField);
  }
  Object.values(data).forEach((item) => {
    const commonField = createField("td", item);
    row.appendChild(commonField);
  });
  return row;
}

function createField(type, content, scope) {
  const field = document.createElement(String(type) || null);
  field.textContent = String(content) || null;
  field.setAttribute("scope", String(scope) || null);
  return field;
}
