import React from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, makeStyles, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin:20,
    backgroundColor:"#f0f7e1",
  },
  media: {
    height: 0,
    paddingTop: "0%"//'56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function MyCard(props) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div >
      <Card className={classes.root}>
        <CardHeader

          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.data.id}
          </Avatar>
          }
          title={props.data.title}
          subheader={props.data.created_at}
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />


        <CardContent>
          <Typography variant="body2"  component="p">
           {props.data.body}
        </Typography>
        </CardContent>

       
        <CardActions disableSpacing>

          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>

          <IconButton aria-label="share">
            <ShareIcon />

          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />

          </IconButton>
        </CardActions>

 {/*
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
          </Typography>
          </CardContent>
        </Collapse>
        */}
      </Card>
    </div>
  );
}

export default MyCard;
