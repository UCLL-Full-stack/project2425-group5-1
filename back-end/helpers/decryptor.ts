import bcrypt from 'bcrypt';

const decryptor = async (plainPass: string, hashedPass: string) => {
        await bcrypt.compare(plainPass, hashedPass, (err, isCorrect) => {
            if (err) {
                console.log('an error has occured');
                throw new Error(`Something went wrong while decrypting the password: ${err}`);
            }
            return true;
        });
};

export default decryptor;
