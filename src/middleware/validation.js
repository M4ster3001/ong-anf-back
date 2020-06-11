import { check } from 'express-validator/check';

export const Login = {
    validations: [ 
        check( 'email' ).trim().escape().normalizeEmail().isEmail(), 
        check( 'password' ).trim().escape().isLength({ min: 6 }) 
    ]
}