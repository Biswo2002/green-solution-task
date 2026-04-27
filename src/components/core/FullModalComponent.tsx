import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { HEIGHT } from '~/utils';

type ModalType = {
  fullModalVisible?: boolean;
  setFullModalVisible: (prev: boolean) => void;
  data: any[];
  OnSelect: (item: any) => void;
};

const ModalComponent: React.FC<ModalType> = ({
  fullModalVisible,
  setFullModalVisible,
  data,
  OnSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = searchQuery
    ? data?.filter((item) =>
      item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )
    : data;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={fullModalVisible}
      onRequestClose={() => {
        setFullModalVisible(!fullModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        {/* Header with search */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png', // search icon
              }}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search for result"
              placeholderTextColor="#999"
              onChangeText={(txt) => setSearchQuery(txt)}
              value={searchQuery}
            />
          </View>
          <TouchableOpacity
            onPress={() => setFullModalVisible(!fullModalVisible)}
          >
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png', // close icon
              }}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Results list */}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => OnSelect(item)}
            >
              <Text style={styles.itemText}>{item?.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#fff',
    minHeight: HEIGHT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#313D65',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#000',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  closeIcon: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    padding: 12,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
