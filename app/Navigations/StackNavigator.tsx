import React, { useContext } from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { AuthContext } from "../services/authContext";
import Onbording from "../Screens/onbording/Onbording";
import SignIn from "../Screens/Auth/SignIn";
import ForgatPassword from "../Screens/Auth/ForgatPassword";
import EnterCode from "../Screens/Auth/EnterCode";
import NewPassword from "../Screens/Auth/NewPassword";
import DrawerNavigation from "./DrawerNavigation";
import Notification from "../Screens/Notification/Notification";
import Search from "../Screens/search/Search";
import ProductDetails from "../Screens/Product/ProductDetails";
import Home from "../Screens/Home/Home";
import Wishlist from "../Screens/Wishlist/Wishlist";
import MyCart from "../Screens/MyCart/MyCart";
import Category from "../Screens/Category/Category";
import EditProfile from "../Screens/profile/EditProfile";
import Myorder from "../Screens/profile/Myorder";
import WriteReview from "../Screens/profile/WriteReview";
import Trackorder from "../Screens/profile/Trackorder";
import SavedAddresses from "../Screens/profile/SavedAddresses";
import SaveAddress from "../Screens/profile/SaveAddress";
import Checkout from "../Screens/profile/Checkout";
import Payment from "../Screens/profile/Payment";
import AddCard from "../Screens/profile/AddCard";
import Language from "../Screens/language/Language";
import Questions from "../Screens/profile/Questions";
import Chat from "../Screens/Chat/Chat";
import SingleChat from "../Screens/Chat/SingleChat";
import Call from "../Screens/Chat/Call";
import Coupons from "../Screens/profile/Coupons";
import Products from "../Screens/Category/Products";
import IndividualCategory from "../Screens/Category/IndividualCategory";
import Dashboard from "../Screens/Home/Dashboard";
import Components from "../Screens/Shortcode/Components";
import AccordionScreen from "../Screens/Shortcode/Accordion";
import BottomSheet from "../Screens/Shortcode/BottomSheet";
import Buttons from "../Screens/Shortcode/Buttons";
import Inputs from "../Screens/Shortcode/Inputs";
import ActionModals from "../Screens/Shortcode/ActionModals";
import Badges from "../Screens/Shortcode/Badges";
import Charts from "../Screens/Shortcode/Charts";
import Headers from "../Screens/Shortcode/Headers";
import Footers from "../Screens/Shortcode/Footers";
import TabStyle1 from "../components/Footers/FooterStyle1";
import TabStyle2 from "../components/Footers/FooterStyle2";
import TabStyle3 from "../components/Footers/FooterStyle3";
import TabStyle4 from "../components/Footers/FooterStyle4";
import ListScreen from "../Screens/Shortcode/Lists";
import Pricings from "../Screens/Shortcode/Pricings";
import DividerElements from "../Screens/Shortcode/DividerElements";
import Snackbars from "../Screens/Shortcode/Snakbars";
import Socials from "../Screens/Shortcode/Socials";
import SwipeableScreen from "../Screens/Shortcode/Swipeable";
import Tabs from "../Screens/Shortcode/Tabs";
import Tables from "../Screens/Shortcode/Tables";
import Toggles from "../Screens/Shortcode/Toggles";
import { RootStackParamList } from "./RootStackParamList";
import SignUp from "../Screens/Auth/SignUp";
import AddBusiness from "../Screens/Category/AddBusiness";
import PostBusiness from "../Screens/Category/PostBusiness";

const Stack = createStackNavigator<RootStackParamList>(); // Use the param list type

const StackNavigator = () => {
  const authContext = useContext(AuthContext);

  // Check if authContext is null
  const isAuthenticated = authContext ? authContext.isAuthenticated : false;
  const username = authContext ? authContext.userInfo : '';

  console.log(isAuthenticated,'isauth')
  console.log(username,'username')
  return (
    <>
    <Stack.Navigator
    
    initialRouteName={isAuthenticated ? "DrawerNavigation" : "SignIn"} // Use "DrawerNavigation" when authenticated
    screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Wishlist" component={Wishlist} />
          <Stack.Screen name="MyCart" component={MyCart} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Myorder" component={Myorder} />
          <Stack.Screen name="WriteReview" component={WriteReview} />
          <Stack.Screen name="Trackorder" component={Trackorder} />
          <Stack.Screen name="SavedAddresses" component={SavedAddresses} />
          <Stack.Screen name="SaveAddress" component={SaveAddress} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="Language" component={Language} />
          <Stack.Screen name="Questions" component={Questions} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="SingleChat" component={SingleChat} />
          <Stack.Screen name="Call" component={Call} />
          <Stack.Screen name="Coupons" component={Coupons} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="IndividualCategory" component={IndividualCategory} />
          <Stack.Screen name="AddBusiness" component={AddBusiness} />
          <Stack.Screen name="PostBusiness" component={PostBusiness} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Components" component={Components} />
          <Stack.Screen name="Accordion" component={AccordionScreen} />
          <Stack.Screen name="BottomSheet" component={BottomSheet} />
          <Stack.Screen name="Buttons" component={Buttons} />
          <Stack.Screen name="Inputs" component={Inputs} />
          <Stack.Screen name="ActionModals" component={ActionModals} />
          <Stack.Screen name="Badges" component={Badges} />
          <Stack.Screen name="Charts" component={Charts} />
          <Stack.Screen name="Headers" component={Headers} />
          <Stack.Screen name="Footers" component={Footers} />
          <Stack.Screen name="TabStyle1" component={TabStyle1} />
          <Stack.Screen name="TabStyle2" component={TabStyle2} />
          <Stack.Screen name="TabStyle3" component={TabStyle3} />
          <Stack.Screen name="TabStyle4" component={TabStyle4} />
          {/* <Stack.Screen name="ListScreen" component={ListScreen} /> */}
          <Stack.Screen name="Pricings" component={Pricings} />
          <Stack.Screen name="DividerElements" component={DividerElements} />
          <Stack.Screen name="Snackbars" component={Snackbars} />
          <Stack.Screen name="Socials" component={Socials} />
          <Stack.Screen name="Swipeable" component={SwipeableScreen} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Tables" component={Tables} />
          <Stack.Screen name="Toggles" component={Toggles} />
        </>
      ) : (
        <>
          {/* <Stack.Screen name="Onbording" component={Onbording} /> */}
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          {/* <Stack.Screen name="ForgatPassword" component={ForgatPassword} />
          <Stack.Screen name="EnterCode" component={EnterCode} />
          <Stack.Screen name="NewPassword" component={NewPassword} />  */}
        </>
      )}
    </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
