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
  const [playMediumButtonGray, setPlayMediumButtonGray] = useState(false);
  const [playLongButton, setPlayLongButton] = useState(false);
  const [playLongButtonGray, setPlayLongButtonGray] = useState(false);

  const [result, setResult] = useState(false);

  const [answer, setAnswer] = useState("");

  const [song, setSong] = useState("");

  const [url, setUrl] = useState("");

  const [score, setScore] = useState(false);

  const [game, setGame] = useState(false);
  const [playGame, setPlayGame] = useState(false);

  const [songs, setSongs] = useState([
    "africa",
    "big-in-japan",
    "bittersweet-symphony",
    "kashmir",
    "let-it-be",
    "we-will-rock-you",
  ]);

  const timeOfGame = 60;
  const [counter, setCounter] = useState(timeOfGame);
  const [songNumber, setSongNumber] = useState(1);

  // useEffect(() => {
  //   startGame();
  // }, []);

  const startGame = () => {
    setGame(true);
    let song = songs[Math.floor(Math.random() * songs.length)];
    setSong(song);
    setUrl(`./audio/${song}.mp3`);
    setCounter(timeOfGame);
    count = timeOfGame;
    playTimer();

    // setPlay(false);
    setPlayShortButton(true);
    setPlayMediumButton(false);
    setPlayLongButton(false);
    setPlayMediumButtonGray(false);
    setPlayLongButtonGray(false);
    setPlayShort(true);
    setPlayMedium(false);
    setPlayLong(false);

    setShot(3);
    setAnswer("");
    setScore(0);

    setTimeout(() => {
      playSongFirst();
    }, 1500);
    setSongs((prev) => prev.filter((s) => s !== song));
  };

  const moveToNextQuestion = () => {
    // setGame(true);

    setSongNumber((prev) => prev + 1);
    let song = songs[Math.floor(Math.random() * songs.length)];
    setSong(song);
    setUrl(`./audio/${song}.mp3`);
    // setCounter(timeOfGame);
    // count = timeOfGame;
    // playTimer();

    // setPlay(false);
    setPlayShortButton(true);
    setPlayMediumButton(false);
    setPlayLongButton(false);
    setPlayMediumButtonGray(false);
    setPlayLongButtonGray(false);
    setPlayShort(true);
    setPlayMedium(false);
    setPlayLong(false);

    setShot(3);
    setAnswer("");

    setTimeout(() => {
      playSongFirst();
    }, 1500);
    setSongs((prev) => prev.filter((s) => s !== song));
  };

  const playSongFirst = () => {
    setPlay(true);
    setPlayShort(true);
    setPlayMedium(false);
    setPlayLong(false);
    setTimeout(() => {
      // setPlayShortButton(false);
      setPlayMediumButtonGray(true);
      // setPlayMediumButton(true);
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
      // setPlayShortButton(false);
      // setPlayMediumButton(false);
      setPlayLongButtonGray(true);
      setPlay(false);
    }, 3000);
  };

  const playSongThird = () => {
    setPlay(true);
    setPlayShort(false);
    setPlayMedium(false);
    setPlayLong(true);
    setTimeout(() => {
      // setPlayShortButton(false);
      setPlayMediumButton(false);
      // setPlayLongButton(true);
      setPlay(false);
    }, 5000);
  };

  const checkAnswer = () => {
    if (shot <= 1) {
      setShot(3);
      moveToNextQuestion();
    } else {
      setShot((prev) => prev - 1);
    }

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
      moveToNextQuestion();
      // startGame();
    }
  };
  let count = 0;

  const playTimer = () => {
    let timer = setInterval(() => {
      setCounter((prev) => prev - 1);
      console.log("counter:", counter);
      count--;
      if (count <= 0) {
        clearInterval(timer);
        setGame(false);
      }
    }, 1000);
  };

  return (
    <>
      <div className="GameScreen">
        <div class="demo-wrap">
          <img class="demo-bg" src="images/back1.jpg" alt="" />

          <Container maxWidth="sm">
            <div class="demo-content">
              <div>
                {playGame ? (
                  <>
                    {" "}
                    {game ? (
                      <>
                        {" "}
                        <div>
                          <>
                            {" "}
                            <h1 className="rainbow-text">
                              Which Song Playing{" "}
                            </h1>
                            time: {counter}
                            <br />
                            number: {songNumber}
                            <br />
                            {score && <p>score: {score}</p>}
                            <>
                              {shot === 3 && (
                                <Alert severity="info">
                                  first try (you have 3 guess)
                                </Alert>
                              )}
                              {shot === 2 && (
                                <Alert severity="info">
                                  second try (you have left with 2 guess)
                                </Alert>
                              )}
                              {shot === 1 && (
                                <Alert severity="info">
                                  third try (you have only 1 guess)
                                </Alert>
                              )}
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
                                <Button
                                  onClick={moveToNextQuestion}
                                  variant="contained"
                                  color="primary"
                                >
                                  Skip
                                </Button>
                                {result && <h1>{result}</h1>}{" "}
                              </>
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
                              {playShort && <p> you play for 10 points</p>}
                              {playMedium && <p>you play for 5 points </p>}
                              {playLong && <p>you play for 3 points </p>}
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

                              {playMediumButtonGray && (
                                <>
                                  <p>
                                    {" "}
                                    or click to listen for longer time for 5
                                    point
                                  </p>{" "}
                                  <Button
                                    variant="contained"
                                    color="grey"
                                    onClick={() => {
                                      setPlayMediumButton(true);
                                      setPlayShortButton(false);

                                      setPlayMediumButtonGray(false);
                                    }}
                                  >
                                    play a bit longer (you will earn only 5
                                    points)
                                  </Button>
                                </>
                              )}

                              {playMediumButton && (
                                <>
                                  <p>
                                    {" "}
                                    or click to listen for longer time for 5
                                    point
                                  </p>{" "}
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={playSongSecond}
                                  >
                                    play a bit longer (you will earn only 5
                                    points)
                                  </Button>
                                </>
                              )}

                              {playLongButtonGray && (
                                <>
                                  {" "}
                                  <p>
                                    or click to listen for longer time for 3
                                    point
                                  </p>
                                  <Button
                                    variant="contained"
                                    color="grey"
                                    onClick={() => {
                                      setPlayLongButton(true);
                                      setPlayMediumButton(false);

                                      setPlayLongButtonGray(false);
                                    }}
                                  >
                                    play a longer (you will earn only 3 points){" "}
                                  </Button>
                                </>
                              )}

                              {playLongButton && (
                                <>
                                  {" "}
                                  <p>
                                    or click to listen for longer time for 3
                                    point
                                  </p>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={playSongThird}
                                  >
                                    play a longer (you will earn only 3 points){" "}
                                  </Button>
                                </>
                              )}
                            </>
                          </>
                        </div>
                      </>
                    ) : (
                      <>
                        <h1>Game Over </h1>
                        <p>your score is {score || 0}</p>
                        <button onClick={() => startGame()}>start again</button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <h1>Guess the song</h1>
                      <button
                        onClick={() => {
                          setPlayGame(true);
                          startGame();
                        }}
                      >
                        start Play
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
