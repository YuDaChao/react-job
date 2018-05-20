/**
 * 根据用户角色和头像获取重定向path
 * @param role
 * @param avatar
 */
export const getRedirectPath = (role, avatar) => {
  let path = '/';
  if (role === 0) { // 牛人
    path = '/niuren'
  } else {
    path = '/boss'
  }
  // 判断是否完善信息
  if (avatar) {
    path += '-info'
  }
  return path
};
