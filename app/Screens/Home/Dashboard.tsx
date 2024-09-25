import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text,SafeAreaView,ScrollView, StyleSheet, ActivityIndicator ,TouchableOpacity,Image} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { AuthContext } from '../../services/authContext';

import axios from 'axios'; // Assuming you're using Axios to fetch the data

type DashboardScreenProps = StackScreenProps<RootStackParamList, 'Dashboard'>;

// const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
const Dashboard = ({navigation} : DashboardScreenProps) => {

  const authContext = useContext(AuthContext);
  
  // Safely extract userInfo properties, avoiding any conditional hook call
  const userInfo = authContext?.userInfo || null;
  const username = userInfo?.username;
  const email = userInfo?.email;
  const role = userInfo?.role;
  const theme = useTheme();
  const { colors }:{colors :any}  = theme;

  // States for the different data points
  const [loading, setLoading] = useState(true);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState(0);
  const [ordersDelivered, setOrdersDelivered] = useState(0);
  const [ordersPending, setOrdersPending] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);

  

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
      try {
          // const response = await axios.get('your-api-url-to-fetch-vendor-dashboard-data'); // Replace with actual API
          // const data = response.data;
          // Assuming the data object has these fields
          // setMonthlyEarnings(data.monthlyEarnings);
          setMonthlyEarnings(200);
          setMonthlyOrders(200);
          setOrdersDelivered(200);
          setOrdersPending(200);
          setTopProducts([]);
          setTotalCustomers(200);
          setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
          console.error('Error fetching dashboard data:', error);
          setLoading(false); // Set loading to false even on error
      }
  };

  useEffect(() => {
      fetchDashboardData();
  }, []);

  if (loading) {
      return (
          <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
      );
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1, marginBottom: 0 }}>
      {userInfo ? (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:80 }}
        >
            {/* Monthly Earnings */}
            <View style={[GlobalStyleSheet.container, { marginHorizontal: 5, marginVertical: 5, backgroundColor: colors.background, marginBottom: 0, paddingBottom: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 45 }}>
                  <TouchableOpacity
                  onPress={() => navigation.openDrawer()}
                  >
                  <View style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      gap: 10,
                      paddingRight: 15
                  }}>
                      <Image
                      style={{ height: 45, width: 45, borderRadius: 15 }}
                      source={IMAGES.small1}
                      />
                      <Text style={{ ...FONTS.fontJostLight, fontSize: 14, color: colors.title }}>{username}{"\n"}<Text style={{ fontSize: 18 }}>Red Carpet {role === '0' ? 'Customer' : 'Vendor'}</Text></Text>
                  </View>
                  </TouchableOpacity>
                  <View
                      style={[{
                          shadowColor: 'rgba(195, 123, 95, 0.20)',
                          shadowOffset: {
                              width: 2,
                              height: 20,
                          },
                          shadowOpacity: .1,
                          shadowRadius: 5,
                      }]}
                  >
                      <TouchableOpacity
                          onPress={() => navigation.navigate('Notification')}
                          style={{ height:45,width:45,backgroundColor:colors.card,borderRadius:15,alignItems:'center',justifyContent:'center' }}
                      >
                          <Image
                              style={[GlobalStyleSheet.image, { tintColor:colors.title }]}
                              source={IMAGES.bell}
                          />
                      </TouchableOpacity>
                  </View>
              </View>
            </View>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={styles.cardTitle}>Monthly Earnings</Text>
                <Text style={styles.cardValue}>${monthlyEarnings}</Text>
            </View>

            {/* Monthly Orders */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={styles.cardTitle}>Monthly Orders</Text>
                <Text style={styles.cardValue}>{monthlyOrders}</Text>
            </View>

            {/* Orders Delivered */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={styles.cardTitle}>Orders Delivered</Text>
                <Text style={styles.cardValue}>{ordersDelivered}</Text>
            </View>

            {/* Orders Pending */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={styles.cardTitle}>Orders Pending</Text>
                <Text style={styles.cardValue}>{ordersPending}</Text>
            </View>

            {/* Total Customers */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={styles.cardTitle}>Total Customers</Text>
                <Text style={styles.cardValue}>{totalCustomers}</Text>
            </View>

            {/* Top Products */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={styles.cardTitle}>Top Products</Text>
                {topProducts.length > 0 ? (
                    topProducts.map((product, index) => (
                        <Text key={index} style={styles.cardSubText}>
                            {/* {index + 1}. {product.name} - {product.sales}  */}
                            sold
                        </Text>
                    ))
                ) : (
                    <Text style={styles.cardSubText}>No data available</Text>
                )}
            </View>
        </ScrollView>
        ) : (
          <Text>Loading...</Text> // or a proper fallback UI
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    card: {
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    cardTitle: {
        ...FONTS.fontSemiBold,
        fontSize: 16,
        color: COLORS.title,
        marginBottom: 10,
    },
    cardValue: {
        ...FONTS.fontBold,
        fontSize: 24,
        color: COLORS.primary,
    },
    cardSubText: {
        ...FONTS.fontRegular,
        fontSize: 14,
        color: COLORS.text,
        marginTop: 5,
    },
});

export default Dashboard;
