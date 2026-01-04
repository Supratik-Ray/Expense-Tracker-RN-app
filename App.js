import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "./constants/Colors";
import ManageExpenseScreen from "./screens/ManageExpenseScreen";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/IconButton";
import * as SystemUI from "expo-system-ui";
import { ExpensesContextProvider } from "./contexts/ExpensesContext";

SystemUI.setBackgroundColorAsync("#2d0689");

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: Colors.white,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            color={tintColor}
            size={24}
            onPress={() => {
              navigation.navigate("manageExpense");
            }}
          />
        ),
      })}
    >
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
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: Colors.white,
            }}
          >
            <Stack.Screen
              name="tab"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="manageExpense"
              component={ManageExpenseScreen}
              options={{
                title: "Manage Expense",
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
