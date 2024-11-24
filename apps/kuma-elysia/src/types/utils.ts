type BaseTypes = string | number | boolean | Date | Array<any>;

type ToLowerCaseCamelCase<S extends Record<string, any>> = {
  [K in keyof S as Uncapitalize<K & string>]: S[K] extends BaseTypes
    ? S[K]
    : ToLowerCaseCamelCase<S[K]>;
};
