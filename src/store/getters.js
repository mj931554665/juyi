const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  parent: state => state.user.parentUrl,
  child: state => state.user.childUrl
}
export default getters
