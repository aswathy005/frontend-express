// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import "./EditProduct.css";

// function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formdata, setFormdata] = useState({
//     name: "",
//     phone: "",
//     image: "",
//   });

//   // get single product
//   const getSingleData = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}getsingledata/${id}`
//       );
//       setFormdata(res.data);
//     } catch (err) {
//       alert("Failed to fetch data");
//     }
//   };

//   useEffect(() => {
//     getSingleData();
//   }, []);

//   const handleChange = (e) => {
//     setFormdata({ ...formdata, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}updateProductData/${id}`, {
//             name:formdata.name,
//             phone:formdata.phone,
//             image:formdata.image
//         }
        
//       );
//       alert("Product updated");
//       navigate("/getdata");
//     } catch (err) {
//       alert("Update failed");
//     }
//   };

//   return (
//     <div className="edit-container">
//       <h2>Edit Product</h2>

//       <form onSubmit={handleSubmit} className="edit-form">
//         <label>Product Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formdata.name}
//           onChange={handleChange}
//           required
//         />

//         <label>Price</label>
//         <input
//           type="number"
//           name="phone"
//           value={formdata.phone}
//           onChange={handleChange}
//           required
//         />

//         {formdata.image && (
//           <img src={formdata.image} alt="preview" className="preview-img" />
//         )}

//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// }

// export default EditProduct;


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Getdata() {
  const [data, setData] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ name: '', phone: '' })
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}getdata`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setData(res.data)
    } catch (error) {
      alert('Error fetching data')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  // DELETE
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    if (!window.confirm('Are you sure?')) return

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      alert('Product deleted')
      getData()
    } catch (error) {
      alert('Delete failed')
    }
  }

  // START EDIT
  const handleEdit = (item) => {
    setEditId(item._id)
    setEditData({ name: item.name, phone: item.phone })
  }

  // UPDATE
  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token')

      await axios.put(
        `${import.meta.env.VITE_API_URL}updateProductData/${id}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Product updated')
      setEditId(null)
      getData()
    } catch (error) {
      alert('Update failed')
    }
  }

  // // LOGOUT
  // const handleLogout = () => {
  //   localStorage.removeItem('token')
  //   navigate('/login')
  // }


  return (
    <div>
      {/* <button onClick={handleLogout}>Logout</button> */}

      <h2>All Products</h2>

      <table border="1" cellPadding="10">
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
                <img src={item.image} alt="" width="50" />
              </td>

              <td>
                {editId === item._id ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                ) : (
                  item.name
                )}
              </td>

              <td>
                {editId === item._id ? (
                  <input
                    type="number"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                  />
                ) : (
                  `₹ ${item.phone}`
                )}
              </td>

              <td>
                {editId === item._id ? (
                  <>
                    <button onClick={() => handleUpdate(item._id)}>
                      Update
                    </button>
                    <button onClick={() => setEditId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Getdata
