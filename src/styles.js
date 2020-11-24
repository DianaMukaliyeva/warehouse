import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  (theme) => ({
    textDecorNone: {
      textDecoration: 'none',
    },
    hidden: {
      display: 'none',
    },
    paper: {
      width: '100%',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    container: {
      maxHeight: '60vh',
    },
    title: {
      flex: '1 1 100%',
    },
    rowHeight: {
      height: 500,
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
  { index: 1 }
);
