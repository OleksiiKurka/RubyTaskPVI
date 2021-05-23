import React from 'react';
import "./MyCard.css"

function MyCard(props) {

  const [expanded, setExpanded] = React.useState(false);

  //console.log( new Date(props.data.created_at.replace(' ', 'T')));

  return (

    <div className="mb-4" >
      <div className="card m-auto w-75 cards-div" >
        <div className="card-body">

          <div className="card-title mb-4">
            <div className="row">
              <div className="col-2">
                <img className="rounded-circle z-depth-2 avatar" alt="100x100" src={`https://avatars.dicebear.com/api/avataaars/${props.data.id}.svg`}
                  data-holder-rendered="true" />
              </div>
              <div className="col-10 mt-3">
                <h2>Oleksii Kurka</h2>
                <footer className="blockquote-footer"> 9 hours ago</footer>
              </div>
            </div>
          </div>

          <h2 className="card-subtitle mb-2 text-muted">{props.data.title}</h2>
          <p className="card-text">{props.data.body}</p>

          <button className="btn btn-outline-secondary" type="button" data-toggle="collapse" data-target={`#posts ${props.data.id}`} aria-expanded="false" aria-controls={`posts ${props.data.id}`}>
            See comments 
          </button>
          


        </div>
        <div className="collapse mx-3" id={`posts ${props.data.id}`}>
          <div className="card card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
        </div>
      </div>

      {/*
      <Card className={classes.root}>
        <CardHeader


          title={props.data.title}
          subheader={props.data.created_at}
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />


        <CardContent>
          <Typography variant="body2" component="p">
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
        /}
        </Card>*/}
    </div >
  );
}

export default MyCard;
