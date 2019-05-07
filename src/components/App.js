import React, { useState } from "react";
import "../styles/App.css";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { KeyboardArrowDown } from "@material-ui/icons";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});
function App(props) {
  const { classes } = props;
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState(["Wake Up"]);
  const [completedList, setCompletedList] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleNewTodoChange = e => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (newTodo === "") return;
    else {
      setTodoList([...todoList, newTodo]);
    }
  };

  const handleChange = panel => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  const removeTodo = index => {
    let removed = todoList.splice(index, 1);
    setTodoList([...todoList]);
    setCompletedList([...completedList, removed]);
  };

  const items = todoList.length;

  return (
    <div className="App">
      <Paper className={classes.root} elevation={1}>
        <h1>Todo App</h1>
        <Typography variant="h5" component="h5">
          Total Items: {items}
        </Typography>
        <Typography variant="h5" component="h5">
          {/* Percentage of List Completed :
          {completedList.length > 0
            ? ((completedList.length - todoList.length) / 100) * 100
            : 0} */}
          Total Items Completed: {completedList.length}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            id="todo"
            label="todo"
            className={classes.textField}
            value={newTodo}
            onChange={handleNewTodoChange}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
            id="button"
          >
            Submit Task
          </Button>
        </form>
      </Paper>
      <hr />
      <div className="list">
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            List:
          </Typography>
          <Typography component="p">Items to be completed:</Typography>

          <List>
            {todoList.map((value, index) => (
              <ListItem
                key={index}
                role={undefined}
                dense
                button
                onClick={() => removeTodo(index)}
              >
                <Checkbox tabIndex={-1} disableRipple />
                <ListItemText primary={`${value}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
      <br />
      <div className="list">
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary expandIcon={<KeyboardArrowDown />}>
            <Typography className={classes.heading}>Completed List:</Typography>
            <Typography className={classes.secondaryHeading}>
              Items that have been completed:
            </Typography>
          </ExpansionPanelSummary>
          <hr />
          {completedList.map((value, index) => (
            <ExpansionPanelDetails>
              <Typography>{value}</Typography>
            </ExpansionPanelDetails>
          ))}
        </ExpansionPanel>
      </div>
    </div>
  );
}

export default withStyles(styles)(App);
