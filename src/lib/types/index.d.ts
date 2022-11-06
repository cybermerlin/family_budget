import "@types/faker";


export {};
declare module '@faker-js/faker' {
  import faker from 'faker';
  export default faker;
}


declare global {
  interface Console {
    log: ILog;
  }


  interface ILog {
    colors: boolean;

    (...data: any[]): any;
  }
}
