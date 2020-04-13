import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormField from "../UI/formField/formField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {addPost, fetchTags} from "../../store/actions/posts";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const AddPost = () => {

  const initialState = {
    postImage: null,
    text: '',
    tags: '',
  };
  const [post, setPost] = useState(initialState);

  const tags = useSelector(state => state.posts.tags);
  const error = useSelector(state => state.posts.error);

  const dispatch = useDispatch();

  const inputChangeHandler = e => setPost({...post, [e.target.name]: e.target.value});
  const fileChangeHandler = e => setPost({...post, [e.target.name]: e.target.files[0]});
  const tagsChangeHandler = (e, tags) => setPost({...post, tags: JSON.stringify(tags)});

  const onSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(post).forEach(item => {
      data.append(item, post[item])
    });

    dispatch(addPost(data));
  };

  useEffect(() => {
    dispatch(fetchTags())
  }, [dispatch]);

  return (
    <Box py={3}>
      <form onSubmit={onSubmit}>
        <Grid container direction='column' spacing={1}>
          <Grid item xs>
            <Typography variant='h2' paragraph>
              Добавление нового поста
            </Typography>
          </Grid>
          <Grid item xs>
            <FormField
              type='file'
              label='Картинка поста'
              name='postImage'
              onChange={fileChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <FormField
              label='Текст поста'
              name='text'
              multiline
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <FormField
              type='tags'
              label='Теги'
              required
              name='tags'
              options={tags}
              onChange={tagsChangeHandler}
            />
          </Grid>
          {error && <Grid item xs>
            <Alert severity='error'>{error}</Alert>
          </Grid>}
          <Grid item xs>
            <Button variant='contained' color='primary' type='submit'>
              Добавить пост
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddPost;