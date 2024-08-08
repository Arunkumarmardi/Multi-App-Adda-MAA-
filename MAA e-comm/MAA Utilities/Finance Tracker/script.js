document.addEventListener('DOMContentLoaded', () => {
    const balance = document.getElementById('balance');
    const income = document.getElementById('income');
    const expense = document.getElementById('expense');
    const transactionList = document.getElementById('transaction-list');
    const transactionForm = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    function updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    function updateValues() {
        const amounts = transactions.map(transaction => transaction.amount);
        const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
        const incomeTotal = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
        const expenseTotal = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

        balance.innerText = total;
        income.innerText = incomeTotal;
        expense.innerText = expenseTotal;
    }

    function addTransactionDOM(transaction) {
        const sign = transaction.amount < 0 ? '-' : '+';
        const item = document.createElement('li');
        item.classList.add(transaction.amount < 0 ? 'expense' : 'income');
        item.innerHTML = `
            ${transaction.description} <span>${sign}${Math.abs(transaction.amount)}</span>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        `;

        transactionList.appendChild(item);
    }

    function removeTransaction(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateLocalStorage();
        init();
    }

    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const transaction = {
            id: generateID(),
            description: descriptionInput.value,
            amount: +amountInput.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        descriptionInput.value = '';
        amountInput.value = '';
    });

    function generateID() {
        return Math.floor(Math.random() * 100000000);
    }

    function init() {
        transactionList.innerHTML = '';
        transactions.forEach(addTransactionDOM);
        updateValues();
    }

    init();
});
