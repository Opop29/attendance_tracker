import { useEffect } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Dashboard';
import Menu from './pages/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark Mode CSS */
import '@ionic/react/css/palettes/dark.system.css'; // Dark mode support

/* Custom Styles */
import './theme/styles.css';

setupIonicReact();

const App: React.FC = () => {
  // Force Dark Mode for testing
  useEffect(() => {
    document.body.classList.add('dark'); // Force dark mode
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/attendance_tracker" component={Login} />
          <Route exact path="/attendance_tracker/app" component={Menu} />
          <Redirect exact from="/" to="/attendance_tracker" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
