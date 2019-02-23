import React from 'react';
import './add-film.scss';

const AddFilm = ({ onClick }) => {
  return (
    <div className="add-film">
      <i
        className="fas fa-plus-circle fa-4x"
        onClick={onClick}/>
    </div>
  )
};

export default AddFilm;