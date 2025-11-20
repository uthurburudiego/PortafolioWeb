import { useMemo } from 'react';
import type { OrderItem } from './../types/index';
import { fortmatCurrency } from '../helpers';
import type { OrderActions } from "../reducers/order-reducer";

type OrderTotalsProps = {
    order: OrderItem[];
    tip: number;
    dispatch: React.Dispatch<OrderActions>;
};

export default function OrderTotals({ order, tip, dispatch } : OrderTotalsProps){

    // Calculos 
    const subtotalAmount = useMemo(()=> order.reduce((total, item) =>
         total + (item.quantity * item.price), 0), [order]);

    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])

    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order])


    return(
        <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y Propina</h2>
            <p>Subtotal a pagar:
                <span className="font-bold">{fortmatCurrency(subtotalAmount)}</span>
            </p>

            <p>Propina:{" "}
                <span className="font-bold">{fortmatCurrency(tipAmount)}</span>
            </p>

            <p>Total a Pagar:{" "}
                <span className="font-bold">{fortmatCurrency(totalAmount)}</span>
            </p>
        </div>

        <button className='w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10'
        disabled={totalAmount === 0 }
        onClick={() => dispatch({type: "place-order"} )}
        >Guardar Orden </button>        
        </>
    );
}