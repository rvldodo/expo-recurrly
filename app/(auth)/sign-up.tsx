import { authClient } from "@/lib/better-auth/client";
import { useState } from "react";
import {
	View,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	Pressable,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { Link, useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";

const SafeAreaView = styled(RNSafeAreaView);

export default function SignUp() {
	const router = useRouter();
	const posthog = usePostHog();

	const [name, setName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [nameTouched, setNameTouched] = useState(false);
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState({
		fields: {
			identifier: "",
			password: "",
			general: "",
		},
	});

	const nameValid = name.length > 3;

	const emailValid =
		emailAddress.length === 0 ||
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);

	const passwordValid = password.length > 0;
	const confirmPasswordValid = password !== confirmPassword;

	const formValid =
		emailAddress.length > 0 && password.length > 0 && emailValid;

	const handlSubmitGoogle = async () => {};
	const handlSubmitFacebook = async () => {};
	const handlSubmitGithub = async () => {};

	const handleSubmit = async () => {
		setLoading(true);

		setErrors({
			fields: {
				identifier: "",
				password: "",
				general: "",
			},
		});

		try {
			await authClient.signIn.email(
				{
					email: emailAddress,
					password,
				},
				{
					onError: (ctx) => {
						setErrors({
							fields: {
								identifier: ctx.error.message,
								password: "",
								general: "",
							},
						});
						return;
					},
				},
			);

			posthog.capture("sign_in_success");

			router.replace("/(tabs)");
		} catch (error) {
			setErrors({
				fields: {
					identifier: "",
					password: "",
					general: "Something went wrong",
				},
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView className="auth-safe-area">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="auth-screen"
			>
				<ScrollView
					className="auth-scroll"
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<View className="auth-content">
						<View className="auth-brand-block">
							<View className="auth-logo-wrap">
								<View className="auth-logo-mark">
									<Text className="auth-logo-mark-text">K</Text>
								</View>
								<View>
									<Text className="auth-wordmark">KASAMA</Text>
								</View>
							</View>

							<Text className="auth-title">Create your account</Text>
							<Text className="auth-subtitle">
								Start tracking your subscriptions and never miss a payment
							</Text>
						</View>

						<View className="auth-card gap-3">
							<Pressable
								className={`auth-button ${!formValid || loading ? "auth-button-disabled" : ""}`}
								onPress={handlSubmitFacebook}
							>
								<Text className="auth-button-text">Facebook</Text>
							</Pressable>

							<Pressable
								className={`auth-button ${!formValid || loading ? "auth-button-disabled" : ""}`}
								onPress={handlSubmitGoogle}
							>
								<Text className="auth-button-text">Google</Text>
							</Pressable>

							<Pressable
								className={`auth-button ${!formValid || loading ? "auth-button-disabled" : ""}`}
								onPress={handlSubmitGithub}
							>
								<Text className="auth-button-text">GitHub</Text>
							</Pressable>

							<View className="flex-row items-center my-2">
								<View className="flex-1 h-px bg-gray-300" />
								<Text className="mx-3 text-sm text-gray-500">
									or continue with
								</Text>
								<View className="flex-1 h-px bg-gray-300" />
							</View>

							<View className="auth-form">
								<View className="auth-field">
									<Text className="auth-label">Name</Text>
									<TextInput
										className={`auth-input ${nameTouched && !nameValid ? "auth-input-error" : ""}`}
										autoCapitalize="none"
										value={name}
										placeholder="John Doe"
										placeholderTextColor="rgba(0,0,0,0.4)"
										onChangeText={setName}
										onBlur={() => setNameTouched(true)}
										keyboardType="default"
									/>

									{nameTouched && !nameValid && (
										<Text className="auth-error">
											Please enter a valid name
										</Text>
									)}

									{!!errors.fields.identifier && (
										<Text className="auth-error">
											{errors.fields.identifier}
										</Text>
									)}
								</View>

								<View className="auth-field">
									<Text className="auth-label">Email Address</Text>
									<TextInput
										className={`auth-input ${emailTouched && !emailValid ? "auth-input-error" : ""}`}
										autoCapitalize="none"
										value={emailAddress}
										placeholder="name@example.com"
										placeholderTextColor="rgba(0,0,0,0.4)"
										onChangeText={setEmailAddress}
										onBlur={() => setEmailTouched(true)}
										keyboardType="email-address"
										autoComplete="email"
									/>

									{emailTouched && !emailValid && (
										<Text className="auth-error">
											Please enter a valid email address
										</Text>
									)}

									{!!errors.fields.identifier && (
										<Text className="auth-error">
											{errors.fields.identifier}
										</Text>
									)}
								</View>

								<View className="auth-field">
									<Text className="auth-label">Password</Text>
									<TextInput
										className={`auth-input ${passwordTouched && !passwordValid ? "auth-input-error" : ""}`}
										value={password}
										placeholder="Enter your password"
										placeholderTextColor="rgba(0,0,0,0.4)"
										secureTextEntry
										onChangeText={setPassword}
										onBlur={() => setPasswordTouched(true)}
										autoComplete="password"
									/>

									{passwordTouched && !passwordValid && (
										<Text className="auth-error">Password is required</Text>
									)}
								</View>

								<View className="auth-field">
									<Text className="auth-label">Confirm Password</Text>
									<TextInput
										className={`auth-input ${passwordTouched && !confirmPasswordValid ? "auth-input-error" : ""}`}
										value={confirmPassword}
										placeholder="Confirm password"
										placeholderTextColor="rgba(0,0,0,0.4)"
										secureTextEntry
										onChangeText={setConfirmPassword}
										onBlur={() => setConfirmPasswordTouched(true)}
										autoComplete="password"
									/>

									{confirmPasswordTouched && !confirmPassword && (
										<Text className="auth-error">Password not valid</Text>
									)}
								</View>

								{!!errors.fields.general && (
									<Text className="auth-error">{errors.fields.general}</Text>
								)}

								{!!errors.fields.general && (
									<Text className="auth-error">{errors.fields.general}</Text>
								)}

								<Pressable
									className={`auth-button ${!formValid || loading ? "auth-button-disabled" : ""}`}
									onPress={handleSubmit}
									disabled={!formValid || loading}
								>
									<Text className="auth-button-text">
										{loading ? "Signing In..." : "Sign In"}
									</Text>
								</Pressable>
							</View>
						</View>

						<View className="auth-link-row">
							<Text className="auth-link-copy">Already have an account?</Text>

							<Link href="/(auth)/sign-in" asChild>
								<Pressable>
									<Text className="auth-link">Sign In</Text>
								</Pressable>
							</Link>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
