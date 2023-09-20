import { createContext, useState, useContext, useMemo, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";

const CartContext = createContext({})


export function CartProvider({ children }) {
    const [initFetched, setInitFetched] = useState(false)
    const [cart, setCart] = useState([])


    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) ?? [])
        setInitFetched(true)
    }, [])

    useEffect(() => {
        if (initFetched) {
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart])

    const addToCart = useCallback((_id) => {
        setCart((prevCart) => {
           return [_id, ...prevCart]
        })
        // const exist = cart.some((item) => item._id === _id)
        // if(exist) {
        //     return cart.map((item) => {
        //         return {
        //             ...item,
        //             count
        //         }
        //     })
        // } else {

        // }
    })

    const removeFromCart = useCallback((_id) => {
        setCart((prevCart) => {
            const index = prevCart.indexOf(_id)
            if(index !== -1) {
                return prevCart.filter((p, i) => i !== index )
            }
            return prevCart
        })
    })
    const clearCart = useCallback((_id) => {
        setCart([])
    })

    const value = useMemo(() => {
        return { cart, addToCart, removeFromCart, clearCart }
    }, [cart])


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext);
}