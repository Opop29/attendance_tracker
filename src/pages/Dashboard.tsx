import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, useIonRouter, IonLoading } from '@ionic/react';

import soundEffect from './sound/start.wav';
import backgroundMusicFile from './sound/Comedy Funny Circus Background Music For Videos.mp3';

const Dashboard: React.FC = () => {
  const navigation = useIonRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const playSound = async () => {
    const audio = new Audio(soundEffect);
    try {
      await audio.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const startGame = async () => {
    setIsLoading(true);
    await playSound();
    setTimeout(() => {
      setIsLoading(false);
      navigation.push('/attendance_tracker/app', 'forward', 'replace');
    }, 2000);
  };

  const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '80%',
    height: '60px',
    background: isHovered
      ? 'linear-gradient(135deg, #ff7675, #d63031)' // Hell red on hover
      : 'linear-gradient(135deg, #74b9ff, #a29bfe)', // Heaven blue default
    color: '#fff',
    borderRadius: '12px',
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    border: isHovered ? '2px solid #fff' : '2px solid transparent',
    boxShadow: isHovered
      ? '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 0, 0, 0.6)'
      : '0 4px 20px rgba(0,0,0,0.2)',
    textAlign: 'center',
    lineHeight: '60px',
    cursor: 'pointer',
    transition: 'all 0.4s ease, transform 0.3s ease, background 0.5s ease-in-out',
    userSelect: 'none',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    animation: isHovered ? 'pulseEffect 1.5s infinite ease-in-out' : 'none',
    position: 'relative', // TypeScript type error resolved here
    top: '70px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '60px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    marginBottom: '10px',
    animation: 'bounce 1s ease-in-out infinite',
  };

  // Automatically play background music when the component mounts
  useEffect(() => {
    const backgroundMusic = new Audio(backgroundMusicFile);
    backgroundMusic.loop = true; // Loop the music
    backgroundMusic.play().catch((error) => {
      console.error('Error playing background music:', error);
    });

    // Clean up the music when the component unmounts
    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Loading Indicator */}
        <IonLoading
          isOpen={isLoading}
          message="Loading... Please wait"
          duration={2000}
        />
        <div
          style={{
            backgroundImage:
              'url("https://art.ngfiles.com/images/0/177_lilg_heaven-and-hell.jpg?f1245258315")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '20px',
            boxSizing: 'border-box',
          }}
        >
          {/* Separate Heaven, Or, and Hell */}
          <h1
            style={{
              WebkitTextStroke: '3px black',
              ...titleStyle,
              marginBottom: '-50px',
              marginLeft: '-100px',
              color: 'white',
              textShadow:
                '0 0 20px rgba(255, 223, 0, 1), 0 0 30px rgba(255, 223, 0, 0.9), 0 0 40px rgba(255, 223, 0, 0.8), 0 0 50px rgba(255, 223, 0, 0.7), 0 0 60px rgba(255, 223, 0, 0.6)',
              transform: 'rotate(-10deg)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Heaven 😇
          </h1>

          <h1
            style={{
              ...titleStyle,
              marginBottom: '0px',
              color: 'white',
              textShadow: 'none',
              WebkitTextStroke: '3px black',
              WebkitTextFillColor: 'white',
            }}
          >
            or
          </h1>

          <h1
            style={{
              ...titleStyle,
              marginBottom: '10px',
              marginLeft: '150px',
              marginTop: '-10px',
              color: '#ff1a1a',
              WebkitTextStroke: '2px black',
              textShadow: `0 0 10px #ff0000, 0 0 20px #cc0000, 0 0 30px #990000, 0 0 40px #660000`,
              transform: 'rotate(5deg)',
              transition: 'all 0.3s ease-in-out',
              animation: 'flameFlicker 2s infinite ease-in-out',
            }}
          >
            Hell 😈
          </h1>

          <p
            onClick={startGame}
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Click to Start
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
