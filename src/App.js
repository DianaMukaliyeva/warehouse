import { BrowserRouter as Router } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Navigation from './components/Navigation';
import Routes from './components/Routes';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Box
        textAlign="center"
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        position="relative">
        <Navigation />
        <Routes />
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
