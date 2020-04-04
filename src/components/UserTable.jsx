import React from 'react';

const UserTable = (props) => {

	return (

		<table border="1">
			<thead>
				<tr>
					<th>Name</th>
					<th>Usernames</th>
					<th></th>
				</tr>
			</thead>
			<tbody>

			{
				props.users.map(user => (
					<tr key={user.id}>
						<td>{user._name}</td>
						<td>{user.username}</td>
						<td>
							<button onClick={() => props.updating(user)}>Editar</button>
							<button onClick={() => props.removeUser(user.id)}>&times;</button>
						</td>
					</tr>
				))
			}

			</tbody>
		</table>

	);

}

export default UserTable;