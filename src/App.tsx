import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import './App.css'

interface User{
  id: number;
  nome: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState("");
  const [selectedId, setSelectedId] = useState(-1);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:8080/users");
    
    setUsers(res.data);
  }

  const handleAddOrUpdateUser = async () => {
    if(selectedId < 0){
      await axios.post("http://localhost:8080/users",{
        nome: userName
      });

      alert(`${userName} inserido com sucesso.`);

      getUsers();

      setUserName("");
    }else{
      await axios.put("http://localhost:8080/users",{
        id: selectedId,
        nome: userName
      });

      alert(`Usuário alterado com sucesso.`);

      getUsers();

      setUserName("");
      setSelectedId(-1);
    }
  }

  const handleSelectUser = async (id : number) => {
    const user = users.find((user : User) => user.id === id);
  
    if(user){
      setUserName(user.nome);
      setSelectedId(user.id);
    }
  }

  const handleDeleteUser = async (id: number) => {
    
  }

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  return (
    <>
      <input placeholder='nome' onChange={handleOnInputChange} value={userName.length > 0 ? userName : ""}/>
      <button onClick={handleAddOrUpdateUser}>Salvar</button>
      <button onClick={getUsers}>Listar</button>

      <table style={{margin: "100px 0"}}>
        <tbody>
          <tr>
            <th>Id</th>
            <th style={{width: "500px"}}>Nome</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td><button onClick={() => {handleDeleteUser(user.id)}}>remover</button></td>
              <td><button onClick={() => {handleSelectUser(user.id)}}>Alterar</button></td>
            </tr>
          ))}  
        </tbody>
      </table>
    </>
  )
}

export default App
