import { Link, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

const SubscriptionDetail = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	return (
		<SafeAreaView className="flex-1 bg-background p-5">
			<Text>Subscription Details: {id}</Text>
			<Link href="/">Go Back</Link>
		</SafeAreaView>
	);
};

export default SubscriptionDetail;
