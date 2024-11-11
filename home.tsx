import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  const recommendations = [
    { id: '1', name: 'Cappuccino', price: 'R25', rating: '5.0', reviews: '120', chef: 'Christoffel', category: 'Drinks', image: 'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: '2', name: 'Sandwich', price: 'R50', rating: '4.4', reviews: '105', chef: 'Christoffel', category: 'Starters', image: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FuZHdpY2h8ZW58MHx8MHx8fDA%3D' },
    { id: '3', name: 'Oysters & Greens', price: 'R60', rating: '4.5', reviews: '110', chef: 'Christoffel', category: 'Main Food', image: 'https://images.unsplash.com/photo-1529476498401-2d62bcfe433a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b3lzdGVyfGVufDB8fDB8fHww' },
    { id: '4', name: 'Lasagna', price: 'R88', rating: '4.7', reviews: '123', chef: 'Christoffel', category: 'Main Food', image: 'https://th.bing.com/th?id=OSK.HEROgadinrS_NeKu29KguAT_hRkjG_NWuEuacjuARO1TPao&w=384&h=228&c=13&rs=2&o=6&pid=SANGAM' },
    { id: '5', name: 'Burgers', price: 'R79', rating: '5', reviews: '200', chef: 'Christoffel', category: 'Main Food', image: 'https://th.bing.com/th/id/OIP.KomAB7rg-OCyK3QEDO81fwHaEn?w=284&h=180&c=7&r=0&o=5&pid=1.7' },
  ];

  const filteredRecommendations = recommendations.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to calculate the average price for each category
  const calculateAveragePriceByCategory = (category: string) => {
    const categoryItems = recommendations.filter(item => item.category === category);
    const totalPrice = categoryItems.reduce((acc, item) => acc + parseFloat(item.price.replace('R', '')), 0);
    return categoryItems.length > 0 ? totalPrice / categoryItems.length : 0;
  };

  // Calculate average prices for each category
  const averagePriceStarters = calculateAveragePriceByCategory('Starters');
  const averagePriceMainFood = calculateAveragePriceByCategory('Main Food');
  const averagePriceDrinks = calculateAveragePriceByCategory('Drinks');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome User, 123</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Chef's Recommendations Title */}
      <Text style={styles.recommendationsTitle}>Chef's Recommendations</Text>

      {/* Recommendations List */}
      <FlatList
        data={filteredRecommendations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name} - {item.price}</Text>
              <Text style={styles.itemDetails}>Rating: {item.rating} ({item.reviews} reviews)</Text>
              <Text style={styles.itemChef}>By {item.chef}</Text>
            </View>
          </View>
        )}
      />

      {/* Average Prices for Each Category */}
      <View style={styles.averagePriceContainer}>
        <Text style={styles.averagePrice}>Average Starters Price: R{averagePriceStarters.toFixed(2)}</Text>
        <Text style={styles.averagePrice}>Average Main Food Price: R{averagePriceMainFood.toFixed(2)}</Text>
        <Text style={styles.averagePrice}>Average Drinks Price: R{averagePriceDrinks.toFixed(2)}</Text>
      </View>

      {/* Menu Button */}
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={() => navigation.navigate('Menu')} // Navigate to MenuScreen
      >
        <Text style={styles.menuButtonText}>Go to Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30, // Adjust the space below the welcome text
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10, // Adds space below the title and search bar
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#eaeaea', // Slightly grey background
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#888',
  },
  itemChef: {
    fontSize: 14,
    color: '#555',
  },
  averagePriceContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  averagePrice: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
    color: 'green',
  },
  menuButton: {
    marginTop: 20,
    backgroundColor: '#000000',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
