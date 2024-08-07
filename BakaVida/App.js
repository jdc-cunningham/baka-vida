/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export const getDBConnection = async () => {
  return openDatabase({name: 'todo-data.db', location: 'default'});
};

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  const currentDay = date.getDay();

  const amazonWorkday = {
    what: 'Amazon Warehouse',
    duration: 11,
    units: 'hours',
    value: 18,
    type: 'full time',
    hourRange: [6, 17],
  };

  const deliveries = {
    what: 'DD/UE',
    duration: 5,
    type: 'gig',
    value: 20, // a good day
    hourRange: [17, 24],
  };

  const plDono = {
    what: 'Plasma Donation',
    duration: 2,
    type: 'gig',
    value: 60,
    hourRange: [17, 19],
  };

  const dayValues = {
    Sunday: [amazonWorkday],
    Monday: [deliveries],
    Tuesday: [plDono, amazonWorkday, deliveries],
    Wednesday: [amazonWorkday, deliveries],
    Thursday: [amazonWorkday, deliveries],
    Friday: [amazonWorkday, plDono, deliveries],
    Saturday: [amazonWorkday, deliveries],
  };

  const today = days[currentDay];

  const currentHour = date.getHours();

  const inRange = job => currentHour <= job.hourRange[1];

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title={today}>Jobs for today:</Section>
          {dayValues[today].map((incomeSource, index) => (
            inRange(incomeSource) ? <Section title='Job' key={index}>
              <Text style={styles.highlight}>{incomeSource.what}</Text>
                {'\n'}
              From {incomeSource.hourRange[0]} to {incomeSource.hourRange[1]}
              {'\n'}
              Expected: ${incomeSource.value * (incomeSource.hourRange[1] - incomeSource.hourRange[0])}.00
              </Section>
            : null
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
