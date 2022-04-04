import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasTable, TarefasToolbar } from './components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

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

const TarefaList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);
  const[open, setOpen] = useState(false);
  const[message, setMassage] = useState('');

  const listStorage = localStorage.getItem('email_logado');

  const salvar = (tarefa) =>{
    axios.post( API_URL, tarefa, {
      headers: {"x-tenant-id" : listStorage }
    }).then(response => {
      const novaTarefa = response.data;
      setTarefas([...tarefas, novaTarefa]);
      setOpen(true);
      setMassage('Item adicionado com sucesso');
    }).catch(error => {
      setOpen(true);
      setMassage('Ocorreu um ERROR');
    })
  }

  const listarTarefas = () =>{
    axios.get( API_URL, {
      headers: {"x-tenant-id" : listStorage }
    }).then(response => {
      const listaDeTarefas = response.data;
      setTarefas(listaDeTarefas);
    }).catch(error => {
      setOpen(true);
      setMassage('Ocorreu um ERROR');
    });
  }

  const alteraStatus = (id) =>{
    axios.patch(`${API_URL}/${id}`, null, {
      headers: {"x-tenant-id" : listStorage }
    }).then(response => {
      const lista = [...tarefas];
      lista.forEach(tarefa => {
        if (tarefa.id === id){
          tarefa.done = true;
        }
      });
      setTarefas(lista);
      setOpen(true);
      setMassage('Item atualizado com sucesso');
    }).catch(error => {
      setOpen(true);
      setMassage('Ocorreu um ERROR');
    })
  }

  const handledeletar = (id) =>{
    axios.delete(`${API_URL}/${id}`, {
      headers: {"x-tenant-id" : listStorage}
    }).then(response =>{
      const lista = tarefas.filter(tarefa => tarefa.id !== id);
      setTarefas(lista);
      setOpen(true);
      setMassage('Item removido com sucesso');
    }).catch(error => {
      setOpen(true);
      setMassage('Ocorreu um ERROR');
    })
  }

  useEffect(()=>{
    listarTarefas();
  }, []);

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
          <TarefasTable 
            alteraStatus={alteraStatus} 
            tarefas={tarefas}
            deleteAction={handledeletar}
          />
      </div>
      <Dialog open={open} onClose={e => setOpen(false)} >
        <DialogTitle>Atenção!</DialogTitle>
        <DialogContent>
          {message}
        </DialogContent>
        <DialogActions>
          <Button  color='secondary' onClick={e => setOpen(false)}>X</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TarefaList;
