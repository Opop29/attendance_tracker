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
    background: 'linear-gradient(45deg, #3498db, #9b59b6)',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    border: '2px solid transparent', 
    boxShadow: isHovered ? '0 12px 50px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.2)', 
    textAlign: 'center' as const, 
    lineHeight: '60px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out, transform 0.2s ease, box-shadow 0.3s ease',
    userSelect: 'none' as const, 
    transform: isHovered ? 'scale(1.1)' : 'scale(1)', 
  };

  const titleStyle = {
    fontSize: '60px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    marginBottom: '20px',
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
          <h1 style={titleStyle}>Heaven or Hell</h1> {/* Display the title */}
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
