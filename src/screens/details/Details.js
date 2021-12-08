import React, {useEffect, useState} from 'react';
import '../details/Details.css';
import Header from '../../common/header/Header';
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import YouTube from "react-youtube";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {ImageList, ImageListItem, ImageListItemBar} from "@material-ui/core";

const Details = (props) => {

    const [movie , setMovie] = useState([]);
    const [trailer_url,setTrailerUrl] = useState("");
    const [genres,setGenres] = useState([]);
    const [artists,setArtists] = useState([]);

    useEffect(() => {

        async function loadMovie () {
            const input = await fetch(props.baseUrl + "movies/" + props.match.params.id)
            const data = await input.json()
            console.log("itiiip",data);
            console.log(props.match.params.id);
            setMovie(data);
            setArtists(data.artists);
            let genresList = data.genres.map(function(l){return l}).join(",");
            setGenres(genresList);
            let str = data.trailer_url.toString();
            str = str.split("=")[1]
            setTrailerUrl(str);
        }
        loadMovie();
    },[]);

    const colorChange = () => {
        document.getElementById('rating').style.color = "yellow";
    }
    const colorChange1 = () => {
        document.getElementById('rating1').style.color = "yellow";
    }
    const colorChange2 = () => {
        document.getElementById('rating2').style.color = "yellow";

    }
    const colorChange3 = () => {
        document.getElementById('rating3').style.color = "yellow";
        console.log("yellow");
    }
    const colorChange4 = () => {

        document.getElementById('rating4').style.color = "yellow";
        console.log("yellow");
    }

    return (
        <div>
            <Header btnName="LOGIN" baseUrl={props.baseUrl} pageName="Details" />
            <Typography >
                <Link to="/" className="back-btn" style={ {cursor:"pointer" }}>&#60; Back to Home</Link>
            </Typography>
            <div className="main-body-dtl">
                <div className="img-left-part">
                    <img src={movie.poster_url} alt="" />
                </div>
                <div className="img-dtl-middle-part">
                    <Typography variant="h2">{movie.title}</Typography>
                    <Typography style={{fontWeight:700}}>Genres: {genres}</Typography>
                    <Typography style={{fontWeight:700}}>Duration: {movie.duration}</Typography>
                    <Typography style={{fontWeight:700}}>Release Date: {new Date(movie.release_date).toDateString()}</Typography>
                    <Typography style={{fontWeight:700}}>Rating: {movie.rating}</Typography>
                    <Typography style={{fontWeight:700,marginTop:16}}>Plot: <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}</Typography>
                    <Typography style={{fontWeight:700,marginTop:16}} >Trailer: </Typography>
                    <YouTube videoId={trailer_url} />
                </div>
                <div className="cast-dtl-last-part">
                    <Typography style={{fontWeight:700}}>Rate this movie:</Typography>
                    <StarBorderIcon  id="rating" style={{cursor:"pointer"}} onClick={colorChange}/>
                    <StarBorderIcon  id="rating1" style={{cursor:"pointer"}} onClick={colorChange1}/>
                    <StarBorderIcon  id="rating2" style={{cursor:"pointer"}} onClick={colorChange2}/>
                    <StarBorderIcon  id="rating3" style={{cursor:"pointer"}} onClick={colorChange3}/>
                    <StarBorderIcon  id="rating4" style={{cursor:"pointer"}} onClick={colorChange4}/>
                    <Typography style={{marginTop:16,marginBottom:16}} >Artists: </Typography>
                    <ImageList rowHeight={250} cols={2}>
                        {
                            artists.map((mov) => (
                                <ImageListItem cols={1} key={mov.id}>
                                    <img className="artist_img" alt="" src={mov.profile_url}/>
                                    <ImageListItemBar title={mov.first_name +" "+ mov.last_name}  position='bottom' />
                                </ImageListItem>
                            ))}
                    </ImageList>
                </div>
            </div>
        </div>
    )
}

export default Details;