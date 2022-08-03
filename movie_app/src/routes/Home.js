import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css"


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


export class Home extends React.Component {
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
