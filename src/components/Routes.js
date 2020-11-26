import { Switch, Route } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import ProductTable from './ProductTable';
import Home from './Home';

const Routes = () => {
  return (
    <Box flexGrow={1}>
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/category/:product" component={ProductTable} />
          <Route render={() => <Box p={3}>Page not found</Box>} />
        </Switch>
      </Container>
    </Box>
  );
};

export default Routes;
