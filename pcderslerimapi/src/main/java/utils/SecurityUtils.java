package utils;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * @author Turgut Mehdiyev <turqut@idrak.az>
 */
public class SecurityUtils {
    
    private final static int ITERATION_NUMBER = 1000;
    
    /**
     * Generates 64bit random salt.
     * 
     * @return byte[] 64bit random salt
     * @throws NoSuchAlgorithmException If the algorithm doesn't exist
     */
    public static byte[] generateSalt() throws NoSuchAlgorithmException {
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        
        byte[] salt = new byte[8];
        random.nextBytes( salt );
        
        return salt;
    }
    
    /**
     * Generates corresponding SHA-512 digest based on data and salt.
     * 
     * @param iterationCount The number of iterations of the algorithm
     * @param data Data to encrypt
     * @param salt The salt
     * @return byte[] SHA-512 digest
     * @throws NoSuchAlgorithmException If algorithm doesn't exist
     */
    public static byte[] generateHash( int iterationCount, byte[] data, byte[] salt ) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-512");
        digest.reset();
        digest.update( salt );
        byte[] input = digest.digest( data );
        for ( int i = 0; i < iterationCount; ++i ) {
            digest.reset();
            input = digest.digest( input );
        }
        return input;
    }
    
    /**
     * Converts base64 representation to byte[].
     * @param data String The base64 representation
     * @return byte[]
     * @throws IOException 
     */
    public static byte[] base64ToByte( String data ) throws IOException {
        BASE64Decoder decoder = new BASE64Decoder();
        return decoder.decodeBuffer( data );
    }
    
    /**
     * Converts byte[] to base64 representation.
     * 
     * @param data byte[]
     * @return String
     */
    public static String byteToBase64( byte[] data ) {
        BASE64Encoder encoder = new BASE64Encoder();
        return encoder.encode( data );
    }

    /**
     * Check equality of specified passwords.
     * 
     * @param originalPassword Encrypted original password
     * @param salt Salt that original password was encrypted
     * @param passwordToCheckAgainst Non-encrypted password to check against.
     * @return TRUE if specified passwords match, otherwise FALSE
     */
    public static boolean isPasswordsEqual( String originalPassword, String salt, String passwordToCheckAgainst ) {   
        try {
            byte[] bpwd = passwordToCheckAgainst.getBytes("UTF-8");
            byte[] bsalt = SecurityUtils.base64ToByte( salt );
            byte[] providedPasswordHash = SecurityUtils.generateHash( 1000, bpwd, bsalt );
            byte[] existingUserHash = SecurityUtils.base64ToByte( originalPassword );

            return Arrays.equals( providedPasswordHash, existingUserHash );
        }
        catch ( Exception exc ) {
            return false;
        }
    }

}
