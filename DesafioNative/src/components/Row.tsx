import React, { useLayoutEffect } from 'react';
import ImageButton from './ImageButton';
import {View, Text, Dimensions, TouchableWithoutFeedback} from 'react-native';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

interface IRow {
  cells: string[]
  indexCounter: number,
  isHeader?: boolean,
  extraCells?: string[]
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

const Row : React.FC<IRow> = ({ cells, indexCounter, isHeader, extraCells }) => {
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

  const handleDelete = () => {

  };

  const handleEdit = () => {
    navigate('EditUser');
  };

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