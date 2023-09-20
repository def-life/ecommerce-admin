import { useCart } from '@/components/CartContext'
import CartItem from '@/components/CartItem'
import Header from '@/components/Header'
import useMutation from '@/hooks/swr/useMutation'
import React, { useEffect, useState } from 'react'

function cart() {
    const { cart, clearCart } = useCart()
    const { data, trigger, loading, error } = useMutation("/api/carts", "POST")
    const [formData, setFormData] = useState({
        name: "", email: "", city: "", country: "", pincode: "", streetAddress: ""
    })
    const { trigger: createOrder } = useMutation("/api/create-order", "POST")
    const { trigger: verifyPayment } = useMutation("/api/payment-verify", "POST")
    const { trigger: failedPayment } = useMutation("/api/payment-failure", "POST")
    const { name, email, city, country, pincode, streetAddress } = formData;

    useEffect(() => {

        trigger({ ids: cart })
    }, [cart])

    const priceArr = cart.map((_id) => {
        const p = data?.find((product) => {
            return product._id === _id
        })?.price ?? 0
        return p
    })

    const totalPrice = priceArr.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue);
    }, 0);

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };


    function handleChange(ev) {
        setFormData({
            ...formData, [ev.target.name]: ev.target.value
        })
    }

    async function handleSubmit(ev) {
        console.log('clicked')
        ev.preventDefault()
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        const order = await createOrder({ ...formData, productIds: cart, amount: totalPrice })

        var options = {
            "key": order.key_id, // Enter the Key ID generated from the Dashboard
            "amount": totalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Test Corp",
            "description": "Test Transaction",
            "image": "https://avatars.githubusercontent.com/u/88824353?s=96&v=4",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            // "callback_url": "http://localhost:3000/api/payment-verify",
            "handler": async function (response) {
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                await verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
                clearCart()
            },
            "prefill": {
                name,
                email
            },
            "modal": {
                "ondismiss": function(){
                   alert('Checkout form closed');
                }
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            },
            retry: {
                enabled: true
            }

        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', async function (response){
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            try {

                await failedPayment({razorpay_order_id: response.error.metadata.order_id, razorpay_payment_id: response.error.metadata.payment_id})
            } catch(err) {
                alert("somwthing went wrong while updating status")
            }

    });
        rzp1.open();
        
    }

    return (
        <div>
            <Header />
            <div className='p-3 max-w-6xl mx-auto '>
                {cart.length === 0 ? <h2 className='my-10 text-4xl font-bold text-gray-700'>Nothing in the cart </h2> :
                    <div className='grid md:grid-cols-[1.3fr_0.7fr] gap-2'>
                        <div>

                            <div className='grid grid-cols-3 my-3 gap-3'>
                                <h2 className='py-2 text-sm font-bold uppercase text-gray-500 border-b border-gray-200'>Product Name</h2>
                                <h2 className='py-2 text-sm font-bold uppercase text-gray-500 border-b border-gray-200'>Quantity</h2>
                                <h2 className='py-2 text-sm font-bold uppercase text-gray-500 border-b border-gray-200'>Price</h2>
                            </div>
                            {
                                data?.map((product) => {
                                    return <CartItem key={product._id} product={product} />
                                })
                            }
                        </div>
                        <form onSubmit={handleSubmit}>
                            <h2 className='my-3 text-2xl font-bold text-gray-700'>Order Information</h2>
                            <input value={name} name={"name"} onChange={handleChange} className='mb-3 py-1 border-gray-400 text-gray-800 focus:ring-gray-400' type="text" placeholder='Name' />
                            <input value={email} name='email' onChange={handleChange} className='mb-3 py-1 border-gray-400 text-gray-800 focus:ring-gray-400' type="text" placeholder='Email' />
                            <div className='flex gap-2'>
                                <input value={city} name='city' onChange={handleChange} className='mb-3 py-1 border-gray-400 text-gray-800 focus:ring-gray-400' type="text" placeholder='City' />
                                <input value={pincode} name="pincode" onChange={handleChange} className='mb-3 py-1 border-gray-400 text-gray-800 focus:ring-gray-400' type="text" placeholder='Postal Code' />
                            </div>
                            <input value={streetAddress} name="streetAddress" onChange={handleChange} className='mb-3 py-1 border-gray-400 text-gray-800 focus:ring-gray-400' type="text" placeholder='Street Address' />
                            <input value={country} name="country" onChange={handleChange} className='mb-3 py-1 border-gray-400 text-gray-800 focus:ring-gray-400' type="text" placeholder='Country' />
                            <button className='px-2 text-sm py-1 md:px-4 rounded-md uppercase border 
                         bg-green-600 font-bold text-white hover:bg-green-600 my-2'>Continue to payment</button>
                        </form>

                       {!loading && <p>Total Price: {totalPrice}</p>}
                    </div>}
            </div>
        </div>
    )
}



export default cart


