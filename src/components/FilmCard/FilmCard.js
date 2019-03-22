import React, { Component } from 'react';
import './film-card.scss';
import { connect } from 'react-redux';

// components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BootstrapModal from '../Modal/BootstrapModal';
import RemoveFilmModal from '../DeleteFilmModal/RemoveFilmModal';
import EditFilmModal from '../EditFilmModal/EditFilmModal';

// actions
import { removeFilm } from '../../actions/index';

import { DEFAULT_FILM_POSTER as fallbackPoster } from '../FilmsList/FilmList';

class FilmCard extends Component {
  state = {
    showModal: false,
    isInEditMode: false
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  openDeleteFilmModal = () => {
    this.setState({ isInEditMode: false });
    this.handleShow();
  };

  openEditFilmModal = () => {
    this.setState({ isInEditMode: true });
    this.handleShow();
  };

  removeFilm = () => {
    const { imdbID } = this.props;
    this.props.removeFilm(imdbID);
    this.handleClose();
  };

  render() {
    const { Poster, Title, Year, Runtime, Genre, Director, imdbID } = this.props;
    const { showModal, isInEditMode } = this.state;
    return (
      <>
        <Card className="film-card shadow">
          <Card.Img
            className="my-card-img"
            variant="top"
            src={Poster}
            onError={e => {
              e.target.onerror = null;
              e.target.src = fallbackPoster;
            }}
            alt={Title} />
          <Card.Body className="card-text">
            <Card.Title>{Title}</Card.Title>
            <Card.Text><span>Director: </span>{Director}</Card.Text>
            <Card.Text><span>Year: </span>{Year}</Card.Text>
            <Card.Text><span>Genre: </span>{Genre}</Card.Text>
            <Card.Text><span>Runtime: </span>{Runtime}</Card.Text>
            <Card.Text><span>imdbID: </span>{imdbID}</Card.Text>
            <div className="buttons">
              <Button className="delete-button" variant="outline-danger" onClick={this.openDeleteFilmModal}>
                <i className="fas fa-trash" />
              </Button>
              <Button
                className="edit-button"
                variant="info"
                onClick={this.openEditFilmModal}
              >
                Edit Details
              </Button>
            </div>
          </Card.Body>
        </Card>
        <BootstrapModal show={showModal} onHide={this.handleClose}>
          {isInEditMode ? (
            <EditFilmModal
              onCancel={this.handleClose}
              Title={Title}
              Director={Director}
              Year={Year}
              Runtime={Runtime}
              Genre={Genre}
              Poster={Poster}
              imdbID={imdbID}
            />
          ) : (
            <RemoveFilmModal onRemove={this.removeFilm} onCancel={this.handleClose} />
          )}
        </BootstrapModal>
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
  { removeFilm }
)(FilmCard);
