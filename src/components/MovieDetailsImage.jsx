import noPosterVertical from '../assets/No-Poster.png';
import noPosterHorizontal from '../assets/No-PosterH.png';
import play from '../assets/play.svg';
import {useEffect, useState} from "react";

function MovieDetailsImage({movieData}){
    const img_url = 'https://image.tmdb.org/t/p/original';
    const video_url = `https://api.themoviedb.org/3/movie/${sessionStorage.getItem('movie')}/videos`;
    let [movieUrl, setMovieUrl] = useState('');
    const poster = movieData.poster_path === null ? noPosterVertical:`${img_url}${movieData.poster_path}`;
    const backdrop = movieData.backdrop_path === null ? noPosterHorizontal:`${img_url}${movieData.backdrop_path}`;

    const getMovieUrl = async () => {

        try{
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
                }
            }

            const response = await fetch(video_url,options);

            if(!response.ok) throw new Error('Error Found')

            const data = await response.json();

            if(data.Response === 'False') throw new Error('Error Found')

            if(! data.results.length > 0) throw new Error('Error Found')

            console.log(data.results[0].key);
            setMovieUrl(data.results[0].key);
        }catch(error){
            console.log(error.message);
        }

    }

    useEffect(() => {
        getMovieUrl();
    },[])

    return(
        <>
            <div className='flex flex-row justify-between items-center gap-8 my-16'>
                <div className='w-[30%] h-[600px] rounded-md
                       overflow-hidden' style={{background: `url(${poster})`,backgroundSize: '100%',backgroundPosition: 'center'}}
                    >
                </div>

                <div className='w-[75%] h-[600px] rounded-md
                       overflow-hidden relative cursor-pointer'
                     id='video-container'
                     style={{background: `url(${backdrop})`,backgroundSize: '103%',backgroundPosition: 'center'}}
                     onClick={() => {
                         document.getElementById('video-container').innerHTML = `<iframe width="100%" height="100%"
                                      src="https://www.youtube.com/embed/${movieUrl}?autoplay=1"
                                      frameborder="0"
                                      allow="autoplay; encrypted-media"
                                      allowfullscreen></iframe>`
                     }}
                >
                    <div className='rounded-3xl backdrop-blur-2xl bg-white-blur
                            px-6 py-2 flex select-none
                            items-center gap-2 w-fit z-30
                            absolute bottom-[20px] left-[20px]'>
                        <img src={play} alt='play icon' />

                        <span className='text-white'>Trailer</span>

                        <span className='text-purple-text'>•</span>

                        <span className='text-white'>00:31</span>

                    </div>
                </div>



            </div>
        </>
    )
}


export default MovieDetailsImage