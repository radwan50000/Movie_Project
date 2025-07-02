import Star from "../assets/star.svg";
import NoPoster from '../assets/No-Poster.png';

function MovieCard({movie}) {
    const img_url = 'https://image.tmdb.org/t/p/w500';

    return (
        <div
            className='flex flex-col w-fit
                 h-fit p-6 gap-4 items-start
                  bg-dark-100 rounded-md bg-center
                  justify-start'>

            <div className='w-[300px] rounded-md
                                    overflow-hidden'>
                <img
                    className='w-full'
                    src={movie.poster_path ? `${img_url}${movie.poster_path}` : NoPoster}
                    alt={`${movie.original_title} poster`} />
            </div>
            <p className='text-white font-bold text-xl
                    w-[270px]' data-name={movie.title}>
                {movie.title != null && movie.title ? movie.title.length > 23 ? movie.title.substring(0, 23) + '...' : movie.title:'Unknown movie'}
            </p>

            <div className='flex flex-row gap-1 '>
                <img className='mr-1' src={Star} alt='Star image'/>
                <span className='text-white font-black'>
                                        {movie.vote_average.toFixed(1)}
                                    </span>
                <span className='text-gray-400 font-extrabold'>
                                        • {movie.original_language != 'xx'
                                            || movie.original_language != ''  ?
                                        movie.original_language : 'N/A'} •
                                        {movie.release_date ? new Date(movie.release_date).getFullYear(): 'N/A'}
                                    </span>
            </div>

        </div>
    )
}

export default MovieCard;