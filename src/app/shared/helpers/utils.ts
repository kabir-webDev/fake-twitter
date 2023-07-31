export default class Utils {
  static formatUrlString(text: string, ...args: any[]) {
    let a = text;

    for (let k in args) {
      a = a.replace('{' + k + '}', args[k]);
    }
    return a;
  }
}
