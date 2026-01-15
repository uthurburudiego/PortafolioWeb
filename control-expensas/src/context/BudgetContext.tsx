import React, { useMemo } from "react"
import { useReducer, createContext } from "react"
import {budgetReducer, InitialState, type BudgetActions, type BudgetState} from "../reducers/budget-reducer"


type BudgetContextProps = {
    state: BudgetState, 
    dispatch: React.Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBudget: number
}

type BudgetProviderProps = {
    children: React.ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>( {} as BudgetContextProps)

export const BudgetProvider = ({children} : BudgetProviderProps) => {
    
    const [state, dispatch] = useReducer(budgetReducer, InitialState);

    // Calcular gastos totales
    const totalExpenses = useMemo(() => {
        return state.expenses.reduce((total, expense) => total + +expense.amount, 0)
    }, [state.expenses])
    
    const remainingBudget = state.budget - totalExpenses;
    


    return(
        <BudgetContext.Provider 
        value={{state, dispatch, totalExpenses, remainingBudget}}>
            {children}
        </BudgetContext.Provider>
    )
}