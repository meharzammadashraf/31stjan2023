import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

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
                dispatch({type: 'PRODUCTS', payload: res.data.products})
            })
            console.log("ccccccccccccc");
    }, [])
    const a = useSelector((state)=>{
        return state;
    })
    useEffect(() => {
      setAllproducts(a.data)
      setCat(a.data)
      }
    , [a])
    const AddToCart = (data)=>{
        // var arrayCart = [];
         
        let products = [];
    if(localStorage.getItem('cart')){
        products = JSON.parse(localStorage.getItem('cart'));
    }
    products.push({data});
    localStorage.setItem('cart', JSON.stringify(products));
    }
    
    const SearchByTitle = (e) => {
        const searchedData = cat.filter(asdf => {
            return asdf.title.toLowerCase().includes(e.toLowerCase())
        })
        setAllproducts(searchedData);
    }
    const Filter = (e) => {
        const newArray = cat.filter(function (el) {
            return el.category === e;
        });
        setAllproducts(newArray);
    }
    return (
        <>
            <div className='border  pr-8'>
                <div className='flex'>
                    {/* <div className='w-1/6 bg-blue-200 mr-5 sticky top-20'>
                        <label>Search: <input type="search" className="hover:border-dotted" placeholder='search' value={search} onChange={(e) => { setSearch(e.target.value); SearchByTitle(e.target.value) }} /></label><br />

                        {cat.length &&
                            cat.map((data) => {
                                categories.add(data.category)
                            })

                        }
                        {
                            categories.forEach((data) => { categoriesArray.push(data) }
                            )
                        }
                        <div id="product">
                            <label><input type="radio" id='p0' name="product" value='All' onChange={() => setAllproducts(cat)} />All</label> <br />
                            {
                                categoriesArray.map((data, index) => {
                                    return (
                                        <>
                                            <label><input type="radio" id={"p" + index + 1} name="product" value={data} onChange={(e) => Filter(e.target.value)} />{data.charAt(0).toUpperCase() + data.slice(1)}</label> <br />
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div> */}
                    <div className='w-5/6 grid grid-cols-3 gap-4'>
                        {
                            allproducts.length &&
                            allproducts.map((data) => {
                                return (
                                    <div className='border-2 border-red-400 p-4 rounded-lg shadow-sm shadow-slate-500'>
                                            <div className=' bg-cover bg-center m-2' style={{ backgroundImage: "url(" + data.images[0] + ")" , height: '200px'}}>

                                            </div>
                                            <div>
                                                <h4 className='text-xl'>{data.title}</h4>
                                                {/* <p><b>Description:</b> <br /><span className='justify-between'>{data.description}</span></p> */}
                                                <p className='text-right'>RS: {data.price}/<sub>=</sub></p>
                                                <button class="rounded-xl pt-2 pb-3 pl-3 pr-2 bg-red-400" onClick={()=>AddToCart(data)}>Add to cart</button>
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