import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

const FormField = (
  {name, type, label, onChange, autoComplete, value,
    required, autoFocus, className, margin, multiline,
  options}
) => {

  const classes = useStyles();

  let field = (
    <TextField
      type={type}
      variant="outlined"
      margin={margin ? margin : "normal"}
      required={required}
      defaultValue={value}
      fullWidth
      id={name}
      label={label}
      name={name}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      onChange={onChange}
      multiline={multiline}
    />
  );

  if(type === 'tags') {
    field = (
      <Autocomplete
        multiple
        aria-required={required}
        options={options}
        onChange={onChange}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={label} />
        )}
      />
    )
  }

  if(type === 'file') {
    field = (
      <>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          name={name}
          onChange={onChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="outlined" color="primary" component="span" startIcon={<PhotoCameraIcon/>}>
            {label}
          </Button>
        </label>
      </>
    )
  }

  return field
};

export default FormField;