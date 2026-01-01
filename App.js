import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "./constants/Colors";
import EditExpenseScreen from "./screens/EditExpenseScreen";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/IconButton";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: GlobalStyles.colors.primary700,
    card: GlobalStyles.colors.primary700,
  },
};

function TabNavigation() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: GlobalStyles.colors.primary700 }}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        // sceneStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: Colors.white,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            color={tintColor}
            size={24}
            onPress={() => {
              navigation.navigate("editExpense");
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
          title: "All Expenses",
          tabBarLabel: "All Expenses",
        }}
      />
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
          title: "Recent Expenses",
          tabBarLabel: "Recent",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: Colors.white,
            // contentStyle: { backgroundColor: GlobalStyles.colors.primary700 },
          }}
        >
          <Stack.Screen
            name="tab"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="editExpense"
            component={EditExpenseScreen}
            options={{
              title: "Manage Expense",
              presentation: "modal",
              animation: "fade",
              contentStyle: { backgroundColor: GlobalStyles.colors.primary700 },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
