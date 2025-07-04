

function MovieDetailsFooter({movieData}) {
    return (
        <>
            <div
                className='flex w-full flex-col'>
                <div className='details-card-container' style={{display: movieData.genres.length > 0 ?'flex':'none'}}>
                    <div
                        className='left-details-card'>
                        <p>Generes</p>
                    </div>
                    <div
                        className='right-details-card'>
                        {movieData.genres.map((obj,ind) => (
                            <div
                                key={ind}
                                className='header-card font-bold'
                                >
                                <p className='text-white'>
                                {obj.name}
                            </p></div>
                        ))}
                    </div>
                </div>
                <div className='details-card-container' style={{display: movieData.overview ?'flex':'none'}}>
                    <div
                        className='left-details-card'>
                        <p>Overview</p>
                    </div>
                    <div
                        className='right-details-card'>
                        <p className='text-white text-xl font-medium'>
                            {movieData.overview}
                        </p>
                    </div>
                </div>
                <div className='details-card-container' style={{display: movieData.status ?'flex':'none'}}>
                    <div
                        className='left-details-card'>
                        <p>Status</p>
                    </div>
                    <div
                        className='right-details-card'>
                        <p>{movieData.status}</p>
                    </div>
                </div>
                <div className='details-card-container' style={{display: movieData.release_date ?'flex':'none'}}>
                    <div
                        className='left-details-card'>
                        <p>Release date</p>
                    </div>
                    <div
                        className='right-details-card'>
                        <p>
                            {new Date(movieData.release_date).toDateString()}
                        </p>
                    </div>
                </div>
                <div className='details-card-container' style={{display: movieData.spoken_languages.length > 0?'flex':'none'}}>
                    <div
                        className='left-details-card'>
                        <p>Language</p>
                    </div>
                    <div
                        className='right-details-card'>
                        {movieData.spoken_languages.map((obj,ind) => (
                            <div key={obj + (ind * 2)} className='flex gap-3'>
                                <p className=''>
                                    {obj.english_name}
                                </p>
                                {ind < movieData.spoken_languages.length - 1 ? <p>•</p>:''}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='details-card-container' style={{display: movieData.revenue?'flex':'none'}}>
                    <div
                        className='left-details-card'>
                        <p>Revenue</p>
                    </div>
                    <div
                        className='right-details-card'>
                        <p>{movieData.revenue} $</p>
                    </div>
                </div>
                <div className='details-card-container' style={{display: movieData.production_companies.length > 0 ?'flex':'none'}}>
                    <div
                        className='left-details-card'>
                        <p>Production Companies</p>
                    </div>
                    <div
                        className='right-details-card'>
                        {movieData.production_companies.map((obj,ind) => (
                            <div key={obj + (ind * 2)} className='flex gap-3'>
                                <p className='' key={obj + (ind * 3)}>
                                    {obj.name}
                                </p>
                                {ind < movieData.production_companies.length - 1 ? <p key={obj +'*'+ (ind * 3)}>•</p>:''}
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </>
    )
}

export default MovieDetailsFooter;