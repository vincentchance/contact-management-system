import userService from '../service/user-service.js';

//middleware

const register = async(req, res, next) => {
	try{
		const result = await userService.register(req.body);
		res.status(200).json({
			data: result
		})
	} catch (err) {
		next(err);
	}
}

const login = async(req, res, next) => {
	try{
		const result = await userService.login(req.body);
		res.status(200).json({
			data: result
		})
	} catch (err) {
		next(err);
	}
}

const getUser = async(req, res, next) => {
	try{
		const username = req.user.username;
		const result = await userService.getUser(username)
		res.status(200).json({
			data: result
		})
	} catch (err){
		next(err)
	}
}

const patchUser = async(req, res, next) => {
	try {
		const username = req.user.username;
		const request = req.body;
		request.username = username;
		
		const result = await userService.patchUser(request)
		res.status(200).json({
			data: result
		})
	} catch (err){
		next(err)
	}
}

const logoutUser = async(req, res, next) => {
	try {
		const username = req.user.username;
		await userService.logoutUser(username);
		res.status(200).json({
			data: 'Ok'
		})
	} catch (err){
		next(err)
	}
}

export default { register, login, getUser, patchUser, logoutUser }