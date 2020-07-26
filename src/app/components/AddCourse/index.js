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
import Card from '@material-ui/core/Card';
import SaveIcon from '@material-ui/icons/Save';
import Drawer from '../UI/Drawer';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FileViewer from 'react-file-viewer';
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
  form: {
    // width: '60%',
    // border: '2px solid #000000',
    // padding: '10px',
    // borderRadius: '10px',
  },
  row: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
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
  docViewer: {
    height: '200px',
    margin: '20px 0 20px 0',
  },
});

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelName: '',
      chapterNumber: '',
      courseDetails: '',
      timeToBeSpend: '',
      image: null,
      doc: null,
      showLevelDialog: false,
      showForm: false,
      documentArray: [],
      levels: [],
    };
  }
  //data structure
  // {
  //       id: null,
  //       levelName: '',
  //       startingChapter: '',
  //       endChapter: '',
  //       chapters: [
  //         {
  //           chapterNumber: '',
  //           chapterDescription: '',
  //           timeRequired: '',
  //           coverImage: '',
  //           courseDetails: '',
  //         },
  //       ],
  //     },

  handleImageChange = (event) => {
    const fileUrl = URL.createObjectURL(event.target.files[0]);
    this.setState({ image: fileUrl });
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  handleDocumentChange = (event) => {
    const fileUrl = URL.createObjectURL(event.target.files[0]);

    this.setState({ doc: fileUrl });
  };

  handleDocumentUpload = () => {
    const fileInput = document.getElementById('document');
    fileInput.click();
  };
  onFormSubmit = (e, levelName, levelId) => {
    e.preventDefault();

    const newChapter = {
      chapterNumber: this.state.chapterNumber,
      courseDetails: this.state.courseDetails,
      timeToBeSpend: this.state.timeToBeSpend,
    };
    //problem here
    // this.setState((prevState) => ({
    //   levels: prevState.levels.find((level) => {
    //     if (level.levelName === levelName && level.id === levelId) {
    //       // level.chapters.push(newChapter);
    //       console.log(level);
    //     }
    //     return level;
    //   }),
    // }));
  };

  onInputChangeHandler = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  renderForm = (levelName, levelId) => {
    const { classes } = this.props;
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.formContainer}
      >
        <Card className={classes.formCard} elevation={5}>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => this.onFormSubmit(event, levelName, levelId)}
          >
            <Grid
              container
              justify="space-between"
              spacing={2}
              alignItems="center"
            >
              <Grid item md={6} sm={12}>
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
              </Grid>
              <Grid item md={6} sm={12}>
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
                <input
                  type="file"
                  id="imageInput"
                  onChange={this.handleImageChange}
                  hidden="hidden"
                  multiple
                  accept="image/*"
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
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
            </Grid>
            <Grid
              container
              justify="space-between"
              spacing={2}
              alignItems="center"
            >
              <Grid item sm={12} md={6}>
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
              </Grid>
              <Grid item sm={12} md={6}>
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
                <input
                  type="file"
                  id="document"
                  onChange={this.handleDocumentChange}
                  hidden="hidden"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              className={classes.submit}
            >
              Save
            </Button>
          </form>

          {this.state.doc && (
            <div className={classes.docViewer}>
              <FileViewer
                fileType={type}
                filePath={this.state.doc}
                onError={this.onError}
              />
            </div>
          )}
        </Card>
      </Grid>
    );
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
              <Fab
                variant="extended"
                color="secondary"
                className={classes.addLevelButton}
                onClick={() => this.setState({ showLevelDialog: true })}
              >
                <AddIcon />
                Add Level
              </Fab>
              <Dialog
                open={this.state.showLevelDialog}
                onClose={() => this.setState({ showLevelDialog: false })}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Add Level Name</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Level Name"
                    type="email"
                    fullWidth
                    value={this.state.levelName}
                    onChange={(e) =>
                      this.setState({ levelName: e.target.value })
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
                          { levelName: this.state.levelName, id: 0 },
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
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        {level.chapters &&
                          level.chapters.map((chapter) => (
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className={classes.heading}>
                                  {level.levelName}
                                </Typography>
                              </AccordionSummary>
                            </Accordion>
                          ))}
                        <Typography className={classes.heading}>
                          {level.levelName}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {this.renderForm(level.levelName, level.id)}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </div>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(AddCourse);
