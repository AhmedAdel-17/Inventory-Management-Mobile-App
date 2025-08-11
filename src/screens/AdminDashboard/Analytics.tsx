// src/screens/Analytics/Analytics.tsx
import React, { useState, useMemo } from 'react';
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

  // Optimized chart dimensions with proper calculations
  const chartDimensions = useMemo(() => ({
    // Account for: container margins (32) + container padding (32) + extra padding (16)
    chartWidth: Math.max(screenWidth - 80, 280), // Minimum width 280
    containerPadding: 16,
    // Optimal spacing based on screen size
    barSpacing: Math.max(Math.floor((screenWidth - 200) / 10), 15),
    lineSpacing: Math.max(Math.floor((screenWidth - 200) / 12), 25),
  }), [screenWidth]);

  // Optimized data with better formatting
  const chartData = useMemo(() => ({
    revenue: [
      { value: 250, label: 'Jan', dataPointText: '250K', labelTextStyle: { color: theme.colors.textSecondary, fontSize: 10 } },
      { value: 280, label: 'Feb', dataPointText: '280K', labelTextStyle: { color: theme.colors.textSecondary, fontSize: 10 } },
      { value: 320, label: 'Mar', dataPointText: '320K', labelTextStyle: { color: theme.colors.textSecondary, fontSize: 10 } },
      { value: 290, label: 'Apr', dataPointText: '290K', labelTextStyle: { color: theme.colors.textSecondary, fontSize: 10 } },
      { value: 350, label: 'May', dataPointText: '350K', labelTextStyle: { color: theme.colors.textSecondary, fontSize: 10 } },
      { value: 380, label: 'Jun', dataPointText: '380K', labelTextStyle: { color: theme.colors.textSecondary, fontSize: 10 } },
    ],
    subscriptions: [
      { value: 45, color: '#E5E4E2', focused: false },
      { value: 78, color: '#FFD700', focused: false },
      { value: 120, color: '#C0C0C0', focused: false },
      { value: 89, color: '#CD7F32', focused: false },
    ],
    growth: [
      { value: 12, label: 'Jan', frontColor: theme.colors.accent, labelTextStyle: { color: theme.colors.textSecondary, fontSize: 9 } },
      { value: 15, label: 'Feb', frontColor: theme.colors.accent, labelTextStyle: { color: theme.colors.textSecondary, fontSize: 9 } },
      { value: 18, label: 'Mar', frontColor: theme.colors.accent, labelTextStyle: { color: theme.colors.textSecondary, fontSize: 9 } },
      { value: 14, label: 'Apr', frontColor: theme.colors.accent, labelTextStyle: { color: theme.colors.textSecondary, fontSize: 9 } },
      { value: 22, label: 'May', frontColor: theme.colors.accent, labelTextStyle: { color: theme.colors.textSecondary, fontSize: 9 } },
      { value: 25, label: 'Jun', frontColor: theme.colors.accent, labelTextStyle: { color: theme.colors.textSecondary, fontSize: 9 } },
    ],
  }), [theme.colors.accent, theme.colors.textSecondary]);

  const subscriptionLabels = useMemo(() => [
    { label: 'Platinum', value: 45, color: '#E5E4E2' },
    { label: 'Gold', value: 78, color: '#FFD700' },
    { label: 'Silver', value: 120, color: '#C0C0C0' },
    { label: 'Bronze', value: 89, color: '#CD7F32' },
  ], []);

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
          <View style={styles.chartWrapper}>
            <LineChart
              data={chartData.revenue}
              width={chartDimensions.chartWidth}
              height={200}
              color={theme.colors.accent}
              thickness={2.5}
              areaChart
              startFillColor={theme.colors.accent}
              endFillColor={theme.colors.accent}
              startOpacity={0.15}
              endOpacity={0.02}
              initialSpacing={chartDimensions.lineSpacing}
              endSpacing={chartDimensions.lineSpacing}
              spacing={Math.floor((chartDimensions.chartWidth - (chartDimensions.lineSpacing * 2)) / (chartData.revenue.length - 1))}
              noOfSections={4}
              maxValue={400}
              stepValue={100}
              yAxisColor={theme.colors.border}
              xAxisColor={theme.colors.border}
              yAxisThickness={0.5}
              xAxisThickness={0.5}
              yAxisTextStyle={{
                color: theme.colors.textSecondary,
                fontSize: 10,
                fontFamily: theme.typography.fontFamily.regular,
              }}
              xAxisLabelTextStyle={{
                color: theme.colors.textSecondary,
                fontSize: 10,
                fontFamily: theme.typography.fontFamily.regular,
              }}
              hideDataPoints={false}
              dataPointsRadius={4}
              dataPointsColor={theme.colors.accent}
              dataPointsColor1={theme.colors.accent}
              curved
              isAnimated
              animationDuration={1200}
              showVerticalLines={false}
              showYAxisIndices={false}
              rulesType="dashed"
              rulesColor={theme.colors.border}
              dashWidth={2}
              dashGap={4}
            />
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Subscription Distribution</Text>
          <View style={styles.pieChartContainer}>
            <View style={styles.pieChartSection}>
              <PieChart
                data={chartData.subscriptions}
                donut
                radius={75}
                innerRadius={48}
                strokeColor={theme.colors.background}
                strokeWidth={1}
                centerLabelComponent={() => (
                  <View style={styles.pieCenterLabel}>
                    <Text style={styles.pieCenterValue}>332</Text>
                    <Text style={styles.pieCenterText}>Total</Text>
                  </View>
                )}
                isAnimated
                animationDuration={1000}
                showText={false}
                showValuesAsLabels={false}
              />
            </View>
            <View style={styles.legendSection}>
              {subscriptionLabels.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                  <View style={styles.legendTextContainer}>
                    <Text style={styles.legendLabel}>{item.label}</Text>
                    <Text style={styles.legendValue}>{item.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Growth Rate (%)</Text>
          <View style={styles.chartWrapper}>
            <BarChart
              data={chartData.growth}
              width={chartDimensions.chartWidth}
              height={180}
              // Bar configuration
              barWidth={Math.min(35, Math.floor((chartDimensions.chartWidth - 100) / chartData.growth.length))}
              spacing={chartDimensions.barSpacing}
              initialSpacing={20}
              endSpacing={20}
              // Bar styling
              barBorderRadius={6}
              barBorderTopLeftRadius={6}
              barBorderTopRightRadius={6}
              // Axis configuration
              yAxisThickness={0.5}
              xAxisThickness={0.5}
              yAxisColor={theme.colors.border}
              xAxisColor={theme.colors.border}
              noOfSections={5}
              maxValue={30}
              stepValue={6}
              // Text styling
              yAxisTextStyle={{
                color: theme.colors.textSecondary,
                fontSize: 10,
                fontFamily: theme.typography.fontFamily.regular,
              }}
              xAxisLabelTextStyle={{
                color: theme.colors.textSecondary,
                fontSize: 9,
                fontFamily: theme.typography.fontFamily.regular,
              }}
              // Animation
              isAnimated
              animationDuration={1000}
              // Grid lines
              showVerticalLines={false}
              rulesType="dashed"
              rulesColor={theme.colors.border + '40'}
              dashWidth={2}
              dashGap={4}
              // Value labels
              showValuesAsTopLabel
              topLabelTextStyle={{
                color: theme.colors.textPrimary,
                fontSize: 11,
                fontFamily: theme.typography.fontFamily.semiBold,
              }}
            />
          </View>
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