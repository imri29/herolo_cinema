import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './film-list.scss';

// components
import FilmCard from '../FilmCard/FilmCard';
import AddFilm from '../AddFilm/AddFilm';
import EditFilmModal from '../EditFilmModal/EditFilmModal';
import BootstrapModal from '../Modal/BootstrapModal';

// actions
import { fetchFilms, addFilm } from '../../actions';

// helpers
import removeSpecialChars from '../../helpers/removeSpecialChars';

const DEFAULT_FILM_URL =
  'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1728&q=80';

class FilmList extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    this.props.fetchFilms();
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  onAddFilm = () => {
    this.setState({ show: true });
    this.props.addFilm();
  };

  render() {
    const { films } = this.props;

    return (
      <div className="film-list">
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
        <AddFilm onClick={this.handleShow} />
        <BootstrapModal show={this.state.show} onHide={this.handleClose}>
          <EditFilmModal
            onCancel={this.handleClose}
            Title=""
            Director=""
            Year=""
            Runtime=""
            Genre=""
            Poster={DEFAULT_FILM_URL}
            imdbID={_.uniqueId('tt99999')}
          />
        </BootstrapModal>
      </div>
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
