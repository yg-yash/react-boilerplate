import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import TextField from '@material-ui/core/TextField';
import Drawer from '../UI/Drawer';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const type = 'docx';

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
  container: {},
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    // margin: theme.spacing(1),
  },
  formContainer: {
    marginTop: '20px',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  formCard: {
    padding: '10px',
    width: '60%',
  },
  addLevelButton: {
    right: 20,
    bottom: 20,
    position: 'fixed',
    zIndex: 1,
  },
  submitButton: {
    left: '15%',
    bottom: 20,
    position: 'fixed',
    zIndex: 1,
  },
  docViewer: {
    height: '200px',
    margin: '20px 0 20px 0',
    overflow: 'auto',
  },
  timeSpend: {
    fontSize: '12px',
    lineHeight: '14px',
    fontFamily: theme.typography.fontFamily,
  },
  levelName: {
    fontSize: '18px',
    lineHeight: '21px',
    fontFamily: theme.typography.fontFamily,
  },
  docName: {
    textAlign: 'center',
    fontSize: '12px',
    lineHeight: '14px',
    fontFamily: theme.typography.fontFamily,
  },
  topRow: {
    width: '50%',
    marginLeft: '25%',
    marginBottom: '10px',
  },
});

class AddCourse extends Component {
  imageUrl: '';

  constructor(props) {
    super(props);
    this.state = {
      levelName: '',
      chapterNumber: '',
      courseDetails: '',
      timeToBeSpend: '',
      chapterDescription: '',
      image: null,
      doc: null,
      showLevelDialog: false,
      showForm: false,
      documentArray: [],
      levels: [],
      data: [],
      currentLevelName: null,
      currentLevelId: null,
      startingChapter: '',
      endChapter: '',
      mainCourseDescription: '',
      mainTotalChapters: '',
      sequence: 0,
    };
  }

  handleImageChange = (event) => {
    this.imageUrl = URL.createObjectURL(event.target.files[0]);
    this.setState({ image: event.target.files[0] });
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  handleDocumentChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      this.setState({ doc: text });
    };
    reader.readAsText(e.target.files[0]);
  };

  handleDocumentUpload = () => {
    const fileInput = document.getElementById('document');
    fileInput.click();
  };
  clearForm = () => {
    this.setState({
      chapterNumber: '',
      chapterDescription: '',
      timeToBeSpend: '',
      courseDetails: '',
      image: null,
      doc: null,
    });
  };
  onFormSubmit = () => {
    const newChapter = {
      chapterNumber: this.state.chapterNumber,
      courseDetails: this.state.courseDetails,
      timeToBeSpend: this.state.timeToBeSpend,
      chapterDescription: this.state.chapterDescription,
      coverImage: this.state.image,
      doc: this.state.doc,
    };

    this.setState((prevState) => {
      const levels = [...prevState.levels];
      levels.find((level) => {
        if (
          level.levelName === this.state.currentLevelName &&
          level.id === this.state.currentLevelId
        ) {
          if (level.chapters === undefined) {
            level.chapters = [];
          }
          level.chapters.push(newChapter);
        }
      });
    });
  };

  onInputChangeHandler = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  onDataSubmit = () => {
    this.setState({
      data: [
        {
          sequence: this.state.sequence,
          level: this.state.levels,
        },
      ],
    });
    console.log(this.state.data);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid
                spacing={4}
                container
                justify="space-between"
                direction="row"
                alignItems="center"
                className={classes.topRow}
              >
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="dense"
                    id="mainCourseDescription"
                    label="Course Description"
                    type="text"
                    name="mainCourseDescription"
                    fullWidth
                    autoFocus
                    value={this.state.mainCourseDescription}
                    onChange={(e) =>
                      this.setState({ mainCourseDescription: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="dense"
                    id="totalChapters"
                    label="Total Chapters"
                    type="text"
                    name="totalChapters"
                    fullWidth
                    value={this.state.mainTotalChapters}
                    onChange={(e) =>
                      this.setState({ mainTotalChapters: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <Fab
                variant="extended"
                color="secondary"
                className={classes.addLevelButton}
                onClick={() =>
                  this.setState({ showLevelDialog: true, levelName: '' })
                }
              >
                <AddIcon />
                Add Level
              </Fab>
              <Fab
                variant="extended"
                color="secondary"
                className={classes.submitButton}
                onClick={this.onDataSubmit}
              >
                <SaveIcon />
                {'  '}
                Submit
              </Fab>
              <Dialog
                open={this.state.showLevelDialog}
                onClose={() => this.setState({ showLevelDialog: false })}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Add Level</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Level Name"
                    type="type"
                    fullWidth
                    value={this.state.levelName}
                    onChange={(e) =>
                      this.setState({ levelName: e.target.value })
                    }
                  />
                  <TextField
                    margin="dense"
                    id="startingChapter"
                    label="Starting Chapter"
                    type="text"
                    name="startingChapter"
                    fullWidth
                    value={this.state.startingChapter}
                    onChange={(e) =>
                      this.setState({ startingChapter: e.target.value })
                    }
                  />
                  <TextField
                    margin="dense"
                    id="endChapter"
                    label="End Chapter"
                    type="text"
                    name="endChapter"
                    fullWidth
                    value={this.state.endChapter}
                    onChange={(e) =>
                      this.setState({ endChapter: e.target.value })
                    }
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => this.setState({ showLevelDialog: false })}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      this.setState((prevState) => ({
                        levels: [
                          ...prevState.levels,
                          {
                            levelName: this.state.levelName,
                            id: 0,
                            endChapter: this.state.endChapter,
                            startingChapter: this.state.startingChapter,
                          },
                        ],
                      }));
                      this.setState({ showLevelDialog: false });
                    }}
                    color="primary"
                  >
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
              <div style={{ width: '100%' }}>
                {this.state.levels.map((level) => {
                  return (
                    <Accordion key={level}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.levelName} variant="h6">
                          Level: {level.levelName}
                        </Typography>
                      </AccordionSummary>

                      {level.chapters &&
                        level.chapters.map((chapter) => (
                          <AccordionDetails key={chapter.chapterNumber}>
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
                                  {chapter.chapterNumber}{' '}
                                  {chapter.chapterDescription}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  Course Details:
                                  <br />
                                  {chapter.courseDetails}
                                </Typography>
                                <br />
                              </AccordionDetails>
                              <AccordionDetails>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.timeSpend}
                                >
                                  Time Required: <br />
                                  {chapter.timeToBeSpend} min
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </AccordionDetails>
                        ))}

                      <AccordionDetails>
                        <Fab
                          variant="extended"
                          color="primary"
                          onClick={() =>
                            this.setState({
                              showForm: true,
                              currentLevelName: level.levelName,
                              currentLevelId: level.id,
                            })
                          }
                        >
                          <AddIcon />
                          Add Chapter
                        </Fab>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </div>
              <Dialog
                open={this.state.showForm}
                onClose={() => this.setState({ showLevelDialog: false })}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Add Chapter</DialogTitle>
                <DialogContent>
                  <input
                    type="file"
                    id="imageInput"
                    onChange={this.handleImageChange}
                    hidden="hidden"
                    multiple
                    accept="image/*"
                  />
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    label="Chapter Number"
                    id="chapterNumber"
                    type="text"
                    name="chapterNumber"
                    autoFocus
                    fullWidth
                    className={classes.textField}
                    value={this.state.chapterName}
                    onChange={this.onInputChangeHandler}
                  />
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    label="Chapter Description"
                    id="chapterDescription"
                    type="text"
                    name="chapterDescription"
                    autoFocus
                    fullWidth
                    className={classes.textField}
                    value={this.state.chapterDescription}
                    onChange={this.onInputChangeHandler}
                  />
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    label="Add Course Details"
                    id="courseDetails"
                    type="textfield"
                    multiline
                    rows={4}
                    name="courseDetails"
                    fullWidth
                    className={classes.textField}
                    value={this.state.courseDetails}
                    onChange={this.onInputChangeHandler}
                  />

                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    label="Time To Be Spend"
                    id="timeToBeSpend"
                    type="text"
                    name="timeToBeSpend"
                    fullWidth
                    className={classes.textField}
                    value={this.state.timeToBeSpend}
                    onChange={this.onInputChangeHandler}
                  />
                  <Grid
                    container
                    justify="space-between"
                    direction="row"
                    spacing={1}
                  >
                    <Grid item xs={12} md={5}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.button}
                        startIcon={<AddAPhotoIcon />}
                        onClick={this.handleEditPicture}
                      >
                        Add Chapter Image
                      </Button>
                      {this.state.image && (
                        <p className={classes.docName}>
                          {this.state.image.name}
                        </p>
                      )}
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.button}
                        startIcon={<NoteAddIcon />}
                        onClick={this.handleDocumentUpload}
                      >
                        Add Document
                      </Button>
                      {this.state.doc && (
                        <p className={classes.docName}>{this.state.doc.name}</p>
                      )}
                    </Grid>
                  </Grid>
                  <input
                    type="file"
                    id="document"
                    onChange={this.handleDocumentChange}
                    hidden="hidden"
                    accept="text/plain"
                  />

                  {this.state.doc && (
                    <div className={classes.docViewer}>
                      <p>{this.state.doc}</p>
                    </div>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => this.setState({ showForm: false })}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      this.onFormSubmit();
                      this.clearForm();
                      this.setState({ showForm: false });
                    }}
                    color="primary"
                  >
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(AddCourse);
