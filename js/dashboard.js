document.addEventListener("DOMContentLoaded", () => {
    // Initialize transaction data
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let totalIncome = 0;
    let totalExpense = 0;

    // Calculate total income and total expenses
    transactions.forEach((transaction) => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpense += transaction.amount;
        }
        addTransactionToList(transaction);
    });

    // Create line chart for total income and expense
    const ctx = document.getElementById('transaction-chart').getContext('2d');
    const transactionChart = new Chart(ctx, {
        type: 'line', // Line chart to show the totals
        data: {
            labels: ['Income', 'Expenses'], // Two categories: Income and Expenses
            datasets: [{
                label: 'Amount',
                data: [totalIncome, totalExpense], // Totals for income and expenses
                borderColor: ['green', 'red'], // Green for income, red for expenses
                backgroundColor: 'transparent', // Transparent background for lines
                fill: false, // Disable fill under the line
                tension: 0.1 // Smooth line
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Handle form submission
    document.getElementById("transaction-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const itemName = document.getElementById("item-name").value;
        const itemAmount = parseFloat(document.getElementById("item-amount").value);
        const itemType = document.getElementById("item-type").value;

        const transaction = {
            name: itemName,
            amount: itemAmount,
            type: itemType
        };

        // Update transactions
        transactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        // Update total income or expense based on the transaction type
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpense += transaction.amount;
        }

        // Update chart data
        updateChartData();
        addTransactionToList(transaction);
        document.getElementById("transaction-form").reset();
    });

    // Function to update chart data and re-render the chart
    function updateChartData() {
        transactionChart.data.datasets[0].data = [totalIncome, totalExpense];
        transactionChart.update();
    }

    // Function to add a transaction to the list with a delete button
    function addTransactionToList(transaction) {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.name}: $${transaction.amount} (${transaction.type})`;

        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        
        // Add click event to delete the transaction
        deleteButton.addEventListener("click", () => {
            const index = transactions.indexOf(transaction);

            if (transaction.type === 'income') {
                totalIncome -= transaction.amount;
            } else if (transaction.type === 'expense') {
                totalExpense -= transaction.amount;
            }

            // Remove transaction from array
            transactions.splice(index, 1);
            localStorage.setItem("transactions", JSON.stringify(transactions));

            // Update chart data
            updateChartData();

            // Remove transaction from list
            listItem.remove();
        });

        listItem.appendChild(deleteButton);
        document.getElementById("budget-list").appendChild(listItem);
    }
});


///😍😍😍 index income chart 

document.addEventListener('DOMContentLoaded', function() {
    AOS.init();
});


document.addEventListener("DOMContentLoaded", () => {
    // Retrieve total income and income data from localStorage
    const totalIncome = localStorage.getItem("totalIncome") || 0;
    const incomes = JSON.parse(localStorage.getItem("incomes")) || [];

    // Display total income
    document.getElementById("totalIncome").textContent = ` $${totalIncome}`;

    // Prepare data for Chart.js
    const labels = incomes.map(income => income.source);  // Income sources
    const data = incomes.map(income => parseFloat(income.amount));  // Income amounts

    const ctx = document.getElementById('incomeChart').getContext('2d');

    // Create the doughnut chart using Chart.js
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.length > 0 ? labels : ['No Income Yet'],
            datasets: [{
                label: 'Income ($)',
                data: data.length > 0 ? data : [1],  // Use dummy data if no income is available
                backgroundColor: [
                   
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                   
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
        }
    });
});

//🤞💵 display total from dashboer on index
document.addEventListener("DOMContentLoaded", () => {
    let totalExpense = parseFloat(localStorage.getItem("totalExpenses")) || 0;
    document.getElementById("totalExpenseDisplay").textContent = ` $${totalExpense.toFixed(2)}`;
});

 //💕🤞😍 transaction chart......
 document.addEventListener("DOMContentLoaded", () => {
    // Fetch transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Variables for total income and expenses
    let totalIncome = 0;
    let totalExpenses = 0;

    // If there are transactions, calculate total income and expenses
    if (transactions.length > 0) {
        totalIncome = transactions
            .filter(transaction => transaction.type === "income")
            .reduce((sum, transaction) => sum + transaction.amount, 0); // Sum of all income

        totalExpenses = transactions
            .filter(transaction => transaction.type === "expense")
            .reduce((sum, transaction) => sum + transaction.amount, 0); // Sum of all expenses
    }

    // Labels for the chart
    const labels = ['Total Income', 'Total Expenses'];

    // Data for the chart (only the totals)
    const data = [totalIncome, totalExpenses];

    // Configure the chart
    const ctx = document.getElementById('transaction-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',  // You can change to 'doughnut', 'line', or 'bar'
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount ($)',
                data: data,
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Total Income vs Total Expenses'
                }
            }
        }
    });
});
