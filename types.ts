// types.ts

export type MenuItem = {
    name: string;
    price: string;
    description: string;
    image: any;  // This should match the type of the images you're using (e.g., require() images)
  };
  
  export type RootStackParamList = {
    SignIn: undefined;         // No parameters for SignIn screen
    SignUp: undefined;         // No parameters for SignUp screen
    Home: undefined;           // No parameters for Home screen
    Menu: undefined;           // No parameters for Menu screen
    ViewItems: {               // Parameters for ViewItems screen
      selectedItems: MenuItem[];                            // List of selected menu items
      setSelectedItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;  // Function to update selectedItems
      totalPrice: number;                                     // Total price of selected items
      setTotalPrice: React.Dispatch<React.SetStateAction<number>>;  // Function to update totalPrice
    };
  };
  