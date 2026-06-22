/*eslint-disable*/

var fields = [
    { fieldName: "Year", dataType: "number" },
    { fieldName: "Month", dataType: "number" },
    { fieldName: "Day", dataType: "number" },
    { fieldName: "Code", dataType: "text" },
    { fieldName: "Customer", dataType: "text" },
    { fieldName: "BusinessNo", dataType: "text" },
    { fieldName: "TaxType", dataType: "text" },
    { fieldName: "ItemName", dataType: "text" },
    { fieldName: "Quantity", dataType: "number" },
    { fieldName: "UnitPrice", dataType: "number" },
    { fieldName: "SupplyAmount", dataType: "number" },
    { fieldName: "Vat", dataType: "number" },
    { fieldName: "TotalAmount", dataType: "number" },
    { fieldName: "Electronic", dataType: "text" },
    { fieldName: "Journal", dataType: "text" },
    { fieldName: "MenuAction", dataType: "text" },
];

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderDayBadge(value) {
    if (value === null || value === undefined || value === "") return "";
    return (
        '<span class="day-cell"><span class="day-badge-anchor"><span class="day-value">' +
        escapeHtml(value) +
        '</span><span class="ds-corner-badge"><span>N</span></span></span></span>'
    );
}

function renderTaxBadge(value) {
    if (!value) return "";

    var className = value === "면건" ? "ds-badge-info" : "ds-badge-error";
    return '<span class="ds-badge ' + className + '">' + escapeHtml(value) + "</span>";
}

function renderMenuButton(value) {
    if (!value) return "";
    return '<button type="button" class="menu-move-button">' + escapeHtml(value) + "</button>";
}

function formatNumber(value) {
    return Number(value || 0).toLocaleString("ko-KR");
}

function getCustomerSubtotal(fieldName, customerName) {
    return data.reduce(function (sum, row) {
        if (row.Customer !== customerName) return sum;
        var value = Number(row[fieldName]);
        return Number.isFinite(value) ? sum + value : sum;
    }, 0);
}

function getCustomerSubtotalText(fieldName, customerName) {
    return formatNumber(getCustomerSubtotal(fieldName, customerName));
}

function getTotal(fieldName) {
    return data.reduce(function (sum, row) {
        var value = Number(row[fieldName]);
        return Number.isFinite(value) ? sum + value : sum;
    }, 0);
}

function getTotalText(fieldName) {
    return formatNumber(getTotal(fieldName));
}

function setCurrentHeaderStyle(gridView, columnName) {
    columns.forEach(function (column) {
        if (!column.header) return;
        gridView.setColumnProperty(column.name, "header", {
            text: column.header.text,
            styleName: column.name === columnName ? "selected-column-header" : "",
        });
    });
}

var columns = [
    {
        name: "Year",
        fieldName: "Year",
        width: "60",
        numberFormat: "#",
        styleName: "center-column",
        header: { text: "년" },
    },
    {
        name: "Month",
        fieldName: "Month",
        width: "46",
        numberFormat: "#",
        styleName: "center-column",
        header: { text: "월" },
    },
    {
        name: "Day",
        fieldName: "Day",
        width: "48",
        numberFormat: "#",
        styleName: "center-column day-column",
        renderer: {
            type: "html",
            callback: function (grid, cell) {
                return renderDayBadge(cell.value);
            },
        },
        header: { text: "일" },
    },
    {
        name: "Code",
        fieldName: "Code",
        width: "96",
        styleName: "center-column",
        header: { text: "Code" },
    },
    {
        name: "Customer",
        fieldName: "Customer",
        width: "128",
        header: { text: "거래처" },
    },
    {
        name: "BusinessNo",
        fieldName: "BusinessNo",
        width: "140",
        styleName: "center-column",
        header: { text: "사업자(주민)등록번호" },
        footers: [
            { text: "업체별소계", styleName: "subtotal-footer-label" },
            { text: "전체합계", styleName: "total-footer-label" },
        ],
    },
    {
        name: "TaxType",
        fieldName: "TaxType",
        width: "62",
        styleName: "center-column",
        renderer: {
            type: "html",
            callback: function (grid, cell) {
                return renderTaxBadge(cell.value);
            },
        },
        header: { text: "유형" },
    },
    {
        name: "ItemName",
        fieldName: "ItemName",
        width: "110",
        header: { text: "품명" },
    },
    {
        name: "Quantity",
        fieldName: "Quantity",
        width: "98",
        numberFormat: "#,##0",
        styleName: "right-column",
        header: { text: "수량" },
        footers: [
            {
                styleName: "right-column subtotal-footer-value",
                valueCallback: function () {
                    return getCustomerSubtotalText("Quantity", "거래처4");
                },
            },
            {
                styleName: "right-column total-footer-value",
                valueCallback: function () {
                    return getTotalText("Quantity");
                },
            },
        ],
    },
    {
        name: "UnitPrice",
        fieldName: "UnitPrice",
        width: "72",
        numberFormat: "#,##0",
        styleName: "right-column",
        header: { text: "단가" },
    },
    {
        name: "SupplyAmount",
        fieldName: "SupplyAmount",
        width: "112",
        numberFormat: "#,##0",
        styleName: "right-column",
        header: { text: "공급가액" },
        footers: [
            {
                styleName: "right-column subtotal-footer-value",
                valueCallback: function () {
                    return getCustomerSubtotalText("SupplyAmount", "거래처4");
                },
            },
            {
                styleName: "right-column total-footer-value",
                valueCallback: function () {
                    return getTotalText("SupplyAmount");
                },
            },
        ],
    },
    {
        name: "Vat",
        fieldName: "Vat",
        width: "105",
        numberFormat: "#,##0",
        styleName: "right-column",
        header: { text: "부가세" },
    },
    {
        name: "TotalAmount",
        fieldName: "TotalAmount",
        width: "112",
        numberFormat: "#,##0",
        styleName: "right-column",
        header: { text: "합계" },
        footers: [
            {
                styleName: "right-column subtotal-footer-value",
                valueCallback: function () {
                    return getCustomerSubtotalText("TotalAmount", "거래처4");
                },
            },
            {
                styleName: "right-column total-footer-value",
                valueCallback: function () {
                    return getTotalText("TotalAmount");
                },
            },
        ],
    },
    {
        name: "Electronic",
        fieldName: "Electronic",
        width: "78",
        styleName: "center-column",
        header: { text: "전자" },
    },
    {
        name: "Journal",
        fieldName: "Journal",
        width: "98",
        styleName: "center-column",
        header: { text: "분개" },
    },
    {
        name: "MenuAction",
        fieldName: "MenuAction",
        width: "82",
        styleName: "center-column menu-action-cell",
        renderer: {
            type: "html",
            callback: function (grid, cell) {
                return renderMenuButton(cell.value);
            },
        },
        header: { text: "메뉴실행" },
    },
];

const data = [
    {
        Year: 2022,
        Month: 1,
        Day: 11,
        Code: "000110",
        Customer: "거래처4",
        BusinessNo: "2222",
        TaxType: "영세",
        ItemName: "",
        Quantity: 1000,
        UnitPrice: 200,
        SupplyAmount: 200000,
        Vat: null,
        TotalAmount: 200000,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 12,
        Code: "000105",
        Customer: "신한은행1",
        BusinessNo: "",
        TaxType: "과세",
        ItemName: "",
        Quantity: 10000,
        UnitPrice: 100,
        SupplyAmount: 1000000,
        Vat: 100000,
        TotalAmount: 1100000,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 12,
        Code: "000110",
        Customer: "거래처4",
        BusinessNo: "2222",
        TaxType: "영세",
        ItemName: "",
        Quantity: 1000,
        UnitPrice: 200,
        SupplyAmount: 200000,
        Vat: null,
        TotalAmount: 200000,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 12,
        Code: "000112",
        Customer: "카드사3",
        BusinessNo: "",
        TaxType: "과세",
        ItemName: "",
        Quantity: 500,
        UnitPrice: 50,
        SupplyAmount: 25000,
        Vat: 2500,
        TotalAmount: 27500,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 13,
        Code: "000108",
        Customer: "거래처10",
        BusinessNo: "880101-1231231",
        TaxType: "면건",
        ItemName: "",
        Quantity: 20,
        UnitPrice: 500,
        SupplyAmount: 10000,
        Vat: null,
        TotalAmount: 10000,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 14,
        Code: "088998",
        Customer: "거래처직접입력테스트",
        BusinessNo: "10101001",
        TaxType: "과세",
        ItemName: "",
        Quantity: 8867,
        UnitPrice: 65,
        SupplyAmount: 576355,
        Vat: 57635,
        TotalAmount: 633990,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 15,
        Code: "000109",
        Customer: "카드사2",
        BusinessNo: "",
        TaxType: "과세",
        ItemName: "",
        Quantity: 24586,
        UnitPrice: 457,
        SupplyAmount: 11235802,
        Vat: 1123580,
        TotalAmount: 12359382,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 15,
        Code: "000107",
        Customer: "카카오은행1",
        BusinessNo: "",
        TaxType: "카면",
        ItemName: "",
        Quantity: 57758,
        UnitPrice: 87,
        SupplyAmount: 5024946,
        Vat: null,
        TotalAmount: 5024946,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 16,
        Code: "000113",
        Customer: "국민은행1",
        BusinessNo: "",
        TaxType: "과세",
        ItemName: "",
        Quantity: 12000,
        UnitPrice: 95,
        SupplyAmount: 1140000,
        Vat: 114000,
        TotalAmount: 1254000,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 16,
        Code: "000114",
        Customer: "거래처7",
        BusinessNo: "3333",
        TaxType: "영세",
        ItemName: "",
        Quantity: 300,
        UnitPrice: 1200,
        SupplyAmount: 360000,
        Vat: null,
        TotalAmount: 360000,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 17,
        Code: "000115",
        Customer: "카드사5",
        BusinessNo: "",
        TaxType: "과세",
        ItemName: "",
        Quantity: 980,
        UnitPrice: 250,
        SupplyAmount: 245000,
        Vat: 24500,
        TotalAmount: 269500,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 17,
        Code: "000116",
        Customer: "하나은행2",
        BusinessNo: "",
        TaxType: "카면",
        ItemName: "",
        Quantity: 42200,
        UnitPrice: 33,
        SupplyAmount: 1392600,
        Vat: null,
        TotalAmount: 1392600,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: 1,
        Day: 18,
        Code: "000117",
        Customer: "거래처12",
        BusinessNo: "770202-2345678",
        TaxType: "면건",
        ItemName: "",
        Quantity: 45,
        UnitPrice: 800,
        SupplyAmount: 36000,
        Vat: null,
        TotalAmount: 36000,
        Electronic: "",
        Journal: "분개없음",
    },
    {
        Year: 2022,
        Month: null,
        Day: null,
        Code: "",
        Customer: "",
        BusinessNo: "",
        TaxType: "",
        ItemName: "",
        Quantity: null,
        UnitPrice: null,
        SupplyAmount: null,
        Vat: null,
        TotalAmount: null,
        Electronic: "",
        Journal: "",
    },
];

data.forEach(function (row) {
    row.MenuAction = row.Code ? "이동" : "";
});

document.addEventListener("DOMContentLoaded", function () {
    RealGrid.setLicenseKey(
        "upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYlmYgRykpCTKFxp5via8RxoOeo1oRwTPhXZk8PjE0BhuzU2pJNMkfVHJhJiNdi2V1hrRY16H+c8hW3+zSEY9q2VTTY1DSzfyu9SiVQ6/lCl2f1gvEKFbAmS"
    );

    const provider = new RealGrid.LocalDataProvider();
    const gridView = new RealGrid.GridView("realgridContainer");
    gridView.setDataSource(provider);

    provider.setFields(fields);
    gridView.setColumns(columns);
    provider.setRows(data);

    window.realgrid = { provider: provider, gridView: gridView };
    gridView.onCurrentChanged = function (grid, current) {
        if (!current || !current.column) return;
        setCurrentHeaderStyle(grid, current.column);
    };

    try {
        gridView.setCheckBar && gridView.setCheckBar({ visible: true });
        gridView.setStateBar && gridView.setStateBar({ visible: false });
        gridView.setEditOptions &&
            gridView.setEditOptions({
                editable: true,
                insertable: true,
                appendable: true,
            });
        gridView.setSelectOptions &&
            gridView.setSelectOptions({
                style: "rows",
            });
        gridView.setOptions &&
            gridView.setOptions({
                summaryMode: "aggregate",
            });
        gridView.setFooters &&
            gridView.setFooters({
                visible: true,
                items: [{ height: 32 }, { height: 32 }],
            });
        gridView.setColumnLayout &&
            gridView.setColumnLayout([
                "Year",
                "Month",
                "Day",
                "Code",
                "Customer",
                {
                    column: "BusinessNo",
                    footerUserSpans: [
                        { colspan: 3 },
                        { colspan: 3 },
                    ],
                },
                "TaxType",
                "ItemName",
                "Quantity",
                "UnitPrice",
                "SupplyAmount",
                "Vat",
                "TotalAmount",
                "Electronic",
                "Journal",
                "MenuAction",
            ]);
        gridView.setDisplayOptions &&
            gridView.setDisplayOptions({
                fitStyle: "none",
                rowHeight: 32,
            });
    } catch (error) {
        console.warn("RealGrid option setup skipped.", error);
    }
});
