// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export enum EnumStatusOrder {
  New = 1,
 // Update,
  Close
}
export enum EnumRole {
  Admin = 1,
  User = 2
}

export enum EnumStatusCart {
  Open = 1,
  Close
}
//todo move to prod.ts
export const environment = {
  production: false,
  url: 'http://localhost:3000',
  USER_TOKEN: 'jwt',
  USER_DATA: 'UserData',
  CART_DATA: 'CartData',
  IS_NEW: 'isNew',
  FULL_DATA: 'FullData',
  USER_ROLE_ID: 'roleId',
  EMAIL:'email',
  FIRST_NAME:'firstName',
  IMAGES_FOLDER:'../../server/uploads'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
