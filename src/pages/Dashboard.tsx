import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  useIonRouter 
} from '@ionic/react';

import './Dashboard.css'; // Import the CSS file for styling

const Dashboard: React.FC = () => {
  const navigation = useIonRouter();

  const startGame = () => {
      navigation.push('attendance_tracker/app', 'forward', 'replace');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonButton onClick={() => startGame()} expand="full">
          Start Game
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
