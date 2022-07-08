import decode from 'jwt-decode';

const JWT = 'store-token-id';

const setToken = token => {
  localStorage.setItem(JWT, token); 
}

const getToken = () => {
  return localStorage.getItem(JWT); 
}

const isLogin = () => {
	const jwtToken = getToken();
	return !!jwtToken && !isTokenExpired(jwtToken);
}

const isTokenExpired = token => {
	try {
		const _info = decode(token);
		if( _info.exp < Date.now() / 1000 ){
			return true;
		} else return false; 
	} catch (error) {
		return false;
	}
}

const getUser = () => {
	const jwt = getToken();
	if(isLogin()) {
		//使用到JWT decode套件：https://www.npmjs.com/package/jwt-decode
		const user = decode(jwt);
		return user;
	} else {
		return null;
	}
}

const logout = () => {
	localStorage.removeItem(JWT);
}

//為了不用一直import就直接寫成全局變數，要在index.js導入
global.auth = {
  setToken,
  getToken,
	getUser,
	isLogin,
	logout
}