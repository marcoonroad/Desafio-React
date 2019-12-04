import React from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import Row from './Row';
import {useNavigation} from 'react-navigation-hooks';

interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
  };
}

const noData = 'N/A';

const getAddress = (user: IUser) => {
  const address = `${user.address.street || noData}, ${user.address.suite ||
    noData}`;
  const location = `${user.address.city || noData}, ${user.address.zipcode ||
    noData}`;

  return `${address} - ${location}`;
};

const renderItem = (
  user: IUser,
  index: number,
  removeUser: (id: number) => Promise<any>,
  navigate: any,
) => {
  const cells = [user.id.toString(), user.name, user.email];
  const extraCells = [user.phone, getAddress(user)];
  return (
    <Row
      cells={cells}
      indexCounter={index + 1}
      isHeader={false}
      extraCells={extraCells}
      removeMe={() => removeUser(user.id)}
      editMe={() => navigate('EditUser', {userId: user.id.toString()})}
    />
  );
};

const getId = (user: IUser) => user.id.toString();

const TableHeader: React.FC = () => {
  return (
    <Row
      isHeader={true}
      indexCounter={0}
      cells={['ID', 'Name', 'Email', '-']}
    />
  );
};

interface ITable {
  users: IUser[];
  removeUser: (id: number) => Promise<any>;
}

const Table: React.FC<ITable> = ({users, removeUser}) => {
  const {width} = Dimensions.get('window');
  const {navigate} = useNavigation();

  return (
    <View
      style={{
        paddingVertical: width * 0.05,
      }}>
      <FlatList
        data={users}
        ListHeaderComponent={TableHeader}
        renderItem={options =>
          renderItem(options.item, options.index, removeUser, navigate)
        }
        keyExtractor={getId}
      />
    </View>
  );
};

export default Table;
