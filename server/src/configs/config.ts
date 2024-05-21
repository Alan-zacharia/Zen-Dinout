import dotenv from 'dotenv'
dotenv.config();

const configuredKeys = {
    PORT : process.env.PORT || (5000 as number),
    DB_HOST:process.env.DB_HOST as string ,

}


export default configuredKeys;