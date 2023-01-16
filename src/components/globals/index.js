import { genarateId } from './ids';

export function installComponentsGlobals (Vue) {
  Vue.prototype.$genarateId = genarateId;
}