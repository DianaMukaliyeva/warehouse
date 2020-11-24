import { BrowserRouter as Router } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Navigation from './Navigation';
import Main from './Main';
import Footer from './Footer';

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
        <Main />
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
