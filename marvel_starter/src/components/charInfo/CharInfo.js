import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';


class CharInfo extends Component {
    state = {
        character: null,
        isLoading: false,
        error: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    };

    onError = () => {
        this.setState({
            isLoading: false,
            error: true
        });
    };

    onCharacterLoaded = (character) => {
        this.setState({ character: character, isLoading: false });
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        };
    };

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) { return };

        this.setState({ isLoading: true });

        this.marvelService.getCharacter(charId).then(
            this.onCharacterLoaded
        ).catch(
            this.onError
        );
    };

    render() {
        const { character, isLoading, error } = this.state;

        const skeleton = (character || isLoading || error) ? null : <Skeleton />;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = isLoading ? <Spinner /> : null;
        const content = !(isLoading || error || !character) ? <View character={character} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    };
}

const View = ({ character }) => {
    const { name, description, thumbnail, homePage, wiki, comics } = character;

    let imgStyle = { "objectFit": "cover" };
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { "objectFit": "contain" };
    };

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.lenght > 0 ? null : "There is no comics with this characted"}
                {comics.slice(0, 10).map((comic, i) => {
                    return (
                        <li className="char__comics-item" key={i}>
                            {comic.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CharInfo;