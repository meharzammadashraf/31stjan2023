import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../reduxtoolkit/reducer/productreducer';
import {addCart} from '../reduxtoolkit/reducer/cartReducer'

function Products() {
    const dispatch = useDispatch();
    const categories = new Set();
    const categoriesArray = []
    const [allproducts, setAllproducts] = useState("");
    const [search, setSearch] = useState("");
    const [cat, setCat] = useState("");

    useEffect(() => {
        axios.get(`https://dummyjson.com/products`)
            .then(res => {
            dispatch(addProducts(res.data.products))
            })

    }, [])
    const a = useSelector((state)=>{
        return state.productreducer.products[0];
    })
    const cartMnJoData = useSelector((state)=>{
        return state.cartReducer.cartItems;
    })
    useEffect(() => {
      setAllproducts(a)
      setCat(a)
      }
    , [a])
    const AddToCart = (data)=>{
        const {id, thumbnail, price, title, brand} = data;
        const newData = {id, thumbnail, price, title, brand, quantity: 1}
        dispatch(addCart(newData))
    }
    return (
        <>
            <div className='border  pr-8 pl-8'>
                <div className='flex'>
                    <div className=' grid grid-cols-4 gap-4'>
                        {
                            allproducts?.length &&
                            allproducts.map((data) => {
                                return (
                                    <div className='border-2 border-red-400 p-4 rounded-lg shadow-sm shadow-slate-500'>
                                            <div className=' bg-cover bg-center m-2' style={{ backgroundImage: "url(" + data.images[0] + ")" , height: '200px'}}>

                                            </div>
                                            <div>
                                                <h4 className='text-xl'>{data.title}</h4>
                                                <p className='text-right'>RS: {data.price}/<sub>=</sub></p>
                                                <button className="rounded-xl pt-2 pb-3 pl-3 pr-2 bg-red-400" onClick={()=>AddToCart(data)}>Add to cart</button>
                                            </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
            </div>
    </>
    )
}

export default Products