import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import User from '../../../models/User';
import { buscaId, buscar, post, put } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokenReducer';
import './CadastroPostagem.css';

function CadastroPostagem() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );


  const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
  )

  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    tema: null,
    usuario: null 
  });

  const [usuario, setUsuario] = useState<User>({
    id: +userId,    
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
})

  useEffect(() => {
    if (token === '') {
      alert('Já vai?');
      navigate('/login');
    }
  }, [token]);

  async function getTemas() {
    await buscar('/temas', setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getTemas();
    if (id !== undefined) {
      findByIdPostagem(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
      usuario: usuario 
    });
  }, [tema]);

  async function findByIdPostagem(id: string) {
    await buscaId(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  function updatePostagem(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await put('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('Post alterado com sucesso!');
      } catch (error) {
        console.log(`deu erro: ${error}`);
        alert('Não conseguimos atualizar a postagem, tente novamente!');
      }
    } else {
      try {
        await post('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('Post criado com sucesso!')
      } catch (error) {
        console.log(`deu erro: ${error}`);
        alert('Não conseguimos criar a postagem, tente novamente!');
      }
    }

    back();
  }

  function back() {
    navigate('/posts');
  }

  return (
    <>
      <Container maxWidth="sm" className="topo">
        <form onSubmit={onSubmit}>
          <Typography
            variant="h3"
            color="textSecondary"
            component="h1"
            align="center"
            style={{ color: '#FFE1D2' }}
          >
            Crie seu Post:
          </Typography>

          <TextField
            id="titulo"
            label="Titulo da postagem"
            variant="outlined"
            name="titulo"
            margin="normal"
            fullWidth
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatePostagem(e)}
            
            
            
          />
          <TextField
            id="texto"
            label="Texto da postagem"
            variant="outlined"
            name="texto"
            margin="normal"
            fullWidth
            multiline
            rows={3}
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatePostagem(e)}
          
          />

          <FormControl fullWidth variant='filled'>
            <InputLabel id="selectTema-label">Tema</InputLabel>
            <Select
              labelId="selectTema-label"
              id="selectTema"
              onChange={(e) =>
                buscaId(`/temas/${e.target.value}`, setTema, {
                  headers: {
                    Authorization: token,
                  },
                })
              }
            >
              {temas.map((tema) => (
                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Escolha um tema do seu Post</FormHelperText>

            <Button type="submit" variant="contained" color="primary">
              Publicar
              
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
}

export default CadastroPostagem;
