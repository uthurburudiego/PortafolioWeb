import React, { useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types"; 
import { categories } from "../data/categories";
import DatePicker from "react-date-picker"; 
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css"
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date(), 
    })

    const [error, setError] = useState<String>(""); 
    const [previusAmount, setPreviusAmount] = useState<number>(0);
    const {dispatch, state, remainingBudget } = useBudget();

    useEffect(() => {
        if(state.editingId){
            const expenseToEdit = state.expenses.filter(exp => exp.id === state.editingId)[0];
            setExpense(expenseToEdit);
            setPreviusAmount(expenseToEdit.amount);
        }}, [state.editingId])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement > | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmauntField = ["amaunt"].includes(name); 
        setExpense({...expense,
        [name]: isAmauntField ? Number(value) : value,
    })
}

    const handleChangeDate = (value : Value)=>{
        
        setExpense({
            ...expense, 
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if(Object.values(expense).includes("") || expense.amount <= 0 || !expense.date){
            setError("Todos los campos son obligatorios");
            return;
        }
            //Validar que no me pase del limite
            if((expense.amount - previusAmount) > remainingBudget){
                setError("El gasto excede el presupuesto disponible");
                console.log("El gasto excede el presupuesto disponible");
                return;
            }
            //Agregar o actualizar el gasto
            if(state.editingId){
                dispatch({type: "update-expense", payload: {expense: { id: state.editingId, ...expense}}})
            }else{
                //Resetear el formulario y cerrar el modal
            dispatch({type: "add-expense", payload: {expense}})
            //Resetear el formulario y cerrar el modal
            setError("");
            setExpense({
                amount: 0,
                expenseName: "",
                category: "",
                date: new Date(), 
            })
            setPreviusAmount(0);
            }
    }


    return (
    <form className="space-y-5" onSubmit={handleSubmit}> 
        <legend
        className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
        >{state.editingId ? "Editar Gasto" : "Nuevo Gasto"}</legend>

        {error && <ErrorMessage message={String(error)}/>}

        <div className="flex flex-col gap-2">
            <label
            htmlFor="expenseName"
            className="text-xl"
            >Nombre Gasto:</label>

            <input 
            type="text"
            id="expenseName"
            placeholder="Añade el Nombre del gasto"
            className="bg-slate-100 p-2 "
            name="expenseName"
            value={expense.expenseName}
            onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label
            htmlFor="amount"
            className="text-xl"
            >Cantidad</label>

            <input 
            type="number"
            id="amount"
            placeholder="Añade la Cantidad del gasto Ej: 300"
            className="bg-slate-100 p-2 "
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            />
        </div>

                <div className="flex flex-col gap-2">
            <label
            htmlFor="category"
            className="text-xl"
            >Categoria</label>

            <select 
            id="category"
            className="bg-slate-100 p-2 "
            name="category"
            value={expense.category}
            onChange={handleChange}
            >
                <option value="">-- Seleccione --</option>
                {categories.map((category) => (
                    <option 
                    key={category.id}
                    value={category.id}
                    >{category.name}</option>
                ))}
            </select>
        </div>

                <div className="flex flex-col gap-2">
            <label
            htmlFor="amount"
            className="text-xl"
            >Fecha Gasto:</label>

            <DatePicker
            className={ "bg-slate-100 p-2 "}
            value={expense.date}
            onChange={handleChangeDate}
            />

        </div>

        <input type="submit" 
        className="bg-blue-600 cursor-pointer w-full text-white uppercase font-bold rounded-lg"
        value={state.editingId ? "guardar cambios" : "Registar Gasto"}/>

    </form>


)}