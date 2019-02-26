import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './film-list.scss';

// components
import FilmCard from '../FilmCard/FilmCard';
import AddFilmButton from '../AddFilmButton/AddFilmButton';
import EditFilmModal from '../EditFilmModal/EditFilmModal';
import BootstrapModal from '../Modal/BootstrapModal';
import Spinner from '../Spinner/Spinner';

// actions
import { fetchFilms, addFilm } from '../../actions';

// helpers
import removeSpecialChars from '../../helpers/removeSpecialChars';

const DEFAULT_FILM_IMG =
  'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1728&q=80';

class FilmList extends Component {
  state = {
    showNewFilmModal: false,
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.fetchFilms().then(() => this.setState({ isLoading: false }));
  }

  handleShow = () => {
    this.setState({ showNewFilmModal: true });
  };

  handleClose = () => {
    this.setState({ showNewFilmModal: false });
  };

  render() {
    const { films } = this.props;
    const { isLoading, showNewFilmModal } = this.state;
    return (
      <>
        <h1 className="text-center">Herolo Cinema</h1>
        <div className="film-list">
          {isLoading && <Spinner />}
          {_.map(films, film => {
            const { Poster, Title, imdbID, Year, Director, Genre, Runtime } = film;
            return (
              <FilmCard
                key={imdbID}
                Poster={Poster}
                Title={_.startCase(_.toLower(removeSpecialChars(Title)))}
                Year={Year}
                Director={Director}
                Runtime={Runtime}
                Genre={Genre}
                imdbID={imdbID}
              />
            );
          })}
          <AddFilmButton onClick={this.handleShow} />
          <BootstrapModal show={showNewFilmModal} onHide={this.handleClose}>
            <EditFilmModal
              onCancel={this.handleClose}
              Title=""
              Director=""
              Year=""
              Runtime=""
              Genre=""
              Poster={DEFAULT_FILM_IMG}
              imdbID={_.uniqueId('tt99999')}
              isNew={true}
            />
          </BootstrapModal>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    films: state.films
  };
};

export default connect(
  mapStateToProps,
  { fetchFilms, addFilm }
)(FilmList);
