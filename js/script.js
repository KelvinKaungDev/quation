document.addEventListener("DOMContentLoaded", function () {
    const btnAdd = document.getElementById("btnAdd");
    const dataTable = document.getElementById("dataTable");
    const subTotalEl = document.getElementById("subTotal");
    const taxRate = 0.10; // 10% sales tax

    function formatCurrency(amount) {
        return `$${amount.toFixed(2)}`;
    }

    function calculateTotals() {
        let subtotal = 0;

        // Loop through each row and calculate amount
        const rows = dataTable.querySelectorAll("tr");
        rows.forEach(row => {
            const qty = parseFloat(row.querySelector(".qty")?.value) || 0;
            const price = parseFloat(row.querySelector(".price")?.value) || 0;
            const amount = qty * price;
            row.querySelector(".amount").textContent = formatCurrency(amount);
            subtotal += amount;
        });

        // Update totals
        const salesTax = subtotal * taxRate;
        const shipping = 0.00;
        const total = subtotal + salesTax + shipping;

        subTotalEl.textContent = formatCurrency(subtotal);
        document.querySelectorAll("tr")[dataTable.rows.length + 8].children[1].textContent = formatCurrency(salesTax);
        document.querySelectorAll("tr")[dataTable.rows.length + 9].children[1].textContent = formatCurrency(shipping);
        document.querySelectorAll("tr")[dataTable.rows.length + 10].children[1].textContent = formatCurrency(total);
    }

    function createRow() {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><input type="number" class="form-control qty" placeholder="Qty" min="0"></td>
            <td><input type="text" class="form-control desc" placeholder="Description"></td>
            <td><input type="number" class="form-control price" placeholder="Unit Price" min="0" step="0.01"></td>
            <td class="amount">$0.00</td>
        `;

        // Attach input listeners for live updates
        tr.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateTotals);
        });

        return tr;
    }

    btnAdd.addEventListener("click", () => {
        const newRow = createRow();
        dataTable.appendChild(newRow);
    });

    // Optionally, add a default row on load
    btnAdd.click();
});
