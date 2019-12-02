import React, { useLayoutEffect } from 'react';
import ImageButton from './ImageButton';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';

interface IRow {
  cells: string[]
  indexCounter: number,
  isHeader?: boolean
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

const Row : React.FC<IRow> = ({ cells, indexCounter, isHeader }) => {
  const {width} = Dimensions.get('window');

  const rowVerticalPadding = width * 0.025;
  const rowHorizontalPadding = width * 0.025;

  return (
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
          onPress={() => null} />
        <ImageButton sourcePath={require('../static/edit-pencil-icon.png')}
          onPress={() => null} />
      </View>) : null}
    </View>
  )
};

export default Row;