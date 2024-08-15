import React from 'react'
import "../Components/Home/Home.css"
import { RiCloseCircleLine } from "react-icons/ri";
const Formtable = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  return (
    <div className='addcontainer'>
      <div className='overlay'></div>
    <form onSubmit={handleSubmit} className='form-2'>
      <div className='close' onClick={handleclose}>< RiCloseCircleLine /></div>
      <label htmlFor='itemid'>Item Id</label>
      <input type='text' id='itemid' name='itemid' onChange={handleOnChange} className='item-input' autoComplete="off" value={rest.itemid}/>

      <label htmlFor='itemname'>Item Name</label>
      <input type='text' id='itemname' name='itemname' onChange={handleOnChange} className='item-input' autoComplete="off" value={rest.itemname}/>

      <label htmlFor='amount'>Amount</label>
      <input type='text' id='amount' name='amount' onChange={handleOnChange} className='item-input' autoComplete="off" value={rest.amount}/>

      <label htmlFor='date'>Date</label>
      <input type='text' id='date' name='date' onChange={handleOnChange} className='item-input' autoComplete="off" value={rest.date}/>

      <label htmlFor='category'>Category</label>
      <input type='text' id='category' name='category' onChange={handleOnChange} className='item-input' autoomplete="off" value={rest.category}/>
      <div className='submit'>Submit</div>
    </form >
    </div>
  )
}

export default Formtable
