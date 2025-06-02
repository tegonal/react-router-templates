export enum GenericAppEvents {
	Error = 'app.error',
	OnboardingCompleted = 'app.onboardingCompleted',
	PageView = 'pageview',
	SessionTimedOut = 'app.sessionTimedOut',
}

export enum UserActionEvents {
	PasswordChange = 'user.passwordChange',
	PasswordChangeFailed = 'user.passwordChangeFailed',
	PasswordResetComplete = 'user.passwordResetComplete',
	PasswordResetFailed = 'user.passwordResetFailed',
	PasswordResetInitiate = 'user.passwordResetInitiate',
	SignIn = 'user.signIn',
	SignInFailed = 'user.signInFailed',
	SignInFailedLocked = 'user.signInFailedLocked',
	SignOut = 'user.signOut',
	SignUp = 'user.signUp',
	SignUpFailed = 'user.signUpFailed',
}

export type PlausibleEventNames = GenericAppEventNames | UserActionEventNames
type GenericAppEventNames = (typeof GenericAppEvents)[keyof typeof GenericAppEvents]

type UserActionEventNames = (typeof UserActionEvents)[keyof typeof UserActionEvents]
