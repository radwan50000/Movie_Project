import star from "../assets/star.svg";
import arrow from "../assets/arrow.svg";

function MovieDetailsHeader ({movieData}) {

    return (
         // Main Container Page
        <header className='flex flex-row justify-between'>
            <div className='flex flex-col justify-start gap-8 w-8/12'>
                {/*Header Title*/}
                <p className='w-fit text-white flex text-5xl font-semibold font-sans'>
                    {movieData.title}
                </p>
                {/*Header Info Container*/}
                <div className='flex flex-row items-center gap-3'>
                                    <span className='text-purple-text'>
                                        {new Date(movieData.release_date).getFullYear()}
                                    </span>
                    <span className='text-purple-text'>
                                        •
                                    </span>
                    <span className='text-purple-text flex flex-row gap-2'>
                                    PG-2
                                    </span>
                    <span className='text-purple-text'>
                                        •
                                    </span>

                    <span className='text-purple-text'>
                                        {(movieData.runtime / 60).toFixed(0)}h {(movieData.runtime % 60)}m
                                    </span>

                </div>
            </div>
            {/*Header Cards*/}
            <div className='flex flex-row gap-2'>
                {/*Rating Card*/}
                <div className='header-card'>
                    <img src={star} alt='Star Image'/>
                    <span className='text-purple-text'>
                                        <span className='text-white font-semibold'>{(movieData.vote_average).toFixed(1)}</span>
                                        /10
                                    </span>
                    <span  className='text-purple-text'>
                                        ({movieData.vote_count})
                                    </span>
                </div>
                <div className='header-card'>
                    <img src={arrow} alt='Star Image'/>
                    <span  className='text-purple-text'>
                                        1
                                    </span>
                </div>
            </div>

        </header>
    )
}

export default MovieDetailsHeader;