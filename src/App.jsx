import { useState,useEffect } from 'react';
import {useDebounce} from 'react-use';
import heroImg from './assets/hero-img.png';
import './App.css';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from "./components/MovieCard.jsx";


function App(){
    let [search,setSearch] = useState('');
    let [error, setError] = useState('');
    let [movieList,setMovieList] = useState([]);
    let [isLoading,setIsLoading] = useState(false);
    let [debounceSearch,setDebounceSearch] = useState('');


    useDebounce(() => {
        setDebounceSearch(search);
    },500,[search]);

    const SearchMovies = async () => {
        const search_url = `https://api.themoviedb.org/3/search/movie?query=${debounceSearch}&include_adult=false&language=en-US&page=1`

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
            }
        }

        try{
            setIsLoading(true);
            const response = await fetch(search_url, options);

            if(!response.ok) throw new Error('Error');

            const data = await response.json();

            if(data.Response === 'False') throw new Error('Error');

            if(data.results.length > 0){
                setMovieList(data.results);
            }else setError(`Sorry No Movie With That Name ${debounceSearch}`)

        }catch{
            setError('Oops Their is an Error !');
        }finally{
            setIsLoading(false);
        }
    }

    const GetMovies = async () => {
        const discover_url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
        const api_token = import.meta.env.VITE_API_TOKEN;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${api_token}`
            }
        };

        try{
            setIsLoading(true);
            setError('');
            const response = await fetch(discover_url, options)

            if(!response.ok) throw new Error('Error');

            const data = await response.json();

            if(data.Response === 'False') {
                setError(data.Error || 'Error Happens :(');
                setMovieList([]);
            }

            console.log(data.results);

            if(data.results.length === 0){
                setError('Sorry an Error Happens :(');
            }else setMovieList(data.results);

        }catch{
            setError('Oops Their is an Error !');

        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        GetMovies();
    }, []);

    useEffect(() => {
        if(debounceSearch.length > 0){
            SearchMovies();
        }else{
            GetMovies();
        }
    },[debounceSearch]);


    return(
        <>
        <div className='flex flex-col w-full bg-[url("./assets/BG.png")] max-sm:px-[10%] px-[30%] bg-no-repeat bg-size-[100%]'>
        <header className='relative mt-30'>
            <img src={heroImg} alt="Hero Image for header" className='max-sm:w-[80%] absolute w-2xl top-0 left-[50%] translate-y-[-25%] translate-x-[-50%] z-[0]'/>
            <h1 className='max-sm:mt-40 mt-70 max-sm:text-[28px] '>
                Find <span className='text-gradient'>Movies</span> You'll Enjoy Wihtout the Hassle
              </h1>
        </header>
        <Search search={search} setSearch={setSearch}/>
        </div>
        <section className='w-full mx-auto my-10'>
            <h2 className='mx-auto font-bold w-[80%] my-10 text-5xl'>
                Popular
            </h2>
            <div className='flex flex-row flex-wrap justify-center gap-10 w-[95%] mx-auto'>
                {

                    isLoading ? (
                        <Spinner/>
                    ):error ? (
                        <p className='text-red-800 text-4xl my-20'>{error}</p>
                    ):debounceSearch.length > 0 ? (
                        movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))
                    ):(
                        movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))
                    )

                }
            </div>
        </section>
        </>
  )
}

export default App
