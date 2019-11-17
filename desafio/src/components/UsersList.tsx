import React from 'react';
import {NavLink} from 'react-router-dom';
import {IUser} from '../store/types';
import '../styles/tables.css';
import deleteIcon from '../static/delete-cross-icon.svg';
import editIcon from '../static/edit-pencil-icon.svg';

interface IUsers {
  editRoutePrefix: string;
  users: IUser[];
  removeUser: (id: number) => any;
}

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
          <th className="users-cell-email">Email</th>
          <th className="users-cell-phone">Phone</th>
          <th className="users-cell-address">Address</th>
          <th className="users-cell-remove">--</th>
          <th className="users-cell-edit">--</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          const editRoute = editRoutePrefix + '/' + user.id.toString();

          const address = `${user.address.street}, ${user.address.suite}`;
          const location = `${user.address.city}, ${user.address.zipcode}`;

          const names = user.name.split(' ');
          const firstName = names[0];
          const lastName = names[names.length - 1];
          const shortName =
            names.length === 1 ? firstName : `${firstName} ${lastName}`;

          const removeTitle = `Remove user ${shortName}`;
          const editTitle = `Edit user ${shortName}`;

          const removeMe = (event: any) => {
            event.preventDefault();
            removeUser(user.id);
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
                  <img src={deleteIcon} className="button-icon" alt={removeTitle} title={removeTitle}/>
                </button>
              </td>
              <td className="users-cell-edit">
                <NavLink
                  to={editRoute}
                  title={editTitle}
                  className="no-link-style">
                  <img src={editIcon} className="button-icon" alt={editTitle} title={editTitle}/>
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
