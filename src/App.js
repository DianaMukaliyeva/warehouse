import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import { Navigation, Home, ProductTable, Footer } from './components';

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
        <Box flexGrow={1}>
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/category/:product" component={ProductTable} />
              <Route render={() => <Box p={3}>Page not found</Box>} />
            </Switch>
          </Container>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
