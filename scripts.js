const Modal = {
    open(){
        //abrir modal
        //adicionar a classe active ao modal
        document.querySelector('.modal-overlay')
        .classList.add('active')
    },
    close(){
        //fechar modal
        //fechar a classe active do modal
        document.querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const transactions = [
    {
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        description: 'App',
        amount: 20000,
        date: '23/01/2021',
    }
]

const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let income = 0;
        //pegar as transações
        //para cada transação,
        Transaction.all.forEach(transaction => {
            //se ela for maior que 0
            if(transaction.amount > 0) {
                //somar a uma variável e retornar a variável
                income += transaction.amount;
            }
        })
        
        return income;
    },

    expenses() {
        let expense = 0;
         //pegar as transações
        //para cada transação,
        Transaction.all.forEach(transaction => {
            //se ela for menor que 0
            if(transaction.amount < 0) {
                expense += transaction.amount;
            }
    })
    return expense;
},

    total() {
        //entrada - saídas
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr') // criando a tr em forma de objeto
        tr.innerHTML = DOM.innerHTMLTransaction(transaction) //exibindo o que tem no html

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense" // se for maior q 0 verdade, se não, o outro valor.

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
    `
        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total()) 
    },

    clearTransaction() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

const Form = {
    submit(event) {
        event.preventDefault()

        //verificar se todas as informações forem preenchidas
        //formatar os dados para salvar
        //salvar
        //apagar os dados do form
        //modal feche
        //atualizar a aplicação
    }
}

const App = {
    Init() {
        Transaction.all.forEach(function(transaction){ 
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
    },
    reload() {

        DOM.clearTransaction()
        App.Init()
    },
}

App.Init()

