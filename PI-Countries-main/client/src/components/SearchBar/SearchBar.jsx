import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getCountriesByName} from '../../redux/actions'
import "./SearchBar.css"





function SearchBar() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  function handleInput(e){
   setName(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    if(name.length < 2){
      return alert("Ingrese un nombre mayor a 3 letras")
    }else{
      dispatch(getCountriesByName(name))
    }
  }
  return (
    <div>
      <form>
      <input type="text" className='input'
      placeholder='Ingrese un pais'
      onChange={ e => handleInput(e)}
      />
      <button type='submit' className='submitButton' onClick={e => handleSubmit(e)}>Buscar</button>
      </form>
    </div>
  )
}

export default SearchBar