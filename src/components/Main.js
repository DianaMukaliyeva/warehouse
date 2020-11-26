import { Switch, Route } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import Products from './Products';
import Home from './Home';

const Main = () => {
  return (
    <Box flexGrow={1}>
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/category/:product" component={Products} />
          <Route render={() => <Box p={3}>Page not found</Box>} />
        </Switch>
      </Container>
    </Box>
  );
};

export default Main;
