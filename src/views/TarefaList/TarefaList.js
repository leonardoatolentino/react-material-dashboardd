import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasTable, TarefasToolbar } from './components';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';
const headers =  {"x-tenant-id" : "funalo@email.com.br"};

const TarefaList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);

  const salvar = (tarefa) =>{
    axios.post( API_URL, tarefa, {
      headers: headers
    }).then(response => {
      const novaTarefa = response.data;
      setTarefas([...tarefas, novaTarefa]);
    }).catch(error => {
      console.log(error);
    })
  }

  const listarTarefas = () =>{
    axios.get( API_URL, {
      headers:headers
    }).then(response => {
      const listaDeTarefas = response.data;
      setTarefas(listaDeTarefas);
    }).catch(error => {
      console.log(error);
    });
  }

  const alteraStatus = (id) =>{
    axios.patch(`${API_URL}/${id}`, null, {
      headers:headers
    }).then(response => {
      console.log(response.status);
    }).catch(error => {
      console.log(error);
    })
  }
  
  useEffect(()=>{
    listarTarefas();
  }, []);

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable alteraStatus={alteraStatus} tarefas={tarefas} />
      </div>
    </div>
  );
};

export default TarefaList;
