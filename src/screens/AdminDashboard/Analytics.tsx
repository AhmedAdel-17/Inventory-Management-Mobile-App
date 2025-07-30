// src/screens/Analytics/Analytics.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';
import { styles } from './styles/Analytics.styles';
import { theme } from '../../theme/theme';

const { width: screenWidth } = Dimensions.get('window');

const Analytics: React.FC = () => {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Mock data for charts
  const revenueData = [
    { value: 250000, label: 'Jan' },
    { value: 280000, label: 'Feb' },
    { value: 320000, label: 'Mar' },
    { value: 290000, label: 'Apr' },
    { value: 350000, label: 'May' },
    { value: 380000, label: 'Jun' },
  ];

  const subscriptionData = [
    { value: 45, label: 'Platinum', color: theme.colors.tierPlatinum },
    { value: 78, label: 'Gold', color: theme.colors.tierGold },
    { value: 120, label: 'Silver', color: theme.colors.tierSilver },
    { value: 89, label: 'Bronze', color: theme.colors.tierBronze },
  ];

  const growthData = [
    { value: 12, dataPointText: '12%' },
    { value: 15, dataPointText: '15%' },
    { value: 18, dataPointText: '18%' },
    { value: 14, dataPointText: '14%' },
    { value: 22, dataPointText: '22%' },
    { value: 25, dataPointText: '25%' },
  ];

  const renderMetricCard = (icon: string, title: string, value: string, change: string, isPositive: boolean) => (
    <LinearGradient
      colors={['rgba(212, 175, 55, 0.1)', 'rgba(212, 175, 55, 0.05)']}
      style={styles.metricCard}
    >
      <View style={styles.metricHeader}>
        <View style={styles.metricIconContainer}>
          <Icon name={icon} size={24} color={theme.colors.accent} />
        </View>
        <View style={[styles.changeContainer, { backgroundColor: isPositive ? theme.colors.success + '20' : theme.colors.error + '20' }]}>
          <Icon 
            name={isPositive ? 'trending-up' : 'trending-down'} 
            size={12} 
            color={isPositive ? theme.colors.success : theme.colors.error} 
          />
          <Text style={[styles.changeText, { color: isPositive ? theme.colors.success : theme.colors.error }]}>
            {change}
          </Text>
        </View>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics & Insights</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Icon name="download" size={24} color={theme.colors.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.periodSelector}>
          {(['week', 'month', 'year'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[styles.periodButtonText, selectedPeriod === period && styles.periodButtonTextActive]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.metricsGrid}>
          {renderMetricCard('currency-usd', 'Total Revenue', '$2.4M', '+18%', true)}
          {renderMetricCard('domain', 'Active Companies', '156', '+12%', true)}
          {renderMetricCard('account-group', 'Total Users', '1,234', '+25%', true)}
          {renderMetricCard('percent', 'Churn Rate', '5.2%', '-2%', true)}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Revenue Trend</Text>
          <LineChart
            data={revenueData}
            width={screenWidth - 48}
            height={200}
            color={theme.colors.accent}
            thickness={3}
            startFillColor={theme.colors.accent}
            endFillColor={theme.colors.accent + '20'}
            startOpacity={0.9}
            endOpacity={0.2}
            initialSpacing={0}
            noOfSections={4}
            maxValue={400000}
            yAxisColor={theme.colors.border}
            xAxisColor={theme.colors.border}
            yAxisTextStyle={{ color: theme.colors.textSecondary }}
            xAxisLabelTextStyle={{ color: theme.colors.textSecondary }}
            dataPointsColor={theme.colors.accent}
            textShiftY={-5}
            textShiftX={-10}
            textColor={theme.colors.textPrimary}
            areaChart
            curved
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Subscription Distribution</Text>
          <View style={styles.pieChartWrapper}>
            <PieChart
              data={subscriptionData}
              donut
              radius={90}
              innerRadius={60}
              centerLabelComponent={() => (
                <View style={styles.pieCenterLabel}>
                  <Text style={styles.pieCenterValue}>332</Text>
                  <Text style={styles.pieCenterText}>Total</Text>
                </View>
              )}
            />
            <View style={styles.legendContainer}>
              {subscriptionData.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.label}: {item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Growth Rate</Text>
          <BarChart
            data={growthData}
            width={screenWidth - 80}
            height={180}
            barWidth={40}
            noOfSections={5}
            barBorderRadius={4}
            frontColor={theme.colors.accent}
            yAxisThickness={0}
            xAxisThickness={0}
            yAxisTextStyle={{ color: theme.colors.textSecondary }}
            isAnimated
          />
        </View>

        <View style={styles.insightsContainer}>
          <Text style={styles.insightsTitle}>Key Insights</Text>
          
          <View style={styles.insightCard}>
            <Icon name="lightbulb" size={20} color={theme.colors.warning} />
            <View style={styles.insightContent}>
              <Text style={styles.insightText}>
                Revenue increased by 25% compared to last month, driven primarily by new Platinum tier subscriptions.
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <Icon name="trending-up" size={20} color={theme.colors.success} />
            <View style={styles.insightContent}>
              <Text style={styles.insightText}>
                User engagement is at an all-time high with 89% of companies actively using the platform daily.
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <Icon name="alert-circle" size={20} color={theme.colors.info} />
            <View style={styles.insightContent}>
              <Text style={styles.insightText}>
                Consider targeting Bronze tier customers for upgrade - 34% show high platform usage.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;