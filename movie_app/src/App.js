import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./Movie.css"
import "./App.css"


//  1. Montirovanie:
//      1. constructor()
//      2. getDerivedStateFromProps()
//      3. render()
//      4. componentDidMount()
//  2. Update
//      1. getDerivedStateFromProps()
//      2. shouldComponentUpdate()
//      3. render()
//      4. getSnapshotBeforeUpdate()
//      5. componentDidUpdate()
// 3. UnMount
//      1. componentWillUnmoun()

function Movie({ id, year, title, summary, poster, genres }) {
    return (
        <div key={id} className="movie">
            <img src={poster} alt={title} title={title} />
            <div className="movie__column">
                <h3 className="movie__title">
                    {title}
                </h3>
                <h5 className="movie__year">
                    {year}
                </h5>
                <ul className="movie__genres">
                    {genres.map((genre, index) => {
                        return (
                            <li key={index} className="genres__genre">
                                {genre}
                            </li>
                        )
                    })}
                </ul>
                <p className="movie__summary">
                    {summary.slice(0, 140)}...
                </p>
            </div>
        </div>
    )
}
Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}


export class App extends React.Component {
    state = {
        isLoading: true,
        movies: []
    }

    getMovies = async () => {
        const { data: { data: { movies } } } = await axios.get(
            "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
        )
        this.setState({ movies, isLoading: false })
    }

    componentDidMount() {
        this.getMovies();
    }

    render() {
        const { isLoading, movies } = this.state
        return (
            <section className="container">
                {isLoading
                    ? <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                    : movies.map(movie => {
                        return (
                            <div key={movie.id} className="movies">
                                <Movie key={movie.id}
                                    id={movie.id}
                                    year={movie.year}
                                    title={movie.title}
                                    summary={movie.summary}
                                    genres={movie.genres}
                                    poster={movie.medium_cover_image}
                                />
                            </div>
                        )
                    }
                    )}
            </section>
        )
    };
};
