import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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

const PostItem = (
  {image, user, text, tags, date}
) => {
  const classes = useStyles();

  const avatarImage = user.facebookId ? user.avatarImage : `http://localhost:8000/uploads/${user.avatarImage}`;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={avatarImage}/>
        }
        title={user.displayName}
        subheader={date}
      />
      {image && <CardMedia
        className={classes.media}
        image={`http://localhost:8000/uploads/${image}`}
        title="Paella dish"
      />}
      {tags && text && <CardContent>
        {text && <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>}
        {tags && <Box mt={2}>
          {tags.map(tag => <Chip variant="outlined" label={tag} style={{marginRight: '3px'}} key={tag} />)}
        </Box>}
      </CardContent>}
    </Card>
  );
};

export default PostItem;
