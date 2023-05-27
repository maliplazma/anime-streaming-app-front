import React, {useState, useEffect} from 'react'
import "./Profile.css"
import IconNavbar from './components/IconNavbar'
import axios from 'axios'
import Loading from './components/Loading'
import MyFooter from './components/MyFooter'

function Profile() {
    const [user, setUser] = useState()
    const [loading, setLoading]= useState(true)

   useEffect(()=>{
    const getUser = async(e) =>{
      try{
        const user_id=localStorage.getItem("user_id")
        
        const response = await axios.get(`http://localhost:8000/user?id=${user_id}`)
        console.log(response.data)

        if(response.status==200){
          setUser(response.data)
          setLoading(false)
        }
      }catch(err){
        console.log(err)
      }
    }

    getUser()
   },[])

   if(loading) return <Loading/>

  return (
    <div className='profile'>
      <IconNavbar/>

    <div className='container'>

      <div className="row">
        <div className='col-4'>
          <img className="avatar" src={user.avatar} alt="Avatar"/>
        </div>
        <div className='col-4'>
          <p className='about'>{user.username}</p>
          <p className='about__'>{user.email}</p>
          <button className='edit__profile'>Edit</button>
        </div>
      </div>

      <div className='row mt-5'>
        <div className='col-4'>
        <h4>Animes you liked:</h4>
        </div>
      </div>

      <ul class="list-group mt-5">
        {user.favorites.map(f=> {
            return (
              <li class="list-group-item list-group-item-dark"><a className="favorite__link" href={`/anime/${f.id}`}>{f.name}</a></li>
            )
        })
        
        }
      </ul>

      </div>
      
      <MyFooter/>
    </div>
  )
}

export default Profile