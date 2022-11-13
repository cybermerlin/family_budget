import "@types/faker";


export {};
declare module '@faker-js/faker' {
  import faker from 'faker';
  export default faker;
}


declare global {
  // let msCrypto: Crypto;

  // interface Window {
  //   msCrypto: Crypto;
  //   crypto: Crypto;
  // }

  interface Console {
    log: ILog;
  }


  interface ILog {
    colors: boolean;

    (...data: any[]): any;
  }
}
