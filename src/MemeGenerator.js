import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';

export function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memes, setMemes] = useState([]);
  const [img, setImg] = useState('aag');

  const onChangeTopText = (e) => {
    console.log(e);
    setTopText(e.target.value);
  };

  const onChangeBottomText = (e) => {
    console.log(e);
    setBottomText(e.target.value);
  };

  const memeImg = `https://api.memegen.link/images/${img}/${topText}/${bottomText}`;

  useEffect(() => {
    axios
      .get('https://api.memegen.link/templates/')
      .then((res) => {
        console.log(res);
        setMemes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Images-font">
      <img src={memeImg} alt={memeImg.name} />
      <select
        id="selectImg"
        onChange={(e) => {
          const imgSelect = document.getElementById('selectImg');
          const selectedValue = imgSelect.value;
          setImg(selectedValue);
          // console.log(memeImg);
        }}
      >
        {memes.map((meme) => (
          <option key={meme.key} value={meme.key}>
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
          ></input>
          <label htmlFor="bottom"> Bottom Text : </label>
          <input
            type="text"
            value={bottomText}
            onChange={onChangeBottomText}
          ></input>
          <br />
          <br />
          <br />
        </div>
        <div>
          <Button memeImg={memeImg} />
        </div>
      </div>
    </div>
  );
}

export default MemeGenerator;
