import{CircularProgressbar, buildStyles} from "react-circular-progressbar"
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css";


export default function BudgetTracker(){

    const {state, dispatch, totalExpenses, remainingBudget} = useBudget()

    const porcentage = +((totalExpenses / state.budget) * 100).toFixed(2);

    const showColor = () =>{
        if(porcentage < 50) return "#3b82f6"
        if(porcentage >= 50 && porcentage < 75) return "#f59e0b"
        return "#ef4444"
    }


    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={porcentage}
                    styles={buildStyles({
                        pathColor: showColor(),
                        textColor: showColor(),
                        trailColor: "#f0f0f0",
                        textSize: "8px"
                    })}
                    text={`${porcentage}% Gastado`}
                />
            </div>

            <div className=" flex flex-col justify-center items-center gap-8">
                <button 
                type="button"
                className=" bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-pink-800 cursor-pointer"
                onClick={() => {dispatch({type: "reset-app"})}}
                >
                    Resetear App
                </button>

                <AmountDisplay
                label= "Presupuesto"
                amount= {state.budget}
                />
                <AmountDisplay
                label= "Disponible"
                amount= {remainingBudget}
                />
                <AmountDisplay
                label= "Gastado"
                amount= {totalExpenses}
                />

            </div>

        </div>
    )
}