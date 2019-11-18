import React from 'react';
import {NavLink} from 'react-router-dom';
import swal from 'sweetalert';
import {IUser} from '../store/types';
import '../styles/tables.css';
import '../styles/dialogs.css';
import deleteIcon from '../static/delete-cross-icon.svg';
import editIcon from '../static/edit-pencil-icon.svg';

interface IUsers {
  editRoutePrefix: string;
  users: IUser[];
  removeUser: (id: number) => Promise<any>;
}

const noData = 'N/A';

const Users: React.FC<IUsers> = ({editRoutePrefix, users, removeUser}) => {
  return (
    <table className="large-table">
      <colgroup>
        <col className="users-col-id" />
        <col className="users-col-name" />
        <col className="users-col-email" />
        <col className="users-col-phone" />
        <col className="users-col-address" />
        <col className="users-col-remove" />
        <col className="users-col-edit" />
      </colgroup>
      <thead>
        <tr>
          <th className="users-cell-id">ID</th>
          <th className="users-cell-name">Name</th>
          <th className="users-cell-email">E-mail</th>
          <th className="users-cell-phone">Phone</th>
          <th className="users-cell-address">Address</th>
          <th className="users-cell-remove">--</th>
          <th className="users-cell-edit">--</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          const editRoute = editRoutePrefix + '/' + user.id.toString();

          const address = `${user.address.street || noData}, ${user.address
            .suite || noData}`;
          const location = `${user.address.city || noData}, ${user.address
            .zipcode || noData}`;

          const names = user.name.split(' ');
          const firstName = names[0];
          const lastName = names[names.length - 1];
          const shortName =
            names.length === 1 ? firstName : `${firstName} ${lastName}`;

          const removeTitle = `Remove user ${shortName}`;
          const editTitle = `Edit user ${shortName}`;

          const removeMe = async (event: any) => {
            event.preventDefault();

            try {
              const willDelete = await swal({
                title: 'Are you sure?',
                text:
                  'Once excluded, this user information will no longer be stored on database!',
                icon: 'warning',
                buttons: [true, true],
                dangerMode: true,
              });
              if (willDelete) {
                await removeUser(user.id);
                await swal({
                  title: 'OK Computer',
                  text: `Poof! User ${shortName} excluded with success!`,
                  icon: 'success',
                });
              }
            } catch (reason) {
              console.error(reason);
              // FIXME: provide a different message in production
              await swal({
                title: 'Test/Mock error',
                text:
                  'This is an automatically generated error to mock unexpected / unknown behaviors in development mode, please try again later',
                icon: 'error',
              });
            }
          };

          return (
            <tr key={user.id}>
              <td className="users-cell-id">{user.id}</td>
              <td className="users-cell-name">{user.name}</td>
              <td className="users-cell-email">{user.email}</td>
              <td className="users-cell-phone">{user.phone}</td>
              <td className="users-cell-address">
                {address}
                <br />
                {location}
              </td>
              <td className="users-cell-remove">
                <button
                  type="button"
                  onClick={removeMe}
                  className="no-button-style">
                  <img
                    src={deleteIcon}
                    className="button-icon"
                    alt={removeTitle}
                    title={removeTitle}
                  />
                </button>
              </td>
              <td className="users-cell-edit">
                <NavLink
                  to={editRoute}
                  title={editTitle}
                  className="no-link-style">
                  <img
                    src={editIcon}
                    className="button-icon"
                    alt={editTitle}
                    title={editTitle}
                  />
                </NavLink>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Users;
