import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Drawer from '../UI/Drawer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import CheckIcon from '@material-ui/icons/Check';

class Levels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLevelDialog: false,
      currentLevel: '',
      questionNumber: '',
      questionText: '',
      answerType: '',
      options: [
        {
          value: '',
          isSelected: false,
        },
      ],
      levels: [],
      formError: null,
    };
  }

  handleChangeOptions = (e, index) => {
    let items = [...this.state.options];
    let item = { ...items[index] };
    item.isSelected = e.target.checked;
    items[index] = item;
    this.setState({ options: items });
  };
  handleChangeOptionsValue = (e, index) => {
    let items = [...this.state.options];
    let item = { ...items[index] };
    item.value = e.target.value;
    items[index] = item;
    this.setState({ options: items });
  };

  handleReset = () =>
    this.setState({
      currentLevel: '',
      questionNumber: '',
      questionText: '',
      answerType: '',
      options: [
        {
          value: '',
          isSelected: false,
        },
      ],
    });

  render() {
    const { classes, history } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3} style={{ height: '100%' }}>
              <div style={{ width: '100%' }}>
                {history.location.state.map((level) => (
                  <>
                    <Accordion key={level.sequence}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.levelName} variant="h6">
                          Level: {level.level}
                        </Typography>
                      </AccordionSummary>
                      {this.state.levels.length > 0 &&
                        this.state.levels.map((item, index) => {
                          return (
                            item.levelName === level.level &&
                            item.quiz.map((quizItem, quizIndex) => (
                              <AccordionDetails key={quizIndex}>
                                <Accordion style={{ width: '100%' }}>
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                  >
                                    <Typography
                                      className={classes.heading}
                                      variant="subtitle1"
                                    >
                                      {quizItem.questionNumber} :{' '}
                                      {quizItem.questionText}
                                    </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <Typography>Options</Typography>

                                    <br />
                                  </AccordionDetails>

                                  {quizItem.options.map((option, index) => (
                                    <AccordionDetails
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Typography variant="subtitle2">
                                        {index + 1}: {option.value} {'  '}{' '}
                                      </Typography>
                                      <Typography>
                                        {option.isSelected ? (
                                          <CheckIcon />
                                        ) : null}
                                      </Typography>
                                    </AccordionDetails>
                                  ))}
                                </Accordion>
                              </AccordionDetails>
                            ))
                          );
                        })}

                      <AccordionDetails>
                        <Fab
                          variant="extended"
                          color="primary"
                          onClick={() =>
                            this.setState({
                              showLevelDialog: true,
                              currentLevel: level.level,
                            })
                          }
                        >
                          <AddIcon />
                          Add Quiz
                        </Fab>
                      </AccordionDetails>
                    </Accordion>
                    <Dialog
                      open={this.state.showLevelDialog}
                      onClose={() => this.setState({ showLevelDialog: false })}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">
                        Add Question
                      </DialogTitle>
                      <DialogContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="questionNumber"
                              label="Question No."
                              type="number"
                              fullWidth
                              value={this.state.questionNumber}
                              onChange={(e) =>
                                this.setState({
                                  questionNumber: e.target.value,
                                })
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={8}>
                            <TextField
                              margin="dense"
                              label="Question"
                              type="text"
                              fullWidth
                              name="questionText"
                              value={this.state.questionText}
                              onChange={(e) =>
                                this.setState({ questionText: e.target.value })
                              }
                            />
                          </Grid>
                        </Grid>
                        <FormControl
                          component="fieldset"
                          style={{ margin: '15px 0  15px 0' }}
                        >
                          <FormLabel component="legend">Answer Type</FormLabel>
                          <RadioGroup
                            aria-label="Answer Type"
                            name="answerType"
                            value={this.state.answerType}
                            onChange={(e) =>
                              this.setState({ answerType: e.target.value })
                            }
                          >
                            <FormControlLabel
                              value="single"
                              control={<Radio color="primary" />}
                              label="Single"
                            />
                            <FormControlLabel
                              value="multiple"
                              control={<Radio color="primary" />}
                              label="Multiple"
                            />
                          </RadioGroup>
                        </FormControl>
                        {this.state.options.map((item, index) => {
                          return (
                            <Grid
                              container
                              direction="row"
                              key={index}
                              spacing={2}
                              alignItems="center"
                            >
                              <Grid
                                item
                                xs={10}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}
                              >
                                <TextField
                                  placeholder="Option"
                                  value={item.value}
                                  onChange={(event) =>
                                    this.handleChangeOptionsValue(event, index)
                                  }
                                />
                                <Checkbox
                                  checked={item.selected}
                                  onChange={(event) =>
                                    this.handleChangeOptions(event, index)
                                  }
                                  inputProps={{
                                    'aria-label': 'primary checkbox',
                                  }}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <AddIcon
                                  onClick={() =>
                                    this.setState((prevState) => ({
                                      options: [
                                        ...prevState.options,
                                        {
                                          value: '',
                                          isSelected: false,
                                        },
                                      ],
                                    }))
                                  }
                                />
                              </Grid>
                            </Grid>
                          );
                        })}
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => {
                            this.setState({ showLevelDialog: false });
                            this.handleReset();
                          }}
                          color="secondary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            if (this.state.levels.length > 0) {
                              this.setState((prevState) => {
                                const didFound = prevState.levels.find(
                                  (item) =>
                                    item.levelName === this.state.currentLevel
                                );
                                if (didFound) {
                                  didFound.quiz.push({
                                    questionNumber: this.state.questionNumber,
                                    questionText: this.state.questionText,
                                    answerType: this.state.answerType,
                                    options: this.state.options,
                                  });
                                } else {
                                  prevState.levels.push({
                                    levelName: this.state.currentLevel,
                                    quiz: [
                                      {
                                        questionNumber: this.state
                                          .questionNumber,
                                        questionText: this.state.questionText,
                                        answerType: this.state.answerType,
                                        options: this.state.options,
                                      },
                                    ],
                                  });
                                }
                              });
                            } else {
                              this.setState({
                                levels: [
                                  {
                                    levelName: this.state.currentLevel,
                                    quiz: [
                                      {
                                        questionNumber: this.state
                                          .questionNumber,
                                        questionText: this.state.questionText,
                                        answerType: this.state.answerType,
                                        options: this.state.options,
                                      },
                                    ],
                                  },
                                ],
                              });
                            }

                            this.setState({ showLevelDialog: false });
                            this.handleReset();
                          }}
                          color="primary"
                        >
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                ))}
              </div>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),

    paddingBottom: theme.spacing(4),
    height: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

  fixedHeight: {
    height: 240,
  },

  image: {
    borderRadius: '50%',
    width: '50%',
    height: '50%',
    border: `2px solid ${theme.palette.primary.light}`,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    margin: 10,
    textOverflow: 'ellipsis',
  },
  actions: {
    justifyContent: 'center',
  },
});

export default withStyles(styles)(Levels);
