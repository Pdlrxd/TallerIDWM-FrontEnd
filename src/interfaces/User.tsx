export interface User {
    firstName?:        string;
    lastName?:         string;
    email:            string;
    phone?:            string;
    street?:           string;
    number?:           string;
    commune?:          string;
    region?:           string;
    postalCode?:       string;
    registrationDate?: Date;
    lastLogin?:        null;
    status?:           boolean;
    token:            string;
    role?:             string;
}
