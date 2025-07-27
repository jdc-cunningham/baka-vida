import {
  SafeAreaView,
  ScrollView,
  View,
  Button
} from 'react-native';

export const HomeScreen = ({navigation, route}) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    style={{
                        
                    }}
                >
                    <Button
                        title="Finances"
                        onPress={() => {
                            navigation.navigate('Finances')
                        }}
                    />
                </View>
                <View
                    style={{
                        marginTop: 4,
                    }}
                >
                    <Button
                        title="Calorie Counter"
                        onPress={() => {
                            navigation.navigate('Finances')
                        }}
                    />
                </View>
                <View
                    style={{
                        marginTop: 4,
                    }}
                >
                    <Button
                        title="Workout"
                        onPress={() => {
                            navigation.navigate('Finances')
                        }}
                    />
                </View>
                <View
                    style={{
                        marginTop: 4,
                    }}
                >
                    <Button
                        title="Groceries"
                        onPress={() => {
                            navigation.navigate('Finances')
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
