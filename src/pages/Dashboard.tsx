import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  useIonRouter 
} from '@ionic/react';

const Dashboard: React.FC = () => {
  const navigation = useIonRouter();
  const [isHovered, setIsHovered] = useState(false);

  const startGame = () => {
    navigation.push('/attendance_tracker/app', 'forward', 'replace');
  }

  const buttonStyle = {
    display: 'inline-block',
    width: '80%',
    marginTop: '400px',
    height: '60px',
    background: 'linear-gradient(45deg, #3498db, #9b59b6)', // Gradient background
    color: '#fff',
    borderRadius: '12px',
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    border: '2px solid transparent', 
    boxShadow: isHovered ? '0 12px 50px rgba(0,0,0,0.3)' : '0 8px 30px rgba(0,0,0,0.2)', 
    textAlign: 'center' as const, 
    lineHeight: '60px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out, transform 0.2s ease, box-shadow 0.3s ease',
    userSelect: 'none' as const,
    transform: isHovered ? 'scale(1.1)' : 'scale(1)', 
  };

  return (
    <IonPage>
      <IonContent fullscreen>
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
          justifyContent: 'flex-start',
          paddingTop: '20%',
          boxSizing: 'border-box',
        }}>
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
