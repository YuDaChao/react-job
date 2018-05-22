import { post, get } from '../utils/request'

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


export const getAccessToken = () => get('/api/users/accessToken');

/**
 * 根据用户id获取用户信息
 * @param userId
 * @returns {*}
 */
export const getUserById = (userId) => get('/api/users/user', {userId});

/**
 * 根据用户角色获取用户列表
 * @param role
 * @returns {*}
 */
export const getUsersByRole = (role) => get('/api/users/user-list', { role });


/**
 * 发送消息
 * @param msg
 * @returns {*}
 */
export const sendMessage = (msg) => post('/api/chats/send', msg);

export const getUserChats = () => get('/api/chats/list');

export const updateChatStatus = (from) => post('/api/chats/edit-msg', { from });
