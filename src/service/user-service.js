import { validate } from '../validation/validate.js';
import { registerUserValidation, loginUserValidation, getUserValidation, updateUserValidation } from '../validation/user-validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
//registerUserValidation adalah schema, dan request adalah data nama masuk ke dalam Form

const defaultSaltRounds = process.env.NODE_ENV === 'test' ? 4 : 10;

const register = async (request) => {
	const user = validate(registerUserValidation, request);
	
	const countUser = await prismaClient.user.count({
		where: {
			username: user.username
		}
	})

	//validasi
	if(countUser === 1){
		throw new ResponseError(400, "username is already exist");
	}
	
	user.password = await bcrypt.hash(user.password, defaultSaltRounds)
	
	const result = prismaClient.user.create({
		data: user,
		select: {
			username: true,
			name: true
		}
	});
	
	return result;
}

const login = async (request) => {
	 const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = uuid().toString()
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
}

const getUser = async (username) => {
	username = validate(getUserValidation, username);
	
	const user = await prismaClient.user.findUnique({
		where: {
			username: username
		},
		select: {
			username: true,
			name: true
		}
	})
	
	if(!user){
		throw new ResponseError(404, 'user is not found');
	}
	
	return user;
}

const patchUser = async (request) => {
	const user = validate(updateUserValidation, request)
	
	const totalUserinDatabase = await prismaClient.user.count({
		where: {
			username: user.username
		}
	});
	
	if(totalUserinDatabase !== 1){
		throw new ResponseError(404, 'user not found');
	}
		
	const data = {}
	if(user.name){
		data.name = user.name
	}
	if(user.password){
		data.password = await bcrypt.hash(user.password, defaultSaltRounds)
	}
	
	return await prismaClient.user.update({
		where: {
			username: user.username
		},
		data: data,
		select: {
			username: true,
			name: true
		}
	});
}

const logoutUser = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}


export default { register, login, getUser, patchUser, logoutUser }

//default artinya ekspor bisa lebih dari satu