require( 'dotenv' ).config({ path: 'variables.env' })

import multer from 'multer';
import path  from 'path';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk'; 

const storageTypes = {

    local: multer.diskStorage({

        destination: ( req, file, cb ) => {

            cb( null, path.resolve( __dirname, '..', 'uploads' ) )
        },
        filename: ( req, file, cb ) => {

            crypto.randomBytes( 12, ( err, hash ) => {

                if( err ) cb( err );

                file.key = `${hash.toString( 'hex' )}-${file.originalname}`;

                cb( null, file.key );
            } )
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: ( req, file, cb ) =>   {

            crypto.randomBytes( 12, ( err, hash ) => {

                if( err ) cb( err );

                const fileName = `${hash.toString( 'hex' )}-${file.originalname}`;

                cb( null, fileName );
            } )
        }
    })
}

module.exports = {

    dest: path.resolve( __dirname, '..', 'uploads' ),
    storage: storageTypes[ process.env.STORAGE_TYPE ],
    limits: {
        fileSize: 5 * 1024* 1024
    },
    fileFilter: ( req, file, cb ) => {

        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];

        if( allowedMimes.includes( file.type || file.mimetype ) ) {

            cb( null, true );
        } else {

            cb( new Error( 'Tipo inválido' ) );
        }
    }
}