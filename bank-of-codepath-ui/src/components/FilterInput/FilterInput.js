import "./FilterInput.css"

export default function FilterInput({filterInputValue, handleOnInputChange}) {
  
  return (
    <div className="FilterInput">
      <i className="material-icons">search</i>
      <input type="text" placeholder={"Search transactions"} value={filterInputValue} onChange={event => handleOnInputChange(filterInputValue)}/>
    </div>
  )
}
