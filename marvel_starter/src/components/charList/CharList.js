import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        characters: [],
        isLoading: true
    }
    componentDidMount() {
        this.getChars();
    };

    marvelService = new MarvelService();

    onCharsLoaded = (characters) => {
        this.setState({
            isLoading: false,
            characters: characters
        });
    };

    getChars = () => {
        this.marvelService.getAllCharacters().then(this.onCharsLoaded);
    };


    render() {
        const { characters, isLoading } = this.state;

        const spinner = isLoading ? <Spinner /> : null;
        const content = !(isLoading) ? <CharsListView
            characters={characters}
            onCharSelected={this.props.onCharSelected}
        /> : null;


        return (
            <div className="char__list">
                {spinner}

                <ul className="char__grid">
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    };
};

const CharsListView = ({ characters, onCharSelected }) => {
    const onClickChar = (event, id) => {
        onCharSelected(id);
        const selected = document.querySelector(".char__item_selected");
        if (selected !== null) {
            selected.classList.toggle("char__item_selected");
        };
        event.currentTarget.classList.toggle("char__item_selected");
    };

    return (
        characters.map(character => {
            let imgStyle = { "objectFit": "cover" };
            if (character["thumbnail"] === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { "objectFit": "contain" };
            };
            return (
                <li key={character.id} className="char__item" onClick={e => onClickChar(e, character.id)}>
                    <img src={character["thumbnail"]} alt={character["name"]} style={imgStyle} />
                    <div className="char__name">
                        {character["name"]}
                    </div>
                </li>
            );
        })
    );
};

export default CharList;