import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './src/navigation';
import SplashScreen from './src/components/SplashScreen';

export default function App() {
	const [timePassed, setTimePassed] = useState(false);
	useEffect(() => {
		if (Text.defaultProps == null) Text.defaultProps = {};
		Text.defaultProps.allowFontScaling = false;
		setTimeout(() => setTimePassed(true), 1000);
		store.dispatch({ type: 'playback_status', payload: 'paused' }); // To make sure currentTrack is paused at startup
		console.disableYellowBox = true;
	});

	function renderApp(isReady) {
		if (isReady && timePassed) {
			return <RootNavigator />;
		}
		return <SplashScreen />;
	}

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{renderApp}</PersistGate>
		</Provider>
	);
}
