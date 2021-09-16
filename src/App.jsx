import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import TicketPage from './pages/TicketPage';
import BookingPage from './pages/BookingPage';
import CancelPage from './pages/CancelPage';
import HistoricPage from './pages/HistoricPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/booking' component={BookingPage} />
        <Route exact path='/bookings/confirmation' component={TicketPage} />
        <Route exact path='/historic' component={HistoricPage} />
        <Route exact path='/cancel' component={CancelPage} />
        <Route exact path='/bookings/error' component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
