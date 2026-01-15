
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"


export default function ExpenseList() {
    const {state}= useBudget();
    
    const filterdExpenses = state.currentCategory ? 
    state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses;
    


    return (
        <div className="mt-10">
            {filterdExpenses.length === 0 ? <p className="text-gray-600 text-2xl font-bold>">No hay gastos</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Lista de Gastos</p>
                    {filterdExpenses.map(expense => (
                        <ExpenseDetail
                        key={expense.id}
                        expense= {expense}
                        />
                    ))}
                </>
            )}
        </div>
    )
}