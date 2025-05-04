import React, { useState } from 'react';
import { IonContent, IonPage, useIonRouter, IonLoading } from '@ionic/react';

import soundEffect from './sound/start.wav';

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

  const buttonStyle = {
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
    textAlign: 'center' as const,
    lineHeight: '60px',
    cursor: 'pointer',
    transition: 'all 0.4s ease, transform 0.3s ease, background 0.5s ease-in-out',
    userSelect: 'none' as const,
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    animation: isHovered ? 'pulseEffect 1.5s infinite ease-in-out' : 'none',
    position: 'relative',    // 👈 Ensures only this element is affected
    top: '70px',             // 👈 Moves the button downward
  };
  

  const titleStyle = {
    fontSize: '60px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.6)',
    textAlign: 'center' as const,
    marginBottom: '10px',  
    animation: 'bounce 1s ease-in-out infinite',
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Loading Indicator */}
        <IonLoading
          isOpen={isLoading}
          message="Loading... Please wait"
          duration={2000}
        />
        <div style={{
          backgroundImage: 'url("https://art.ngfiles.com/images/0/177_lilg_heaven-and-hell.jpg?f1245258315")',
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
        }}>
          {/* Separate Heaven, Or, and Hell */}
          
          <>
  <style>
    {`
      @keyframes flameFlicker {
        0% {
          text-shadow: 0 0 15px #ff0000, 0 0 30px #cc0000, 0 0 45px #990000;
        }
        50% {
          text-shadow: 0 0 25px #ff3300, 0 0 50px #cc3300, 0 0 65px #992600;
          transform: rotate(6deg);
        }
        100% {
          text-shadow: 0 0 15px #ff0000, 0 0 30px #cc0000, 0 0 45px #990000;
        }
      }
    `}
  </style>

  {/* Heaven 😇 */}
  <h1 
    style={{
      WebkitTextStroke: '3px black',
      ...titleStyle, 
      marginBottom: '-50px', 
      marginLeft: '-100px', 
      color: 'white',
      textShadow: '0 0 20px rgba(255, 223, 0, 1), 0 0 30px rgba(255, 223, 0, 0.9), 0 0 40px rgba(255, 223, 0, 0.8), 0 0 50px rgba(255, 223, 0, 0.7), 0 0 60px rgba(255, 223, 0, 0.6)',
      transform: 'rotate(-10deg)', 
      transition: 'all 0.3s ease-in-out',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)';
      e.currentTarget.style.textShadow = '0 0 25px rgba(255, 223, 0, 1), 0 0 50px rgba(255, 223, 0, 0.8), 0 0 75px rgba(255, 223, 0, 0.5)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'rotate(-10deg)';
      e.currentTarget.style.textShadow = '0 0 15px rgba(255, 223, 0, 0.8), 0 0 30px rgba(255, 223, 0, 0.6), 0 0 45px rgba(255, 223, 0, 0.4)';
    }}
  >
    Heaven 😇
  </h1>
  </>
<h1 
  style={{
    ...titleStyle, 
    marginBottom: '0px', // Adjusted bottom margin
    color: 'white', // Text color
    textShadow: 'none', // Removed text shadow for clarity
    WebkitTextStroke: '3px black', // Adds a black stroke around the text
    WebkitTextFillColor: 'white', // Fills the text with white color
  }}
>
  or
</h1>

<>
  <style>
    {`
      @keyframes flameFlicker {
        0% {
          text-shadow: 0 0 15px #ff0000, 0 0 30px #cc0000, 0 0 45px #990000;
        }
        50% {
          text-shadow: 0 0 25px #ff3300, 0 0 50px #cc3300, 0 0 65px #992600;
          transform: rotate(6deg);
        }
        100% {
          text-shadow: 0 0 15px #ff0000, 0 0 30px #cc0000, 0 0 45px #990000;
        }
      }
    `}
  </style>

  <h1
    style={{
      ...titleStyle,
      marginBottom: '10px',
      marginLeft: '150px',
      marginTop: '-10px',
      color: '#ff1a1a', // fiery red
      WebkitTextStroke: '2px black',
      textShadow: `
        0 0 10px #ff0000,
        0 0 20px #cc0000,
        0 0 30px #990000,
        0 0 40px #660000
      `,
      transform: 'rotate(5deg)',
      transition: 'all 0.3s ease-in-out',
      animation: 'flameFlicker 2s infinite ease-in-out',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05) rotate(3deg)';
      e.currentTarget.style.textShadow = `
        0 0 15px #ff1a1a,
        0 0 30px #cc0000,
        0 0 45px #990000,
        0 0 60px #660000
      `;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'rotate(5deg)';
      e.currentTarget.style.textShadow = `
        0 0 10px #ff0000,
        0 0 20px #cc0000,
        0 0 30px #990000,
        0 0 40px #660000
      `;
    }}
  >
    Hell 😈
  </h1>
</>

          <p 
            onClick={startGame} 
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            className="start-game-btn"
          >
            Start Game
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
