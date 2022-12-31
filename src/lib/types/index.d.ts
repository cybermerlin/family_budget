declare module '@faker-js/faker' {
  import faker from 'faker';
  export default faker;
}

declare global {
  let console: Console,
      window: Window;


  interface Window extends Window {
    DEBUG: boolean;
    console: Console;
    crypto: Crypto | any;
  }


  interface Console extends Console {
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
