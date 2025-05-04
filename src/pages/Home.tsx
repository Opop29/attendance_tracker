import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import './Home.css';

// Import sound effects
import correctSoundFile from './sound/mixkit-correct-positive-notification-957.wav';
import wrongSoundFile from './sound/mixkit-funny-giggling-2885.wav';

type Question = {
  text: string;
  type: 'good' | 'bad';
  value: number;
};

const allQuestions: Question[] = [
  { text: "Nangupya ka sa exam kay wala ka nagtuon. Maayo ba ni para sa imong kinabuhi?", type: 'bad', value: 1 },
  { text: "Gitabangan nimo ang silingan nga nag-ayo sa ilang kanal. Maayo ba ni nga batasan?", type: 'good', value: 1 },
  { text: "Gikataw-an nimo ang natumba nga bata imbes nga imong tabangan. Angay ba ni?", type: 'bad', value: 1 },
  { text: "Nagpabaga ka'g nawong para mangayo'g sud-an sa silingan bisan busog pa ka. Tinuod ba ni nga maayo?", type: 'bad', value: 1 },
  { text: "Giuli nimo ang P500 nga nasayop ug sukli sa tindera. Maayo ba ni nga buhat?", type: 'good', value: 1 },
  { text: "Nisumbag ka ug tawo nga walay sala tungod lang sa kasuko. Maayo ba ni para nimo?", type: 'bad', value: 1 },
  { text: "Gipakaon nimo ang irong gutom nga walay tag-iya. Maayo ba ni sa imong kinabuhi?", type: 'good', value: 1 },
  { text: "Nisimba ka kada Domingo aron magpasalamat ug mangayo'g giya. Maayo ba ni nga buhat?", type: 'good', value: 1 },
  { text: "Imong gihugawan ang palibot sa inyong barangay. Maayo ba ni para sa komunidad?", type: 'bad', value: 1 },
  { text: "Gisumbong nimo ang kawatan sa pulis bisan kabalo kang kuyaw. Maayo ba ni nga panindugan?", type: 'good', value: 1 },
];

const getEmojiFromScore = (score: number) => {
  if (score <= -3) return '😈';
  if (score <= -1) return '🙁';
  if (score === 0) return '😐';
  if (score <= 2) return '🙂';
  return '😇';
};

const getRankTitle = (correctAnswers: number) => {
  if (correctAnswers >= 5) return '🕊️ Angel in Training';
  if (correctAnswers >= 3) return '😇 Moral Warrior';
  if (correctAnswers >= 1) return '🙂 Trying Hard';
  return '😈 Lost Soul';
};

const getRandomQuestions = () => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6);
};

const Home: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(getRandomQuestions());
  const [score, setScore] = useState(0);
  const [correctPoints, setCorrectPoints] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [finalDestination, setFinalDestination] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [loading, setLoading] = useState(false); // Add loading state
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound effects
  const correctSound = useRef(new Audio(correctSoundFile));
  const wrongSound = useRef(new Audio(wrongSoundFile));

  useEffect(() => {
    if (gameOver) return;
    setTimeLeft(10);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timerRef.current!);
          handleAnswer('timeout');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [currentQuestion]);

  const handleAnswer = (choice: 'yes' | 'no' | 'timeout') => {
    if (timerRef.current) clearInterval(timerRef.current);

    const current = questions[currentQuestion];
    let delta = 0;
    let isCorrect = false;

    const isGoodDecision =
      (current.type === 'good' && choice === 'yes') ||
      (current.type === 'bad' && choice === 'no');

    const isTimeoutBad = choice === 'timeout' && current.type === 'good';
    const isTimeoutNeutral = choice === 'timeout' && current.type === 'bad';

    if (choice === 'timeout') {
      delta = isTimeoutBad ? -Math.abs(current.value) : 0;
    } else {
      delta = isGoodDecision ? current.value : -Math.abs(current.value);
      if (isGoodDecision) {
        correctSound.current.play();
      } else {
        wrongSound.current.play();
      }
    }

    if (isGoodDecision) {
      isCorrect = true;
    }

    setScore(prev => prev + delta);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setCorrectPoints(prev => prev + current.value);
    }

    // Set loading screen before moving to the next question
    setLoading(true);

    // Simulate loading for 1 second before showing the next question
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(q => q + 1);
      } else {
        setTimeout(() => {
          const destination = (correctPoints + (isCorrect ? current.value : 0)) >= 3 ? 'Langit 😇' : 'Impiyerno 🔥';
          setFinalDestination(destination);
          setGameOver(true);
        }, 500);
      }

      setLoading(false); // Hide loading screen after delay
    }, 1000);
  };

  const resetGame = () => {
    setQuestions(getRandomQuestions());
    setScore(0);
    setCorrectAnswers(0);
    setCorrectPoints(0);
    setCurrentQuestion(0);
    setFinalDestination('');
    setGameOver(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="title-glow">Path to Heaven or Hell</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="home-container">
          <h1>Dula: Langit o Impiyerno</h1>

          <div className="path">
            {['😈', '🙁', '😐', '🙂', '😇'].map((emoji, index) => (
              <div
                key={index}
                className={`tile ${emoji === getEmojiFromScore(score) ? 'active' : ''}`}
              >
                {emoji}
              </div>
            ))}
          </div>

          {!gameOver ? (
            <div className="question-container">
              {loading ? (
                <div className="loading-screen">
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <div className="avatar">
                    {questions[currentQuestion].type === 'bad' ? '😈' : '😇'}
                  </div>
                  <p className="question">{questions[currentQuestion].text}</p>

                  <div className="timer">
                    <div className="timer-circle">
                      <svg>
                        <circle cx="30" cy="30" r="28" />
                        <circle
                          cx="30"
                          cy="30"
                          r="28"
                          style={{
                            strokeDashoffset: 176 - (176 * timeLeft) / 10,
                            stroke: timeLeft <= 3 ? 'red' : '#4caf50',
                          }}
                        />
                      </svg>
                      <div className="timer-text">{timeLeft}s</div>
                    </div>
                  </div>

                  <div className="btn-group">
                    <button
                      className={`btn good ${questions[currentQuestion].type === 'good' ? 'correct-btn' : ''}`}
                      onClick={() => handleAnswer('yes')}
                    >
                      Yes
                    </button>

                    <button
                      className={`btn bad ${questions[currentQuestion].type === 'bad' ? 'correct-btn' : ''}`}
                      onClick={() => handleAnswer('no')}
                    >
                      No
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="result">
              <h2>Nakaabot ka sa: <span className="result-text">{finalDestination}</span></h2>
              <p>✅ Correct Answers: <strong>{correctAnswers}</strong></p>
              <p>⭐ Correct Answer Points: <strong>{correctPoints}</strong></p>
              <p>🎯 Total Score (All): <strong>{score}</strong></p>
              <p>🏅 Title: <strong>{getRankTitle(correctAnswers)}</strong></p>
              <button className="btn reset" onClick={resetGame}>
                Play Again 🔁
              </button>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
