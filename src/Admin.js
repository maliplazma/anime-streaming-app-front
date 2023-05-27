import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loading from './components/Loading'
import MyFooter from './components/MyFooter'
import axios from 'axios'
import IconNavbar from './components/IconNavbar';
import "./Admin.css"


export default function Admin() {
  const [show, setShow] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [loading_animes, setLoadingAnimes] = useState(true)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() =>{
    const getAnimes = async(e) =>{
        try{
            const response = await axios.get("http://localhost:8000/animes")

            if(response.status ===201){
              setAnimes(response.data)
            }

            setLoadingAnimes(false)

        }catch(err){
          console.log(err)
        }
    }

    
    getAnimes()

  },[])

  const handleDelete = async (event) => {
    
    try{
       // window.location.reload()
       const anime_id=event.target.anime_id;
        await axios.put(`http://localhost:8000/delete`, {anime_id})
        
         
        }catch (error) {
          console.log("Error in movie deletion")
      }   
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
  
       const response = await axios.post(`http://localhost:8000/add`,)
       

       const success = response.status === 201
       if(success) alert("Anime added!")
       window.location.reload()
        

    } catch (error) {
       alert("Anime is not added")
    }

}

  if( loading_animes) return <Loading/>

  return (
    <div className='klasa'>

      <IconNavbar/>

    <div className='row m-10'>
        <div className='col-2 offset-1'>
    <Button variant="primary " onClick={handleShow}>
       Add new anime
    </Button>
    </div>
    </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new anime</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <form>
    <div className="form-group">
    <label >Anime name</label>
    <input type="text"  name="name" className="form-control" aria-describedby="emailHelp"/>
    </div>
    <div className="form-group">
    <label >Year</label>
    <input type="text"  name="year" className="form-control"/>
    </div>
    <div className="form-group">
    <label for="exampleInputEmail1">Image</label>
    <input type="text" name="image" className="form-control"/>
    </div>

  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>


      <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Year</th>
      <th scope="col">Image</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {animes.map(a => {
      return(
        <tr>
      <th scope="row">{a.english_name}</th>
      <td>{a.year}</td>
      <td>{a.creator}</td>
      <td><button class="btn btn-danger" onClick={handleDelete }>Delete</button></td>
    </tr>
      )
    })}
    
  </tbody>
</table>


    <MyFooter/>

    </div>
  )
}

