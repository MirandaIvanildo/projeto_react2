import { useState } from 'react';
import { db } from './farebaseConnection';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import './app.css';
import { async } from '@firebase/util';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdpost] = useState('')

  const [posts, setPosts] = useState([]);

  async function handleAdd(){
    await addDoc(collection(db, "posts"),{
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO")
      setAutor('');
      setTitulo('');

    })
    .catch((error) => {
      console.log("ERRO" + error)
    })
  }

  async function buscarPost(){
    const postsRef = collection(db, "posts")
    await getDocs(postsRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })

      })
      setPosts(lista);
    })

    .catch((error) => {
      console.log("DEU ALGUM ERRO AO BUSCAR")
    })
  }

  async function editarPost(){
    const docRef = doc(db, "post", idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("POST ATUALIZADO!")
      setIdpost('')
      setTitulo('')
      setAutor('')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  async function excluirPost(id){
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(() =>{
      alert("POST DELETADO COM SUCESSO!")
    })
  }

  return (
    <div>
      <h1>ReactJS + Firebase :</h1>

      <div className='container'>
        <label>ID do post:</label>
        <input placeholder='Digite o ID do post'
        value={idPost} onChange={ (e) => setIdpost(e.target.value)}/> <br/>
        <label>Titulo:</label><textarea type="text" placeholder='Digite o titulo'
        value={titulo} onChange={ (e) => setTitulo(e.target.value) }/>

        <label>autor:</label>
        <input type="text" placeholder='Autor do post' value={autor}
        onChange={(e) => setAutor(e.target.value) }/>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar post</button> <br/>
        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map( (post) => {
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br/>
                <span>Titulo: {post.titulo} </span> <br/>
                <span>Autor: {post.autor}</span> <br/>
                <button onClick={ () => excluirPost(post.id) }>Excluir</button> <br/><br/>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  );
}

export default App;
