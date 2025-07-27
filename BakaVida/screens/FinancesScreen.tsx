import { useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import { Debt } from '../models/finances';
import { getDbConnection, getDebtItems } from '../finance-db-service';

export const FinancesScreen = ({navigation, route}) => {
    const [debt, setDebt] = useState(Array<Debt>);

    const loadDebt = async () => {
        const db = await getDbConnection();

        if (db) {
            const debtItems = await getDebtItems(db);

            if (debtItems.length) {
                setDebt(debtItems);
            }
        } else {

            // err
        }
    };

    useEffect(() => {
        loadDebt();
    });

    return (
        <SafeAreaView>
            <ScrollView>
                <View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
