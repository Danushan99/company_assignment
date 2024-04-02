export function emailInputLowercase(e, stateFunc) {
	const lowercaseValue = e.target.value.toLowerCase();
	stateFunc(lowercaseValue);
}

export function textInputUppercase(e, stateFunc) {
	const uppercaseValue = e.target.value.toUpperCase();
	stateFunc(uppercaseValue);
}
