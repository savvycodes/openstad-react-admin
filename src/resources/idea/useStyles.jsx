// TODO: @DEV unused - Can be removed?

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 40,
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1em",
  },
  form: {
    [theme.breakpoints.up("xs")]: {
      width: 400,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      marginTop: -30,
    },
  },
  inlineField: {
    display: "inline-block",
    width: "50%",
  },
}));
