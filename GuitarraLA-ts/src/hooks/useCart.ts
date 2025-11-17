import {db} from "../data/db";
import { useState, useEffect, useMemo } from "react";
import type {CartItem, Guitar} from "../types"

export const useCart = () => {

    const initialCart = (): CartItem[] =>{
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
}
const [data] = useState(db);
const [cart, setCart] = useState(initialCart);

// Constantes 
const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

useEffect (() =>{
    localStorage.setItem("cart", JSON.stringify(cart))
}, [cart]);

function removeFromCart(id: Guitar["id"]){
    setCart(prevCart => prevCart.filter(guitar =>  guitar.id !== id));
}


function decreaseQuantity(id : Guitar["id"]){
    const updateCart = cart.map(item => {
        if(item.id === id && item.quantity > MIN_ITEMS){
            return{
            ...item, 
            quantity: item.quantity - 1
            }
        }
        return item
    })
    setCart(updateCart)
}

function increaseQuantity(id : Guitar["id"]){
    const updateCart = cart.map(item => {
        if(item.id === id && item.quantity < MAX_ITEMS){
            return{
            ...item, 
            quantity: item.quantity + 1
            }
        }
        return item
    })
    setCart(updateCart)
}


function addToCart(item: Guitar){
    const itemExists = cart.findIndex(guitar => guitar.id == item.id);
    if(itemExists >= 0){
        if(cart[itemExists].quantity >= MAX_ITEMS) return
        const updateCart = [...cart];
        updateCart[itemExists].quantity ++;
        setCart(updateCart);
    }else{
        const newItem : CartItem = {...item, quantity: 1}
        setCart([...cart, newItem])
        }
    }

    function clearCart(){
        setCart([])
    }

        //State Derivado 
    const isEmpty = useMemo(() => cart.length === 0, [cart]); 
    //Calcular el total
    const carTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        carTotal
    }
}

