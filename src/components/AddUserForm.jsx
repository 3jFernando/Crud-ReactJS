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
		if(props.stateForm !== null) { // editando
			const _userid = props.stateForm.id;
			props.setUsers(props.users.map(item => item.id === _userid ? {		
				id: _userid,
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

	// usuario temporal para actualizar
	var [dataUserUpdate, setDataUserUpdate] = useState({
		_name: '',
		username: ''
	});

	// cancelar la actualizacion
	const cancelUpdate = () => {
		props.setStateForm(null);

		setDataUserUpdate({
			_name: '',
			username: ''
		});
	};

	// cambios en los inputs
	const onHandleChange = (e) => {
		if(props.stateForm === null)
			setDataUserUpdate({...dataUserUpdate, [e.target.name]: e.target.value});
		else
			props.setStateForm({...props.stateForm, [e.target.name]: e.target.value});
	} 

	return (
		<Fragment>
		<form onSubmit={handleSubmit(storeUser)}>
			<span>Name</span>
			<input type="text" name="_name"
				value={(props.stateForm === null) ? dataUserUpdate._name : props.stateForm._name}
				onChange={onHandleChange}
				placeholder={errors?._name?.message}
				ref={
					register({
						required: { value: true, message: 'Name obligatorio' }
					})
				}
			 />
			
			<span>Username</span>
			<input type="text" name="username" 
				value={(props.stateForm === null) ? dataUserUpdate.username : props.stateForm.username}
				onChange={onHandleChange}
				placeholder={errors?.username?.message}				
				ref={
					register({
						required: { value: true, message: 'Username obligatorio' }
					})
				}
			/>

			<button type="submit">{(props.stateForm !== null) ? 'Actualizar' : 'Crear'} usuario</button>
			{(props.stateForm !== null) ? <button type="button" onClick={cancelUpdate}>cancelar</button> : null} 

		</form>
		</Fragment>
	);

}

export default AddUserForm;