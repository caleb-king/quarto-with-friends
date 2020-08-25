import React from 'react';

function SelectNameModal(props) {
  const { setCurrPlayer } = props;
  
  function handleSubmit(e) {
    e.preventDefault();
    setCurrPlayer(e.target['select-name'].value);
  }
  
  return (
    <div className="modal fixed">
      <form id="select-name-form" className="select-name-form" onSubmit={handleSubmit}>
        <label htmlFor="select-name">Select your name</label>
        <div className="input-container">
          <i className="fas fa-user"></i>
          <select className="select-name" id="select-name">
            <option value={props.guest}>{props.guest}</option>
            <option value={props.host}>{props.host}</option>
          </select>
        </div>

        <div className="button-container">
          <button className="button" type="submit">
            JOIN GAME
          </button>
        </div>
      </form>
    </div>
  );
}

export default SelectNameModal;
