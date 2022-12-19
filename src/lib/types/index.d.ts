import "@types/faker";


export {};
declare module '@faker-js/faker' {
  import faker from 'faker';
  export default faker;
}

declare global {
  let console: Console;


  interface Window {
    DEBUG: boolean;
    console: Console;
    crypto: any;
  }


  interface Console {
    colored: boolean;
  }
}
