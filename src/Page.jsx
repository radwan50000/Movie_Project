import App from './App.jsx'
import MovieDetails from './MovieDetails.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function Page() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path='/movie-details' element={<MovieDetails/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Page