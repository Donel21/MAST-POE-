// MenuScreen.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuItem } from './types';  // Import MenuItem type

const MenuScreen = () => {
  const navigation = useNavigation();

  const starters: MenuItem[] = [
    { name: 'Salad', price: 'R59.99', description: 'Fresh garden salad.', image: require('./images/salad.jpg') },
    { name: 'Soup', price: 'R49.99', description: 'Tomato basil soup.', image: require('./images/soup.jpg') },
    { name: 'Bruschetta', price: 'R69.99', description: 'Grilled bread with tomatoes.', image: require('./images/bruschetta.jpg') },
    { name: 'Spring Rolls', price: 'R79.99', description: 'Crispy vegetable spring rolls.', image: require('./images/rolls.jpg') },
  ];

  const mains: MenuItem[] = [
    { name: 'Steak', price: 'R149.99', description: 'Grilled rib-eye steak.', image: require('./images/steak.jpg') },
    { name: 'Pasta', price: 'R119.99', description: 'Pasta in creamy Alfredo sauce.', image: require('./images/pasta.jpg') },
    { name: 'Pizza', price: 'R99.99', description: 'Wood-fired Margherita pizza.', image: require('./images/pizza.jpg') },
    { name: 'Burger', price: 'R79.99', description: 'Classic beef burger with fries.', image: require('./images/burger.jpg') },
  ];

  const desserts: MenuItem[] = [
    { name: 'Cheesecake', price: 'R49.99', description: 'Creamy New York cheesecake.', image: require('./images/cheese.jpg') },
    { name: 'Brownie', price: 'R39.99', description: 'Chocolate fudge brownie.', image: require('./images/brown.jpg') },
    { name: 'Ice Cream', price: 'R29.99', description: 'Vanilla bean ice cream.', image: require('./images/ice.jpg') },
    { name: 'Apple Pie', price: 'R59.99', description: 'Homemade apple pie.', image: require('./images/apple.jpg') },
  ];

  const drinks: MenuItem[] = [
    { name: 'Coffee', price: 'R29.99', description: 'Hot brewed coffee.', image: require('./images/coffee.jpg') },
    { name: 'Tea', price: 'R19.99', description: 'Green tea with lemon.', image: require('./images/tea.jpg') },
    { name: 'Soda', price: 'R19.99', description: 'Chilled soda with ice.', image: require('./images/soda.jpg') },
    { name: 'Juice', price: 'R29.99', description: 'Fresh orange juice.', image: require('./images/juice.png') },
  ];

  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Function to calculate the average price of the items in a category
  const calculateAveragePrice = (items: MenuItem[]): number => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.price.replace('R', '')), 0);
    return total / items.length;
  };

  const handleSelectItem = (item: MenuItem) => {
    // Add the item to the selectedItems array
    setSelectedItems(prevItems => [...prevItems, item]);

    // Calculate the price by removing 'R' and converting to float
    const itemPrice = parseFloat(item.price.replace('R', ''));
    setTotalPrice(prevPrice => prevPrice + itemPrice);

    Alert.alert('Item Selected', `${item.name} has been added to your selection!`);
  };

  // Navigate to the ViewItemsScreen when the button is pressed
  const navigateToViewItems = () => {
    navigation.navigate('ViewItems', { selectedItems, setSelectedItems, totalPrice, setTotalPrice });
  };

  const renderDropdown = (items: MenuItem[]) => {
    return items.map((item, index) => (
      <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleSelectItem(item)}>
        <Image source={item.image} style={styles.menuImage} />
        <View style={styles.menuDetails}>
          <Text style={styles.menuName}>{item.name} - {item.price}</Text>
          <Text style={styles.menuDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={true}>
      <Text style={styles.header}>Menu</Text>

      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
        <Text style={styles.filterButtonText}>Filter by Course</Text>
      </TouchableOpacity>

      <Text style={styles.categoryTitle}>Starters</Text>
      {renderDropdown(starters)}
      <Text style={styles.averagePrice}>Average Price: R{calculateAveragePrice(starters).toFixed(2)}</Text>

      <Text style={styles.categoryTitle}>Mains</Text>
      {renderDropdown(mains)}
      <Text style={styles.averagePrice}>Average Price: R{calculateAveragePrice(mains).toFixed(2)}</Text>

      <Text style={styles.categoryTitle}>Desserts</Text>
      {renderDropdown(desserts)}
      <Text style={styles.averagePrice}>Average Price: R{calculateAveragePrice(desserts).toFixed(2)}</Text>

      <Text style={styles.categoryTitle}>Drinks</Text>
      {renderDropdown(drinks)}
      <Text style={styles.averagePrice}>Average Price: R{calculateAveragePrice(drinks).toFixed(2)}</Text>

      {/* Button to view selected items */}
      <TouchableOpacity style={styles.viewItemsButton} onPress={navigateToViewItems}>
        <Text style={styles.viewItemsButtonText}>View Selected Items</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  filterButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    height: 100,
  },
  menuImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  menuDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuDescription: {
    fontSize: 14,
    color: 'gray',
  },
  averagePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 10,
    textAlign: 'center',
  },
  viewItemsButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  viewItemsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MenuScreen;
