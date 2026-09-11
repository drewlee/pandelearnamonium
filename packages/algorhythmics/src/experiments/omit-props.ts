/**
 * Omits the properties from the specified object.
 *
 * @param obj - Object to modify.
 * @param props - List of properties to omit.
 * @returns Copy of the object with properties omitted.
 */
export function omitProps<T extends object, U extends string>(obj: T, props: U[]) {
  const omittedObj = {} as {
    [Property in keyof T as Exclude<Property, U>]: T[Property];
  };

  for (const [prop, value] of Object.entries(obj)) {
    if (!props.includes(prop as U)) {
      const tKey = prop as keyof typeof omittedObj;
      omittedObj[tKey] = value as (typeof omittedObj)[keyof typeof omittedObj];
    }
  }

  return omittedObj;
}

interface User {
  email: string;
  password: string;
  createdDate: Date;
  hashedPassword: string;
}

type OUser = Omit<User, 'hashedPassword' | 'password'>;

const user: User = {
  email: 'andrew@dev.to',
  password: 'Hax0rZ',
  createdDate: new Date(),
  hashedPassword: 'ds0938h4sdk7hjf832rh',
};

const nUser = omitProps(user, ['hashedPassword', 'password']) satisfies OUser;

console.log(nUser);
