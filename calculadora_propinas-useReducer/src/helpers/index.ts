import type { OrderItem } from "../types";

export function fortmatCurrency(quantity: number){

    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD"
    }).format(quantity)
}

export function subTotal(price: number, quantity: number){

    return price * quantity;
}

export function calcTotal(itemList : OrderItem[]){
    let total = 0;
    itemList.forEach( (item)=>
        total += item.price * item.quantity
    )
    return total


}