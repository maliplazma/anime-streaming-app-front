import React,  {useState, useEffect} from 'react'
import "./Watchlist.css";
import IconNavbar from './components/IconNavbar'
import axios from 'axios'
import Loading from './components/Loading'
import MyFooter from './components/MyFooter'
import AnimeCard from './components/AnimeCard';

function Watchlist() {
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
    <div className='watch'>
        <IconNavbar/>
      
        <div className='row m-5'>
          {user.watchlist.map( anime =>{
            return(
              <div className='col-3 mt-4'>
              <AnimeCard id={anime.id} name={anime.name} image={anime.image} year={""} genre={""}/>
              </div>
            )
          })}

        </div>

        
        <MyFooter/>
    </div>
  )
}

export default Watchlist