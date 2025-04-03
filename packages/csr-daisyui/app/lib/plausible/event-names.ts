export enum GenericAppEvents {
	OnboardingCompleted = 'app.onboardingCompleted',
	SessionTimedOut = 'app.sessionTimedOut',
	Error = 'app.error',
	PageView = 'pageview',
}

export enum UserActionEvents {
	SignUp = 'user.signUp',
	SignIn = 'user.signIn',
	SignInFailed = 'user.signInFailed',
	SignInFailedLocked = 'user.signInFailedLocked',
	SignOut = 'user.signOut',
	SignUpFailed = 'user.signUpFailed',
	PasswordResetInitiate = 'user.passwordResetInitiate',
	PasswordResetFailed = 'user.passwordResetFailed',
	PasswordResetComplete = 'user.passwordResetComplete',
	PasswordChange = 'user.passwordChange',
	PasswordChangeFailed = 'user.passwordChangeFailed',
}

type GenericAppEventNames = (typeof GenericAppEvents)[keyof typeof GenericAppEvents]
type UserActionEventNames = (typeof UserActionEvents)[keyof typeof UserActionEvents]

export type PlausibleEventNames = GenericAppEventNames | UserActionEventNames
