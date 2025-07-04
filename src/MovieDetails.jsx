import {useState , useEffect} from 'react';
import MovieDetailsHeader from "./components/MovieDetailsHeader.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieDetailsImage from "./components/MovieDetailsImage.jsx";

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
                    {
                        isLoading ? <div className='flex justify-center items-center'> <Spinner /> </div>
                        :Object.keys(movieData).length > 0 ? <MovieDetailsHeader movieData={movieData}/>
                        :errorMessage ? <p className='text-3xl text-red-800 font-sans font-black'>⚠️ Sorry Error Happens while Getting Data ⚠️</p>:null
                    }
                    {
                        Object.keys(movieData).length > 0 ? <MovieDetailsImage movieData={movieData}/>:<p></p>
                    }


                </div>
            </div>
        </>
    )
}


export default MovieDetails;