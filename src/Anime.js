import React, {useState, useRef} from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./Anime.css"
import axios from 'axios'
import GenreButton from './components/GenreButton'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TvIcon from '@mui/icons-material/Tv';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateIcon from '@mui/icons-material/Create';
import IconNavbar from './components/IconNavbar'
import Comment from './components/Comment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Loading from './components/Loading'
import MyFooter from './components/MyFooter'

function Anime() {
    const user_id = localStorage.getItem("user_id");
    const {id} = useParams()   //anime id
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [season, setSeason] = useState(null)
    const [episode,setEpisode] = useState(0)
    const [comment, setComment] = useState()
    const [liked, setLiked] = useState(false)  //treba da proverim dal je user vec lajkovao to
    const [numbLikes, setNumbLikes] = useState()
    const [listChecked, setListChecked] = useState()
    const textfieldComment = useRef()

    useEffect(() =>{
        const getAnime = async(e) =>{
            try{
                const response = await axios.get(`http://localhost:8000/anime?id=${id}`)
                console.log(response.status)
                if(response.status===201){
                    setAnime(response.data)
                    setLoading(false)
                    setNumbLikes(parseInt(response.data.numb_of_likes))
                    console.log('nadjeno')

                }else{
                    setLoading(false)
                    setNotFound(true)
                }
            }catch(err){
                console.log(err)
                setLoading(false)
                setNotFound(true)
            }
        }
        console.log('useEffect gotov')
        getAnime()
    }, [])


    useEffect( ()=>{
        const getLike = async(e) =>{
            try{
                const user_id=localStorage.getItem('user_id')
                const response = await axios.get(`http://localhost:8000/user?id=${user_id}`)

                var favorite = response.data.favorites.filter(a => a.id == id);
                console.log(favorite)
                if(favorite.length!=0)
                    setLiked(true)
                else
                    setLiked(false)

                var watchlist = response.data.watchlist.some(a =>a.id== id)
                if(watchlist)
                    setListChecked(true)
                else
                    setListChecked(false)
            }catch{

            }
        }

        getLike();
    },[])

    const handleSeasonChange = (event) =>{
        const season = anime.seasons.find(s => s.numb==event.target.value)
        setSeason(season) 
        console.log(season)
    }

    const handleAddComment = async(e) =>{
        console.log(comment)
        
        if(comment!=null){
        try{
            console.log(user_id)
            const anime_id = id
            const response = await axios.post(`http://localhost:8000/comment`, {anime_id, user_id, comment})
            if(response.status==201)
                textfieldComment.current.value=""
            //else
                //alert kao nije dodat
        }catch(err){
            console.log(err)
        }
    }
    }

    const handleLike = async(e) =>{
        if(liked){
            //salje na back da se izbrise
            try{
                const anime_id=id
                const response = await axios.post(`http://localhost:8000/unlike`, {user_id, anime_id})

                if(response.status==200){
                    setLiked(false)
                    setNumbLikes(numbLikes-1)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            try{
                const anime_name=anime.english_name
                const anime_id=id
                const response = await axios.post(`http://localhost:8000/like`, {user_id, anime_id,anime_name })

                if(response.status==200){
                    setLiked(true)
                    setNumbLikes(numbLikes+1)
                }
                
            }catch(err){
                console.log(err)
            }
        }
        
        
    }

    const handleList = async(e) =>{
        if(listChecked){
            try{
                const anime_id=id
                const response = await axios.post(`http://localhost:8000/remove-watchlist`, {user_id, anime_id})

                if(response.status == 200)
                    setListChecked(false)

            }catch(err){

            }
        }else{
            try{
                const anime_name=anime.english_name
                const anime_id=id
                const image=anime.card_image;
                console.log(image)
                const response = await axios.post(`http://localhost:8000/watchlist`, {user_id, anime_id, anime_name, image})

                if(response.status==200)
                    setListChecked(true)
            }catch(err){

            }
        }
    }

    if(loading) return <Loading/>
    if(notFound) return <h1>404 not found</h1>

  return (
      
    <div className='anime__page'>

        <IconNavbar/>

        <div className='container '>

        <div className='row '>
            <div className='col-12'>
            <h1 className='anime__name'>{anime.english_name}</h1>
            </div>
        </div>


        <div className='row'>
        <div className='genre__buttons'>
        {anime.genre.map(g =>{
            return(
                <GenreButton genre={g}/>
            )
        })}
        </div>
        </div>

        <div className='row'>
            <div className='anime__story'>
            {anime.story}
            </div>
        </div>

        <div className='icon__infos'>
        <AccessTimeIcon className='time__icon'/>
        <span> {anime.length}</span>
        <span className='pair1'>
        <TvIcon className='tv__icon'/>
        <span> {anime.seasons.length}</span>
        </span>
        <br/>
        <CalendarMonthIcon className='calendar__icon'/>
        <span> {anime.year}</span>
        <span className='pair2'>
        <CreateIcon className='pen__icon'/>
        <span> {anime.creator}</span>
        </span>
        </div>


        
        <div className='check__icons'>
            <span>{numbLikes}</span>
            {!liked && <FavoriteBorderIcon className='like__icon' onClick={handleLike}/>}
            {liked && <FavoriteIcon className='like__icon' onClick={handleLike}/>}
            {!listChecked && <CheckCircleOutlineIcon className='watchlist__icon' fontSize='large'onClick={handleList}/>}
            {listChecked && <CheckCircleIcon className='watchlist__icon' fontSize='large' onClick={handleList}/>}
            
        </div>



        {anime.type=="movie" && 
            <>
                <iframe src={anime.AMV} className="anime__video"></iframe>
            </>
        }

        {anime.type=="show" && <>
        <div className='row'>
        <select className='seasons' onClick={handleSeasonChange}>
            {anime.seasons.map(s =>{
                return(
                    <option value={s.numb}>Season {s.numb}</option>
                )
            })}
            
        </select>
        </div>
        </>
        }

        {season && <>

            <iframe src={season.episodes[episode]} className="anime__video"></iframe>

        <div className='red'>
        <div className='row'>
            {season.episodes.map((e,index) =>{
                return(
                <div className='col-1'>
                <button className='episode__button' onClick={() => setEpisode(index)}>{index+1}</button>
                {console.log(e)}
                </div>
                )
            })}
        
        </div>
        </div>
        
        </>
        }


        <p className='text_screenshots'>Screenshots from the anime</p>
       
        <div className='red'>
            <div className='row'>
                {anime.screenshots.map(a =>{
                    return(
                        <div className='col-3'>
                        <img src={a} className="screenshot"/>
                        </div>
                    )
                })}
            </div>
        </div>

      

        <h3 className='comments'>Comments</h3>
        <textarea ref={textfieldComment} placeholder='  Write Tour review...' className='comment__text' onChange={(e)=>setComment(e.target.value)}/>
        <br/>
        <button className='send__comment' onClick={handleAddComment}>Send comment</button>
        
        {anime.comments.map(c =>{
            return(
                <div className='row'>
                    <Comment user={c.user} comment={c.comment} date={c.date}/>
                </div>
            )
        })}

        </div>

        <MyFooter/>


    </div>
  )
}

export default Anime