import React, {useEffect, useState} from 'react';
import '../home/Home.css';
import Header from '../../common/header/Header';
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Card,
    CardContent,
    Checkbox,
    TextField,
    Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import LModal from "../../common/login/LModal";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    filterComponent:{
        margin:'theme.spacing.unit',
        minWidth:240,
        maxWidth:240,
    },
    filterHeading:{
        color:'theme.palette.primary.light',
        textTransform:'uppercase',
    }
}));

const Home = (props) => {

    const [movieList, setMovieList] = useState([]);
    const [releasedMovies , setReleasedMovies] = useState([]);
    const [filterList , setFilteredList] = useState([]);
    const [filters,setFilters] = useState([
        {
            title: '',
            sdate: '',
            edate: ''
        }
    ]);
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);

    function myBlurFunction(state) {
        if(state) {
            let containerEle = document.getElementById("main");
            containerEle.style = "filter:blur(2px)";
            console.log("in blur");
        }
        else {
            let containerEle = document.getElementById("main");
            containerEle.style = "filter:blur(0px)";
            console.log("out blur");
        }
    }

    useEffect( () => {

        async function loadMovie () {
            const input = await fetch(props.baseUrl + "movies/")
            const data = await input.json()
                console.log("iti3",data.movies);
                setMovieList(data.movies);
        }
        async function loadReleasedMovies () {
            const input = await fetch(props.baseUrl + "movies/")
            const data = await input.json()
            let releasedList = data.movies.filter((mov) => mov.status === "RELEASED");
            setReleasedMovies(releasedList);
            setFilteredList(releasedList);
            console.log("iti4",releasedList);
        }

        loadMovie();
        loadReleasedMovies();
    }, []);

    function bookShowPageHandler(movieId) {
        props.history.push("/movie/"+movieId);
    }

    function filtr () {
        this.nameInput = document.getElementById("name");
        //this.checkBoxGenre = document.getElementById("genre");
        //this.checkBoxArtist = document.getElementById("artist");
        this.startDateInput = document.getElementById("dateStart");
        let endDateInput = document.getElementById("dateEnd");
        //this.filterMovieItems = releasedList;
        let fil = {title:'',sdate:'',edate:''};

        if(this.nameInput != ""){
            fil.title = this.nameInput.value;
            //setFilters(fil);
            filterResults(fil);
        }
        /*this.nameInput.addEventListener('input', (e) => {
            fil.title = e.target.value;
            setFilters(fil);
            filterResults();
        });*/

        startDateInput.addEventListener('input', (e) => {
            fil.sdate = e.target.value;
            setFilters(fil);
            filterResults();
        });

        endDateInput.addEventListener('input', (e) => {
            fil.edate = e.target.value;
            //setFilters(fil);
            filterResults(fil);
        });
    }

    const filterResults = (filters) => {
        let fltrLst = releasedMovies.filter((item) => {
            let filter = true;
            if(filters.title && !item.title.toLocaleLowerCase().includes(filters.title.toLocaleLowerCase())) {
                filter = false;
            };
            if(filter && filters.sdate && new Date(item.release_date) < new Date(filters.sdate)){
                filter = false;
            }
            if(filter && filters.edate && new Date(item.release_date) > new Date(filters.edate)){
                filter = false;
            }

            return filter;
        });
        setFilteredList(fltrLst);
    }

    return(
        <div>
            <div id="main" className="main-container">
                <Header btnName="Login" pageName="Home" setModalOpen={setModalOpen} myBlurFunction={myBlurFunction} modalOpen={modalOpen}/>
                <div className="movie-heading">Upcoming Movies</div>
                <div className={classes.root}>
                    <ImageList className={classes.imageList} rowHeight={250} cols={6}>
                      {
                          movieList.map((mov) => (
                            <ImageListItem cols={1} key={mov.id}>
                                        <img alt="" src={mov.poster_url}/>
                                        <ImageListItemBar classes={{
                                            root: classes.titleBar
                                        }} title={mov.title} position='bottom' />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                <div className="released-movie-and-filter">
                    <div className="grid-released-movie">
                        <ImageList rowHeight={350} cols={4}>
                            {
                                filterList.map((mov) => (
                                    <ImageListItem cols={1} key={mov.id}>
                                        <img className="released-mov" alt="" src={mov.poster_url} onClick={bookShowPageHandler.bind(this,mov.id)}/>
                                        <ImageListItemBar title={mov.title}  subtitle={`Released Date: ${(new Date(mov.release_date)).toDateString()}`} position='bottom' />
                                    </ImageListItem>
                                ))}
                        </ImageList>
                    </div>

                    <div className="grid-movie-filter">
                        <Card className="main-filter-grid">
                            <CardContent>
                                <Typography style={{color:"theme.palette.primary.light",textTransform:"uppercase"}}>
                                    FIND MOVIES BY:
                                </Typography>

                                <FormControl className={classes.filterComponent}>
                                    <InputLabel htmlFor="name">Movie Name</InputLabel>
                                    <Input id="name" />
                                </FormControl>

                                <FormControl className={classes.filterComponent}>
                                    <InputLabel htmlFor="genre">Genres</InputLabel>
                                    <Select value={releasedMovies} >
                                        {releasedMovies.map((relMov) => (
                                            <MenuItem key={"genre" + relMov.id} value={relMov.genres} disableGutters>
                                                    <Checkbox color="primary" />{relMov.genres}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.filterComponent}>
                                    <InputLabel htmlFor="artist">Artists</InputLabel>
                                    <Select value={releasedMovies} >
                                        {releasedMovies.map((relMov) => (
                                            <MenuItem key={"artist" + relMov.id} value={relMov.artists} disableGutters>
                                                <Checkbox color="primary" />{relMov.artists}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <br/><br/>

                                <FormControl className={classes.filterComponent}>
                                    <InputLabel htmlFor="dateStart" shrink >Release Date Start</InputLabel>
                                    <TextField type="date" id="dateStart"/>
                                </FormControl>
                                <br/><br/>

                                <FormControl className={classes.filterComponent}>
                                    <InputLabel htmlFor="dateEnd" shrink >Release Date End</InputLabel>
                                    <TextField type="date" id="dateEnd"/>
                                </FormControl>

                                <br/><br/><br/>
                                <Button type="submit" className={classes.filterComponent} variant="contained"  color="primary" onClick={filtr.bind(this)}>APPLY</Button>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            {/*{modalOpen && <LModal setOpenModal={setModalOpen} myBlurFunction={myBlurFunction} />}*/}
        </div>
        );
}

export default Home;