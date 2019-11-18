import React from 'react';
import {IUser} from '../store/types';
import '../styles/tables.css';

interface IUserPreview {
  user: IUser;
}

const noData = 'N/A';

const getId = (user: IUser) => (user.id < 0 ? '' : user.id.toString());
const getName = (user: IUser) => user.name;
const getEmail = (user: IUser) => user.email;
const getPhone = (user: IUser) => user.phone;

const getAddress = (user: IUser) => {
  const address = `${user.address.street || noData}, ${user.address.suite ||
    noData}`;
  const location = `${user.address.city || noData}, ${user.address.zipcode ||
    noData}`;

  return (
    <span>
      {address}
      <br />
      {location}
    </span>
  );
};

const keyOrder = [
  {title: 'ID', getData: getId},
  {title: 'Name', getData: getName},
  {title: 'Email', getData: getEmail},
  {title: 'Phone', getData: getPhone},
  {title: 'Address', getData: getAddress},
];

const UserPreview: React.FC<IUserPreview> = ({user}) => {
  return (
    <table className="large-table">
      <colgroup>
        <col className="preview-col-key" />
        <col className="preview-col-value" />
      </colgroup>
      <tbody>
        {keyOrder.map(entry => {
          return (
            <tr key={`preview-${entry.title.toLowerCase()}`}>
              <th className="preview-cell-key">{entry.title}</th>
              <td className="preview-cell-value">{entry.getData(user)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserPreview;
