import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '../UI/Drawer';
import axios from 'axios';

class AddQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null,
      error: null,
      loading: false,
    };
  }
  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const response = await axios.get('http://13.233.134.34:9001/course/');
      this.setState({
        loading: false,
        courses: response.data._embedded.courses,
      });
    } catch (error) {
      console.log(error);
      this.setState({ error, loading: false });
    }
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
            <Grid container spacing={3} style={{ height: '100%' }}>
              {this.state.loading ? (
                <CircularProgress />
              ) : (
                this.state.courses &&
                this.state.courses.map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item.id}>
                    <Card
                      className={classes.card}
                      elevation={8}
                      style={{ height: '200px' }}
                    >
                      <CardContent className={classes.cardContent}>
                        <Typography variant="body1" className={classes.name}>
                          {item.courseDescription}
                        </Typography>
                        <Typography className={classes.talent} variant="body2">
                          Total Chapters: {item.totalChapters}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.actions}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            this.props.history.push(`/levels`, item.level);
                          }}
                        >
                          See Course
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
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

export default withStyles(styles)(AddQuiz);
