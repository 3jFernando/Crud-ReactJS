import React, { useState, Fragment } from 'react';

// crear id personalizdos
import { v4 as uuidv4 } from 'uuid';

// libreria para formularios
import { useForm } from 'react-hook-form';

const AddUserForm = (props) => {

	const { register, setValue, handleSubmit, errors } = useForm();

	// agregar | actualizar usuario
	const storeUser = (_user, event) => {
		
		// validar si se actualiza
		if(props.stateForm.user !== null) { // editando
			const _userid = props.stateForm.user.id;
			props.setUsers(props.users.map(item => item.id === _userid ? {				
				_name: _user._name,
				username: _user.username
			} : item));
		} else { // creando
			_user.id = uuidv4();
			props.setUsers([
				...props.users, _user
			]);
		}

		// limpiar el formulario
		cancelUpdate();
	}

	// estado del formulario para saber si se esta creando o editando
	let [stateForm, setStateForm] = useState({
		user: null
	});

	// cancelar la actualizacion
	const cancelUpdate = () => {
		props.setStateForm({
			user: null
		});

		setValue('_name', '');
		setValue('username', '');
	};

	const handleOnChange = (event) => {
		setStateForm({
			...stateForm, 
			// esto es una propiedad computada de em6
			[event.target.name] : event.target.value
		});
	}

	return (
		<Fragment>
		<form onSubmit={handleSubmit(storeUser)}>
			<span>Name</span>
			<input type="text" name="_name"
				value={props.stateForm.user?._name}
				placeholder={errors?._name?.message}
				onChange={handleOnChange}
				ref={
					register({
						required: { value: true, message: 'Name obligatorio' }
					})
				}
			 />
			
			<span>Username</span>
			<input type="text" name="username" 
				value={props.stateForm.user?.username}
				placeholder={errors?.username?.message}
				onChange={handleOnChange}
				ref={
					register({
						required: { value: true, message: 'Username obligatorio' }
					})
				}
			/>

			<button type="submit">{(props.stateForm.user !== null) ? 'Actualizar' : 'Crear'} usuario</button>
			{(props.stateForm.user !== null) ? <button type="button" onClick={cancelUpdate}>cancelar</button> : null} 

		</form>
		</Fragment>
	);

}

export default AddUserForm;