import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll';



const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TarefasTable = props => {
  const { className, tarefas, ...rest } = props;

  const classes = useStyles();


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableCell>Código</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableHead>
              <TableBody>
                { tarefas.map( tarefa => {
                    return(
                      <TableRow  key={tarefa.id}>
                        <TableCell>{tarefa.id}</TableCell>
                        <TableCell>{tarefa.descricao}</TableCell>
                        <TableCell>{tarefa.categoria}</TableCell>
                        <TableCell>{tarefa.done ? 'Feito' : 'Pendente' }</TableCell>
                        <TableCell>
                          <IconButton disabled={tarefa.none ? true : false} onClick={e => props.alteraStatus(tarefa.id)}>
                            { tarefa.done ? 
                                <DoneAllIcon color='primary' />
                              :
                                <TimerIcon style={{color:'#A52A2A'}}/>
                            }
                          </IconButton>
                        </TableCell>
                        <TableCell>
                        <Button 
                          variant="contained" 
                          style={{backgroundColor:'#A52A2A', color:'#fff'}}
                          onClick={e => props.deleteAction(tarefa.id)}
                        >
                          Deletar
                        </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

TarefasTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default TarefasTable;
