import React, { useLayoutEffect } from 'react';
import ImageButton from './ImageButton';
import {View, Text, Dimensions, TouchableWithoutFeedback, Alert} from 'react-native';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { removeUser } from 'src/store/users/actions';

interface IRow {
  cells: string[]
  indexCounter: number,
  isHeader?: boolean,
  extraCells?: string[],
  removeMe?: () => Promise<any>,
  editMe?: () => void
}

const renderCell = (indexCounter: number, isHeader: boolean) => {
  const {width} = Dimensions.get('window');
  const rowHorizontalPadding = width * 0.025;

  return (cell : string, index: number, cells: string[]) => {
    const key = 'row-' + indexCounter.toString() + '-cell-' + index.toString();

    return (
      <View key={key} style={{
        width: width / (isHeader ? cells.length : cells.length + 1),
        paddingHorizontal: rowHorizontalPadding,
      }}>
        <Text style={{
          fontWeight: isHeader ? 'bold' : 'normal',
        }}>{cell}</Text>
      </View>
    );
  };
};

const Row : React.FC<IRow> = ({ cells, indexCounter, isHeader, extraCells, removeMe, editMe }) => {
  const {width} = Dimensions.get('window');

  const rowVerticalPadding = width * 0.025;
  const rowHorizontalPadding = width * 0.025;

  const {navigate} = useNavigation();

  const [isVisible, setVisibility] = React.useState(false);

  const handleTouch = () => {
    if (!!isHeader) {
      return;
    }

    setVisibility(!!extraCells && extraCells.length > 0 && !isVisible);
  };

  const successOnDelete = () => {
    Alert.alert(
      'OK Computer',
      'The user was excluded with success!'
    );
  };

  const failureOnDelete = () => {
    Alert.alert(
      'Test/mock error',
      'This is an automatically generated error to mock unexpected / unknown behaviors in development mode, please try again later'
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Are you sure?',
      'Once excluded, this user information will no longer be stored on database!',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => {
          if (removeMe) {
            try {
              await removeMe();
              successOnDelete();
            } catch (reason) {
              console.error(reason);
              failureOnDelete();
            }
          }
        }},
      ]
    );
  };

  const handleEdit = editMe;

  const belowCells = !!extraCells && extraCells.length > 0 ? extraCells : [];

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View>
        <View style={{
          paddingVertical: rowVerticalPadding,
          backgroundColor: indexCounter % 2 === 1 ? '#f2f2f2' : '#ffffff',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {cells.map(renderCell(indexCounter, !!isHeader))}
          {!isHeader ? (<View style={{
            width: width / (cells.length + 1),
            paddingHorizontal: rowHorizontalPadding,
            flex: 1,
            flexDirection: 'row',
          }}>
            <ImageButton sourcePath={require('../static/delete-cross-icon.png')}
              onPress={handleDelete} />
            <ImageButton sourcePath={require('../static/edit-pencil-icon.png')}
              onPress={handleEdit} />
          </View>) : null}
        </View>

        <View style={{
          paddingVertical: rowVerticalPadding,
          backgroundColor: indexCounter % 2 === 1 ? '#f2f2f2' : '#ffffff',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          display: isVisible ? 'flex' : 'none',
        }}>
          {belowCells.map(renderCell(indexCounter, !!isHeader))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default Row;