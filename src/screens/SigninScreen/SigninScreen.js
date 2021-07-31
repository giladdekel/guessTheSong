import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Button from "@material-ui/core/Button";

import "./GameScreen.scss";
import { TextField } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Alert from "@material-ui/lab/Alert";

export default function GameScreen() {
  const [play, setPlay] = useState(false);

  const [shot, setShot] = useState(3);

  const [playShort, setPlayShort] = useState(true);
  const [playMedium, setPlayMedium] = useState(false);

  const [playLong, setPlayLong] = useState(false);

  const [playShortButton, setPlayShortButton] = useState(true);
  const [playMediumButton, setPlayMediumButton] = useState(false);

  const [playLongButton, setPlayLongButton] = useState(false);

  const [result, setResult] = useState(false);

  const [answer, setAnswer] = useState("");

  const [song, setSong] = useState("");

  const [url, setUrl] = useState("");

  const [score, setScore] = useState(false);
  const [songs, setSongs] = useState([
    "africa",
    "big-in-japan",
    "bittersweet-symphony",
    "kashmir",
    "let-it-be",
    "we-will-rock-you",
  ]);

  useEffect(() => {
    let song = songs[Math.floor(Math.random() * songs.length)];
    setSong(song);
    setUrl(`./audio/${song}.mp3`);
    setSongs((prev) => prev.filter((s) => s !== song));
    setPlayShortButton(true);
    setPlayMediumButton(false);
    setPlayLongButton(false);
    setPlayShort(true);
    setPlayMedium(false);
    setPlayLong(false);
  }, []);

  const playSongFirst = () => {
    setPlay(true);
    setPlayShort(true);
    setPlayMedium(false);
    setPlayLong(false);
    setTimeout(() => {
      setPlayShortButton(false);
      setPlayMediumButton(true);
      setPlayLongButton(false);
      setPlay(false);
    }, 1000);
  };

  const playSongSecond = () => {
    setPlay(true);
    setPlayShort(false);
    setPlayMedium(true);
    setPlayLong(false);

    setTimeout(() => {
      setPlayShortButton(false);
      setPlayMediumButton(false);
      setPlayLongButton(true);
      setPlay(false);
    }, 3000);
  };

  const playSongThird = () => {
    setPlay(true);
    setPlayShort(false);
    setPlayMedium(false);
    setPlayLong(true);
    setTimeout(() => {
      setPlayShortButton(false);
      setPlayMediumButton(false);
      setPlayLongButton(false);
      setPlay(false);
    }, 5000);
  };

  const checkAnswer = () => {
    setShot((prev) => prev - 1);

    if (
      answer.trim("").toLocaleLowerCase() ===
      song.replace(/-/g, " ").toLocaleLowerCase()
    ) {
      if (playShort) {
        setScore((prev) => prev + 10);
      } else if (playMedium) {
        setScore((prev) => prev + 5);
      } else if (playLong) {
        setScore((prev) => prev + 3);
      }
      //   setResult(answer);

      startGame();
    }
  };

  const startGame = () => {
    let song = songs[Math.floor(Math.random() * songs.length)];
    setSong(song);
    setUrl(`./audio/${song}.mp3`);

    setPlay(false);
    setPlayShortButton(true);
    setPlayMediumButton(false);
    setPlayLongButton(false);

    setPlayShort(true);
    setPlayMedium(false);
    setPlayLong(false);

    setShot(3);
    setAnswer("");

    setSongs((prev) => prev.filter((s) => s !== song));
  };

  return (
    <>
      <div className="GameScreen">
        <div class="demo-wrap">
          <img class="demo-bg" src="images/back1.jpg" alt="" />

          <Container maxWidth="sm">
            <div class="demo-content">
              <div>
                <div>
                  {songs.length === 0 ? (
                    <h1>game end your score is {score} points</h1>
                  ) : (
                    <>
                      {" "}
                      <h1 className="rainbow-text">Which Song Playing </h1>
                      {score && <p>score: {score}</p>}
                      {shot === 0 ? (
                        <>
                          <Alert severity="error">you didn't guess the song</Alert>

                          <button onClick={startGame}>start a new game</button>
                        </>
                      ) : (
                        <>
                          {shot === 3 && (
                            <Alert severity="info">first try</Alert>
                          )}
                          {shot === 2 && (
                            <Alert severity="info">second try</Alert>
                          )}
                          {shot === 1 && (
                            <Alert severity="info">third try</Alert>
                          )}
                          {!playShortButton && (
                            <>
                              {" "}
                              <TextField
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                id="standard-basic"
                                label="enter the song name"
                              />
                              <Button
                                onClick={checkAnswer}
                                variant="contained"
                                color="primary"
                              >
                                Guess
                              </Button>
                              {result && <h1>{result}</h1>}{" "}
                            </>
                          )}
                          <br />
                          <Alert severity="info"> you have {shot} guess</Alert>
                          <br />
                          {play && (
                            <ReactPlayer
                              style={{ display: "none" }}
                              url={url}
                              playing
                              loop
                            />
                          )}
                          {/* {firstTry && <><h1>first try</h1><p>if you answer right you will get 10 point</p><button onClick={playSongFirst}>play1</button></>}
              {secondTry && <><h1>first try</h1><p>if you answer right you will get 5 point</p><button onClick={playSongSecond}>play2</button></>}
              {thirdTry && <><h1>first try</h1><p>if you answer right you will get 3 point</p><button onClick={playSongThird}>play3</button></>} */}
                          {playShort && <p>play for 10 points</p>}
                          {playMedium && <p>play for 5 points</p>}
                          {playLong && <p>play for 3 points</p>}
                          {playShortButton && (
                            <>
                              {" "}
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={playSongFirst}
                              >
                                play for 10 points
                              </Button>
                            </>
                          )}
                          {playMediumButton && (
                            <>
                              <p>
                                {" "}
                                or click to listen for longer time for 5 point
                              </p>{" "}
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={playSongSecond}
                              >
                                play for 5 points
                              </Button>
                            </>
                          )}
                          {playLongButton && (
                            <>
                              {" "}
                              <p>
                                or click to listen for longer time for 3 point
                              </p>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={playSongThird}
                              >
                                play for 3 points
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
