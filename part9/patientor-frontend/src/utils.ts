import { Gender, HealthCheckRating } from "./types";

type IsStringFn =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) => boolean;

type IsDateFn =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) => boolean;

type IsGenderFn =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) => boolean;

type IsHealthCheckRatingFn =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) => boolean;


export const isString: IsStringFn = (value) => {
    return (
        value !== undefined &&
        (
            typeof value === 'string' ||
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value instanceof String
        ) &&
        value.length >= 3
    );
};

export const isDate: IsDateFn = (value) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Boolean(Date.parse(value));
};

export const isGender: IsGenderFn = (value) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(value);
};

export const isHealthCheckRating: IsHealthCheckRatingFn = (value) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(value);
};