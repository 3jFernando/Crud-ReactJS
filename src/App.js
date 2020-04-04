import React, { useState } from 'react';

// crear id personalizdos
import { v4 as uuidv4 } from 'uuid';

// componentes
import UserTable from './components/UserTable';
import AddUserForm from './components/AddUserForm';

function App() {

	const usersData = [

		{ id: uuidv4(), _name: 'Fernando', username: '3jfernando' },
		{ id: uuidv4(), _name: 'Otro nombre', username: 'Abril lavibn' },
		{ id: uuidv4(), _name: 'Catalina gomes', username: 'Categrande' }

	];

	const [users, setUsers] = useState(usersData);

	// estado del formulario para saber si se esta creando o editando
	let [stateForm, setStateForm] = useState({
		user: null
	});

	// editar usuarios
	const updating = (_user) => {
		setStateForm({
			user: _user
		});
	}

	// eliminar usuarios
	const removeUser = (_id) => {

		// el filter -> recorre el array y si alguno es igual al _id que traemos
		// entonces -> lo evita, no excluye
		setUsers(users.filter(user => user.id !== _id));

	}

  return (
    <div className="App">
      Crud usuarios - con Hooks-form

      <hr />

      <h3>Agregar usuarios</h3>
      <AddUserForm setUsers={setUsers} users={users} stateForm={stateForm} setStateForm={setStateForm} removeUser={removeUser} />

      <h3>Listado de usuarios</h3>
      <UserTable users={users} removeUser={removeUser} updating={updating} />

    </div>
  );
}

export default App;
