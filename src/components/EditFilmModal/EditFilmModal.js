import React, { Component } from 'react';
import './edit-film-modal.scss';
import { connect } from 'react-redux';
import _ from 'lodash';

// components
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// actions
import { editFilm } from '../../actions';

// constants
import { formProperties } from './formProperties';

class EditFilmModal extends Component {
  state = {
    Title: this.props.Title,
    Director: this.props.Director,
    Year: this.props.Year,
    Runtime: this.props.Runtime,
    Genre: this.props.Genre,
    Poster: this.props.Poster,
    imdbID: this.props.imdbID,
    errors: {}
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSave = () => {
    const { editFilm, onCancel } = this.props;
    const formValues = this.state;
    const errorsObject = this.validate(formValues);
    const isFormValid = _.isEmpty(errorsObject);
    if (isFormValid) {
      editFilm(formValues);
      onCancel();
      return;
    }
    this.setState({ errors: this.validate(formValues) });
  };

  onKeyPress = target => {
    if (target.charCode === 13) this.onSave(this.state);
  };

  isDateValid = val => {
    const date = Date.parse(val);
    return !isNaN(date);
  };

  doesTitleExist = val => {
    const { films, imdbID } = this.props;
    const filmsExcludingCurrentFilm = _.filter(films, film => film.imdbID !== imdbID);
    return _.some(filmsExcludingCurrentFilm, film => _.toLower(film.Title) === _.toLower(val));
  };

  validate = formValues => {
    const errors = {};
    const { Title, Director, Year, Genre, Runtime } = formValues;
    if (!Title) {
      errors.Title = 'Title cannot be empty';
    }
    if (this.doesTitleExist(Title)) {
      errors.Title = 'Title already exists';
    }
    if (!Director) {
      errors.Director = `Must specify a director's name`;
    }
    if (Year.length !== 4 || !this.isDateValid(Year)) {
      errors.Year = 'Year must be entered with four digits, e.g. 1976';
    }
    if (!Genre) {
      errors.Genre = 'Must specify a genre';
    }
    if (!Runtime) {
      errors.Runtime = 'Must specify a runtime';
    }
    return errors;
  };

  render() {
    const { onCancel } = this.props;
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Edit Film Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onKeyPress={this.onKeyPress}>
            {_.map(formProperties, (field, i) => {
              const { label, name } = field;
              return (
                <Form.Group key={i}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    type="text"
                    name={name}
                    value={this.state[name]}
                    onChange={this.onInputChange}
                  />
                  <p className="error-msg">{this.state.errors[name]}</p>
                </Form.Group>
              );
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="info" onClick={this.onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
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
  { editFilm }
)(EditFilmModal);
