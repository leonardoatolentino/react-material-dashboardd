import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { createRegularExpressionLiteral } from 'typescript';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const TarefasToolbar = props => {
  const { className, ...rest } = props;

  const [ descricao, setdescricao] = useState('');
  const [ categoria, setcategoria] = useState('');

  const classes = useStyles();
  
  const submit = (event) => {
    event.preventDefault();
    console.log(`Descrição: ${descricao} - Categaria: ${categoria} `);
    setdescricao('');
    setcategoria('');

  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />

      </div>
      <div className={classes.row}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <TextField
              onChange={e => setdescricao(e.target.value)}
              className={classes.searchInput}
              placeholder="Descrição da tarefa"
              label="Descrição"
              fullWidth
              value={descricao}
            />
            
          </Grid>
         
          <Grid item md={4}>
            <FormControl fullWidth  >
              <InputLabel>Categoria: </InputLabel>
              <Select onChange={e => setcategoria(e.target.value)} value={categoria}>
                <MenuItem > Selecione...</MenuItem>
                <MenuItem value="trabalho" > Trabalho </MenuItem>
                <MenuItem value="estudos" > Estudos </MenuItem>
                <MenuItem value="outros" > Outros </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={4}>
            <Button
              onClick={submit}
              variant='contained'
              color='secondary'
            >Adicionar
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

TarefasToolbar.propTypes = {
  className: PropTypes.string
};

export default TarefasToolbar;
