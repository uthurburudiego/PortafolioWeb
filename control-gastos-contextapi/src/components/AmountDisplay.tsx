
import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string;
    amount: number;
}

export default function AmountDisplay( { label, amount } : AmountDisplayProps) {

    return(
        <div className="flex-1 w-full bg-white  p-4 text-center ">
            <p className=" text-gray-600 font-bold text-lg">{label}</p>
            <p className=" text-2xl font-black text-blue-600">{formatCurrency(amount)}</p>
        </div>
    )
}