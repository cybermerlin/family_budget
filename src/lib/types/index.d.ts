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

// region declarations of core
declare namespace plugins {
  declare namespace grid {
  }
}
declare namespace lib {
  declare namespace EditableGrid {
  }
}
// endregion
