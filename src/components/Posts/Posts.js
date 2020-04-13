import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../../store/actions/posts";
import PostItem from "./PostItem/PostItem";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: '800px'
  }
});

const Posts = () => {
  const classes = useStyles();

  const posts = useSelector(state => state.posts.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch]);

  return (
    <Box mt={2}>
      {posts && posts.length === 0 && <Typography variant='h6'>
        Здесь пока ничего нет
      </Typography>}
      <Grid
        container
        direction='column'
        alignItems='center'
        spacing={1}
      >
        {posts.map(post => {
          return (
            <Grid item xs={12} key={post._id} className={classes.root}>
              <PostItem
                image={post.postImage}
                user={post.user}
                text={post.text}
                date={post.date}
                tags={post.tags}
              />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
};

export default Posts;