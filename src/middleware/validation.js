import { check } from 'express-validator';

export const Login = {
    validations: [ 
        check( 'email' ).trim().escape().normalizeEmail().isEmail(), 
        check( 'password' ).trim().escape().isLength({ min: 6 }) 
    ]
}

export const User = {
    validations: [ 
        check( 'user_name' ).trim().escape(), 
        check( 'email' ).trim().escape().normalizeEmail().isEmail(), 
        check( 'phone' ).trim().escape().isNumeric(),
        check( 'password' ).trim().escape()
    ]
}