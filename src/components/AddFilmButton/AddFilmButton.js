import React from 'react';
import './add-film-button.scss';

const AddFilmButton = ({ onClick }) => {
  return (
    <button className="add-film" title="Add new film">
      <i
        className="fas fa-plus-circle fa-4x"
        onClick={onClick}
      />
    </button>
  )
};

export default AddFilmButton;