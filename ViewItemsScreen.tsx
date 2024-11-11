import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, MenuItem } from './types';

type ViewItemsScreenRouteProp = RouteProp<RootStackParamList, 'ViewItems'>;

type ViewItemsScreenProps = {
  route: ViewItemsScreenRouteProp;
};

const ViewItemsScreen = ({ route }: ViewItemsScreenProps) => {
  const { selectedItems, setSelectedItems } = route.params;
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Function to calculate the total price
  const calculateTotalPrice = (items: MenuItem[]): number => {
    return items.reduce((total, item) => total + parseFloat(item.price.replace('R', '')), 0);
  };

  // Initial total price calculation
  useEffect(() => {
    setTotalPrice(calculateTotalPrice(selectedItems));
  }, [selectedItems]);

  // Handle removing an item from the selected items
  const handleRemoveItem = (index: number) => {
    const updatedItems = [...selectedItems];
    const removedItem = updatedItems.splice(index, 1)[0]; // Remove the item at the specified index

    setSelectedItems(updatedItems); // Update the selected items state
    setTotalPrice(prevTotal => prevTotal - parseFloat(removedItem.price.replace('R', ''))); // Update total price

    // Show confirmation that the item has been removed
    Alert.alert('Item Removed', `${removedItem.name} has been removed from your selection.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Selected Items</Text>

      {/* Display selected items or a message if no items are selected */}
      {selectedItems.length === 0 ? (
        <Text style={styles.noItemsText}>No items selected yet!</Text>
      ) : (
        selectedItems.map((item, index) => (
          <View key={index} style={styles.selectedItem}>
            <Image source={item.image} style={styles.selectedImage} />

            <View style={styles.selectedItemDetails}>
              <Text style={styles.selectedItemText}>{item.name} - {item.price}</Text>
              <Text style={styles.selectedItemDescription}>{item.description}</Text>
            </View>

            <TouchableOpacity onPress={() => handleRemoveItem(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* Display the updated total price */}
      <Text style={styles.totalText}>Total: R{totalPrice.toFixed(2)}</Text>

      {/* Button to navigate to another screen or confirm the order */}
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() =>
          Alert.alert('Order Received', 'Your order has been received and will be prepared soon!')
        }
      >
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the ViewItemsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noItemsText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  selectedItemDetails: {
    flex: 1,
  },
  selectedItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedItemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  orderButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ViewItemsScreen;
