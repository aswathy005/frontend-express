import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Getdata.css'

function Getdata() {

  const [data, setData] = useState([])
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}getdata`
      )
      setData(res.data)
    } catch (error) {
      alert("Error fetching data")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}deleteOne/${id}`
      )
      alert("Data deleted")
      getData()
    } catch (error) {
      alert("Delete failed")
    }
  }

// const handleedit = async (id)=>{
//    try {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}updateProductData/${id}`
//       )
//       alert("ProductData updated")
//       getData()
//     } catch (error) {
//       alert("updation od productdata failed")
//     }
// }


  return (
     <div className="products-container">
      <h2>All Products</h2>
      <p className="sub-text">Your Product List.</p>

      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.image} alt="product" />
              </td>
              <td>{item.name}</td>
              <td>₹ {item.phone}</td>
              <td>
                <button
                  className="edit-btn"
                 onClick={() => navigate(`/updateProductData/${item._id}`)}>
                
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}

export default Getdata
