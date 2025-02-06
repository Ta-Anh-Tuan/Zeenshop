import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allproducts,setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }

    return (
        <div className='list-product'>
            <h1>Danh sách tất cả sản phẩm</h1>
            <div className="listproduct-format-main">
                <p>Sản phẩm</p>
                <p>Tên sản phẩm</p>
                <p>Giá gốc</p>
                <p>Giá bán</p>
                <p>Giá thành</p>
                <p>Loại</p>
                <p>Xóa sản phẩm</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product,index)=>{
                    return <> 
                    <div key={index} className="listproduct-format-main listproduct-format">
                        <img className='listproduct-product-icon' src={product.image} alt="" />
                        <p>{product.name}</p>
                        <p>{product.old_price}đ</p>
                        <p>{product.new_price}đ</p>
                        <p>{product.price}đ</p>
                        <p>{product.category}</p>
                        <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
                    </div>
                    <hr />
                    </>
                })}
            </div>
        </div>
    )
}

export default ListProduct