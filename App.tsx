import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import useClipboardListener from './hooks/useClipboardListener';
type Content = {
  ID: number;
  content: string;
};

const ListItem = ({content}: {content: Content}) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{content.content}</Text>
  </View>
);

const App = () => {
  const [contents, setContents] = useState<Content[]>();
  useClipboardListener(content => {
    setContents(state => [
      {ID: new Date().getTime(), content: content},
      ...(state || []),
    ]);
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={contents}
        keyExtractor={item => item.ID.toString()}
        renderItem={({item}) => <ListItem content={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
});

export default App;
