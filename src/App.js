import Box from '@material-ui/core/Box';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      position="relative">
      <Header />
      <Main />
      <Footer />
    </Box>
  );
};

export default App;
