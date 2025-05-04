import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonPage,
    IonRouterOutlet,
    IonSplitPane,
    IonTitle,
    IonToolbar,
  } from '@ionic/react';
  import { homeOutline, logOutOutline } from 'ionicons/icons';
  import { Redirect, Route } from 'react-router';
  import Home from './Home';
  
  const Menu: React.FC = () => {
    const path = [
      { name: 'Home', url: '/attendance_tracker/app/Home', icon: homeOutline },
    ];
  
    return (
      <IonPage>
        <IonSplitPane contentId="main">
          <IonMenu contentId="main">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              {path.map((item, index) => (
                <IonMenuToggle key={index}>
                  <IonItem routerLink={item.url} routerDirection="forward">
                    <IonIcon icon={item.icon} slot="start"></IonIcon>
                    {item.name}
                  </IonItem>
                </IonMenuToggle>
              ))}
  
              {/* Quiet game button */}
              <IonButton
                routerLink="/attendance_tracker"
                routerDirection="back"
                expand="full"
                className="quiet-game-btn"
                style={{
                  backgroundColor: 'red',  // Set the background color to red
                  color: 'white',          // Set the text color to white
                  fontWeight: 'bold',      // Additional inline styling for font weight
                }}
              >
                <IonIcon icon={logOutOutline} slot="start"></IonIcon>
                Quiet game
              </IonButton>
            </IonContent>
          </IonMenu>
  
          <IonRouterOutlet id="main">
            <Route exact path="/attendance_tracker/app/Home" component={Home} />
            <Route exact path="/attendance_tracker/app">
              <Redirect to="/attendance_tracker/app/Home" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonPage>
    );
  };
  
  export default Menu;
  