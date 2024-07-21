
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim().split('=');
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return null;
}

export const getTokenPayload = () => {
	const token = getCookie('token');
	let tokenPayload = '';
	if (token){
		tokenPayload = JSON.parse(atob(token.split('.')[1]));
	}
	return tokenPayload;
}
