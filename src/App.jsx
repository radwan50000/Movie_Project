import { useState,useEffect } from 'react'
import heroImg from './assets/hero-img.png'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'
import Star from './assets/star.svg'
import MovieCard from "./components/MovieCard.jsx";


function App(){
    let [search,setSearch] = useState('');
    let [error, setError] = useState('');
    let [movieList,setMovieList] = useState([]);
    let [isLoading,setIsLoading] = useState(false);

    const GetMovies = async () => {
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
        const api_key = import.meta.env.VITE_API_KEY;
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
            const response = await fetch(url, options)

            if(!response.ok) throw new Error('Error');

            const data = await response.json();

            if(data.Response === 'False') {
                setError(data.Error || 'Error Happens :(');
                setMovieList([]);
            }

            setMovieList(data.results);
            console.log(data.results)

        }catch{
            setError('Oops Their is an Error !');

        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        GetMovies();
    }, []);

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
                        <p className='text-red-800'>Oops an Error Happens</p>
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
