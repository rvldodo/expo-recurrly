import { Link } from "expo-router";
import { View, Text } from "react-native";

const SignUp = () => {
	return (
		<View>
			<Text>Sign Up</Text>
			<Link href="/(auth)/sign-in">Sign In</Link>
		</View>
	);
};

export default SignUp;
