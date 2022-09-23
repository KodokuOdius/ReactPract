import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelServices from "../../services/MarvelServices";


class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateChar();
    }

    state = {
        character: {},
        isLoading: true,
        error: false
    };

    marvelService = new MarvelServices();

    onError = () => {
        this.setState({
            isLoading: false,
            error: true
        });
    };

    onCharacterLoaded = (character) => {
        this.setState({ character: character, isLoading: false });
    }

    updateChar = () => {
        this.setState({ isLoading: true });
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacter(id).then(this.onCharacterLoaded).catch(this.onError);
    };

    render() {
        const { character, isLoading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = isLoading ? <Spinner /> : null;
        const content = !(isLoading || error) ? <View character={character} /> : null;


        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        );
    };
};

const View = ({ character }) => {
    const { name, description, thumbnail, homePage, wiki } = character;
    let real_description = "There is no descriptions";
    if (typeof (description) === "string" && description.length > 0 && description.length < 100) {
        real_description = description;
    } else if (typeof (description) === "string" && description.length >= 100) {
        real_description = description.slice(0, 100) + "...";
    };

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {real_description}
                </p>
                <div className="randomchar__btns">
                    <a href={homePage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;