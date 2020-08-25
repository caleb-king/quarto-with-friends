import React from 'react';

function SelectNameModal(props) {
  function handleSubmit(e) {
    e.preventDefault();

    // const updateGuest = {
    //   gameId: gameID,
    //   guest: e.target['guest-name'].value,
    // }
    // fetch(`${config.API_ENDPOINT}/games`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(updateGuest),
    // })
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e));
    //     return res.json();
    //   })
    //   .then(game => {
    //     props.updateCurrPlayer(game.guest);
    //     props.displayHowToPlayModal();
    //   })
    //   .catch(error => {
    //     console.error({ error });
    //   });
  }
  
  return (
    <div className="modal fixed">
      <form id="select-name" className="select-name" onSubmit={handleSubmit}>
        <label htmlFor="select-your-name">Enter your name below</label>
        <div className="input-container">
          <i className="fas fa-user"></i>
          <select className="select-your-name">
            <option value={props.guest} />
            <option value={props.host} />
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
