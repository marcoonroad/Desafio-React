import React from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import Row from './Row';

interface IUser {
  id: number,
  name: string,
  email: string
}

const renderItem = (user: IUser, index: number) => {
  const cells = [user.id.toString(), user.name, user.email];
  return (
    <Row cells={cells} indexCounter={index + 1} isHeader={false} />
  );
};

const getId = (user : IUser) => user.id.toString();

const TableHeader: React.FC = () => {
  return (
    <Row isHeader={true} indexCounter={0} cells={['ID', 'Name', 'Email', '-']} />
  );
};

const Table: React.FC = () => {
  const {width} = Dimensions.get('window');

  return (
    <View style={{paddingVertical: width * 0.05}}>
      <FlatList
        data={require('../static/users.json')}
        ListHeaderComponent={TableHeader}
        renderItem={(options) => renderItem(options.item, options.index)}
        keyExtractor={getId} />
    </View>
  );
};

export default Table;
