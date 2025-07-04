import noPosterVertical from '../assets/No-Poster.png';
import noPosterHorizontal from '../assets/No-PosterH.png';
import play from '../assets/play.svg';

function MovieDetailsImage({movieData}){
    const img_url = 'https://image.tmdb.org/t/p/original';
    const poster = movieData.poster_path === null ? noPosterVertical:`${img_url}${movieData.poster_path}`;
    const backdrop = movieData.backdrop_path === null ? noPosterHorizontal:`${img_url}${movieData.backdrop_path}`;
    return(
        <>
            <div className='flex flex-row justify-between items-center gap-8 my-16'>
                <div className='w-[30%] h-[600px] rounded-md
                       overflow-hidden' style={{background: `url(${poster})`,backgroundSize: '100%',backgroundPosition: 'center'}}
                    >
                </div>

                <div className='w-[75%] h-[600px] rounded-md
                       overflow-hidden relative cursor-pointer'
                     style={{background: `url(${backdrop})`,backgroundSize: '103%',backgroundPosition: 'center'}}
                >
                    <div className='rounded-3xl backdrop-blur-2xl bg-white-blur
                            px-6 py-2 flex select-none
                            items-center gap-2 w-fit
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