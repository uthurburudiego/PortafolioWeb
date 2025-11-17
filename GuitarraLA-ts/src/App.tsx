import Guitar from "./components/Guitar.tsx";
import Header from "./components/Header.tsx";
import {useCart} from "./hooks/useCart.ts";

function App() {

    const {data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal} = useCart();


return (
    <>
    <Header
        cart = {cart}
        removeFromCart = {removeFromCart}
        decreaseQuantity = {decreaseQuantity}
        increaseQuantity = {increaseQuantity}
        clearCart = {clearCart}
        isEmpty = {isEmpty}
        carTotal = {carTotal}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
            {data.map( (guitar) =>{
                return <Guitar 
                    guitar = {guitar}
                    key = {guitar.id}
                    addToCart = {addToCart}

                />
            })}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
)
}

export default App
