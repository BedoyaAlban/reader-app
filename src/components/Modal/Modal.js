import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    textAlign: "center",
    boxShadow: theme.shadows[5],
    [theme.breakpoints.up("xs")]: {
      width: "270px",
      padding: theme.spacing(0, 0, 0)
    },
    [theme.breakpoints.up("sm")]: {
      width: "400px",
      padding: theme.spacing(0, 0, 0)
    },
    [theme.breakpoints.up("md")]: {
      width: 600,
      padding: theme.spacing(2, 4, 3)
    }
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "10px",
    borderRadius: 10,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    "& > *": {
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(1),
        width: theme.spacing(24),
        height: theme.spacing(30)
      },
      [theme.breakpoints.up("xs")]: {
        margin: theme.spacing(1),
        width: theme.spacing(29),
        height: theme.spacing(15)
      },
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(1),
        width: theme.spacing(44),
        height: theme.spacing(17)
      }
    }
  },
  bck: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    fontWeight: "bold",
    margin: "10px",
    color: "white",
    [theme.breakpoints.up("xs")]: {
      margin: "2px"
    }
  },
  title: {
    textTransform: "uppercase",
    [theme.breakpoints.up("xs")]: {
      textTransform: "none",
      fontSize: "20px"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
      textTransform: "uppercase"
    }
  },
  body: {
    fontWeight: "35O"
  }
}));

const SimplePaper = ({ instr }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {instr.map(inst => (
        <Paper className={classes.bck} key={inst.id} elevation={inst.id}>
          <Typography className={classes.title} variant="h5">
            {inst.title}
          </Typography>
          <br />
          <Typography variant="h6">{inst.content}</Typography>
        </Paper>
      ))}
    </div>
  );
};

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const SimpleModal = ({ open, setOpen, instr }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography
        className={classes.title}
        id="simple-modal-title"
        variant="h2"
      >
        Instructions
      </Typography>
      <Typography
        className={classes.body}
        id="simple-modal-description"
        variant="body2"
      >
        If you Answer <strong>PLEASE</strong> the instructions will display
      </Typography>
      <SimplePaper instr={instr} />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default SimpleModal;
