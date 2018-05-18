import { post } from '../utils/request'

/**
 * 注册接口
 * @param user
 * @returns {*}
 */
export const signUp = (user) => post('/api/users/register', user);

/**
 * 登录接口
 * @param userName
 * @param password
 * @returns {*}
 */
export const signIn = (userName, password) => post('/api/users/login', {userName, password});

/**
 * 用户完善信息
 * @param user
 * @returns {*}
 */
export const completeUserInfo = (user) => post('/api/users/update', user);
