import './App.css';
import { useState } from 'react';
function App() {

  const [data, setData] = useState("");
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [edittodo, setEdittodo] = useState({});
  const [error, setError] = useState();


  const inputField = (e) => {
    setError("")
    setData(e.target.value)

  }
  const inputSubmit = (e) => {
    e.preventDefault();

    if (data.trim() === "") {
      return setError("*required");
    } else if (!list.includes(data.trim())) {
      setList((prevData) => [...prevData, data]);
      setData("")
    }
    else {
      alert("Item is exist in list")
      setData("")
    }
  }

  const handleDelete = (index) => {
    const rows = [...list];
    rows.splice(index, 1);
    setList(rows);
    setEdit(false);
  }
  const InputEdit = (e) => {
    setEdittodo({ ...edittodo, value: e.target.value });

  }
  const handleEdit = (index) => {
    setEdit(true);
    setEdittodo({ index, value: list[index] })
  }
  const handleSubmited = (e) => {
    e.preventDefault();
    if (!list.includes(edittodo.value)) {
      handleupdate(edittodo)
    }
    else {
      alert("****This value already exist****")
    }
    // console.log(edittodo)
  }
  const handleupdate = (updatedtodo) => {
    const updatedItem = list.map((item, index) => {
      return index === edittodo.index ? updatedtodo.value : item

    })
    setEdittodo({ value: "" });

    setList(updatedItem);
    // console.log(updatedItem)
    setEdit(false);

  }
  return (
    <div className="App">
      <h1>To-Do list <i class="bi bi-pencil-square"></i></h1>
      <div className='mainclass'>


        <form onSubmit={handleSubmited}>
          {edit ? (
            <div className='formclassedit'>
              <input type="text" value={edittodo.value} onChange={InputEdit} ref={input => input && input.focus()}></input>
              <button type='submit' disabled={!edittodo.value}>Update</button>
              <button onClick={() => setEdit(false)} className="cancelbtn">Cancel</button>
            </div>

          ) : (
            <div className='formclass'>
              <input type="text" placeholder="Enter what you want to add " value={data} onChange={inputField}></input>
              <button type="submit" onClick={inputSubmit}>ADD</button>
              <div> {error && <span className='errormessage'>{error}</span>}</div>
            </div>


          )}
        </form>
        {list?.length ? list.map((item, index) => {
          return (
            <div className='tableclass' key={index}>
              <div className='todoclass'>
                <span className='itemclass'>
                  <i className="bi bi-star"></i>
                </span>
                <h6 className='overtxtclass '>{item}
                  <span className='tooptiptext'>hhello</span></h6>
                <span>
                  <i className="bi bi-trash3-fill text-danger" onClick={() => handleDelete(index)}></i>
                  <i className="bi bi-pencil-square text-success " onClick={() => handleEdit(index)}></i>
                </span>
              </div>
            </div>
            // <div className='itemmainclass' key={index}>
            //   <div className='itemclass'>
            //     <i className="bi bi-star"></i>
            //     <span>{item}</span>
            //   </div>
            //   <div className='iconclass'>
            //     <i className="bi bi-trash3-fill text-danger" onClick={() => handleDelete(index)}></i>
            //     <i className="bi bi-pencil-square text-success " onClick={() => handleEdit(index)}></i>
            //   </div>
            // </div>

          )

        }) : (<h5 className='emptylist'><i className="bi bi-pin-angle-fill"></i> *** No item ***</h5>)}


      </div>

    </div>
  );
}

export default App;
