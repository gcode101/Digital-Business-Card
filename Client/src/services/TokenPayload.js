
function getCookie(name) {
  const cookies = document.cookie.split(';');
  console.log(`inside getCookie(${name}). cookies: ${cookies}`);
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim().split('=');
    console.log(`i: ${i}`)
    console.log(`cookie: ${cookie}`);
    if (cookie[0] === name) {
      console.log(`inside if (cookie[0] === name) cookie[0]: ${cookie[0]}, name: ${name}`);
      console.log(`cookie[1]: ${cookie[1]}`);
      return cookie[1];
    }
  }
  console.log('returning null');
  return null;
}

export const getTokenPayload = () => {
	const token = getCookie('token');
  console.log(`Inside getTokenPayload token: ${token}`);
	let tokenPayload = '';
	if (token){
		tokenPayload = JSON.parse(atob(token.split('.')[1]));
    console.log(`inside if(token). tokenPayload: ${tokenPayload}`);
	}
  console.log(`tokenPayload: ${tokenPayload}`);
	return tokenPayload;
}
