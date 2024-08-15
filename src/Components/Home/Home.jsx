import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../Utils';
import { ToastContainer } from 'react-toastify';
import './Home.css';
import axios from 'axios';
import Formtable from '../Formtable';
axios.defaults.baseURL = "http://localhost/:8080/"
const Home = () => {
  const [addSection, setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    itemid: "",
    itemname: "",
    amount: "",
    date: "",
    category: ""
  })
  const [formDataEdit, setFormDataEdit] = useState({
    itemid: "",
    itemname: "",
    amount: "",
    date: "",
    category: "",
    _id: ""
  })
  const [dataList, setDataList] = useState([])
  const handleOnChange = (e) => {
    const { value, name } = e.target
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post('/create', formData)
    console.log(data)
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        itemid: "",
        itemname: "",
        amount: "",
        date: "",
        category: ""
        
      })
    }
  }
  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }
  useEffect(() => {
    getFetchData()
  }, [])
  console.log(dataList)

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)

    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.update("/update/", formDataEdit)
    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }
  const handleEditOnChange = async (e) => {
    const { value, name } = e.target
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  };

  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditSection(true)
  }
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedINUser'))
  }, [])
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
      navigate('/login');
    }, 1000)
  }
  return (
    <div className='expense-manger'>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout} className='logout'>Logut</button>
      <ToastContainer />



      <div className='expense-container'>
        <div className='add-btn' onClick={() => setAddSection(true)}>Add Expenses</div>

        {
          addSection && (
            <Formtable
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleclose={() => setAddSection(false)}
              rest={formData}
            />
          )
        }
        {
          editSection && (
            <Formtable
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleclose={() => setEditSection(false)}
              rest={formDataEdit}
            />
          )
        }
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Item Id</th>
                <th>item Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((el) => {
                  console.log(el)
                  return (
                    <tr>
                      <td>{el.itemid}</td>
                      <td>{el.itemname}</td>
                      <td>{el.amount}</td>
                      <td>{el.date}</td>
                      <td>{el.category}</td>
                      <td>
                        <button className='edit' onClick={() => handleEdit(el)}>Edit</button>
                        <button onClick={() => handleDelete(el._id)} className='delete'>Delete</button></td>
                    </tr>
                  )
                }))
                : (
                  <p style={{ textAlign: "center" }}>No data</p>
                )
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Home
