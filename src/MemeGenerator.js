import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';

export function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memes, setMemes] = useState([]);
  const [value, setValue] = useState('aag');

  const onChangeTopText = (e) => {
    setTopText(e.target.value);
  };

  const onChangeBottomText = (e) => {
    setBottomText(e.target.value);
  };

  const memeMaker = `https://api.memegen.link/images/${value}/${topText}/${bottomText}`;

  useEffect(() => {
    axios
      .get('https://api.memegen.link/templates/')
      .then((res) => {
        setMemes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Images-font">
      <img src={memeMaker} alt={memeMaker.name} />
      <select
        id="selectImg"
        onChange={() => {
          const imgSelect = document.getElementById('selectImg');
          const selectedValue = imgSelect.value;
          setValue(selectedValue);
        }}
      >
        {memes.map((meme) => (
          <option key={meme.id} value={meme.id}>
            {meme.name}
          </option>
        ))}
      </select>

      <div>
        <div className="Lol-name">
          <label htmlFor="top">Top Text : </label>
          <input
            type="text"
            className="top"
            value={topText}
            onChange={onChangeTopText}
          />
          <label htmlFor="bottom"> Bottom Text : </label>
          <input type="text" value={bottomText} onChange={onChangeBottomText} />
          <br />
          <br />
          <br />
        </div>
        <div>
          <Button memeImg={memeMaker} />
        </div>
      </div>
    </div>
  );
}

export default MemeGenerator;
