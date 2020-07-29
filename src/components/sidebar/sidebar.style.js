import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
    }
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  logo: {
    display: "flex",
    padding: theme.spacing(1, 1),
    ...theme.mixins.toolbar,
    justifyContent: "center",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  hideSidebar: {
    marginTop: "100%",
  },
}));

export default useStyles;