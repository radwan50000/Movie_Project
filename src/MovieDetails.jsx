import {useState , useEffect} from 'react';
import MovieDetailsHeader from "./components/MovieDetailsHeader.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieDetailsImage from "./components/MovieDetailsImage.jsx";
import MovieDetailsFooter from "./components/MovieDetailsFooter.jsx";

function MovieDetails() {
    let [errorMessage, setErrorMessage] = useState('');
    let [movieData , setMovieData] = useState({});
    let [isLoading , setIsLoading] = useState(false);

    const getMovieData = async (movieId) => {
        try{
            setIsLoading(true);
            const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
                }
            };

            const response = await fetch(url, options);

            if(!response.ok) throw new Error("Error While Fetching Data");

            const data = await response.json();

            if(!data.status === 200) throw new Error("Data Not Found");


            setMovieData(data);

        }catch(error){
            console.log(error);
            setErrorMessage(error.message);
        }finally {
            setIsLoading(false);
        }


    }

    useEffect(() => {
        getMovieData(sessionStorage.getItem('movie'));

    }, []);

    useEffect(() => {
         Object.keys(movieData).length > 0 ? console.log(movieData) : console.log(null);
    }, [movieData]);


    return(
        <>
            <div className='bg-[#030014] w-full h-fit box-border '>
                {/*Movie Details Container*/}

                <div className='my-16 mx-32 px-16 py-8 bg-[#0F0D23] w-100% box-border h-fit rounded-md shadow'>
                    <div
                        className='flex flex-start w-fit
                            h-fit cursor-pointer items-center gap-2
                            translate-x-[-10%]'
                            onClick={() => {
                                window.location.href ='/';
                            }}>
                        <svg className="w-12 h-12 text-gray-800 dark:text-purple-text" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                        </svg>
                        <span className="text-purple-text text-3xl">
                            Home Page
                        </span>

                    </div>
                    {
                        isLoading ? <div className='flex justify-center items-center'><Spinner/></div>
                            : Object.keys(movieData).length > 0 ? <MovieDetailsHeader movieData={movieData}/>
                                : errorMessage ? <p className='text-3xl text-red-800 font-sans font-black'>⚠️ Sorry Error Happens while Getting Data ⚠️</p>:null
                    }

                    {
                        Object.keys(movieData).length > 0 ? <MovieDetailsImage movieData={movieData}/>:null
                    }

                    {
                        Object.keys(movieData).length > 0 ? <MovieDetailsFooter movieData={movieData}/>:null
                    }

                </div>
            </div>
        </>
    )
}


export default MovieDetails;