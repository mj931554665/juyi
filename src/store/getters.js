const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  dataToken: state => state.user.dataToken,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  parent: state => state.user.parentUrl,
  child: state => state.user.childUrl,
  terminalIds: state => state.user.terminalIdList,
  equipment: state => state.user.deviceList,
  cloudDevice: state => state.user.cloudDevice,
}
export default getters
