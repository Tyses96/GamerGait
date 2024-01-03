package com.devty.GamerGait.util;

import java.security.MessageDigest;
import java.util.Random;

public class Hash {

    private static final String CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!£$%^&*()-=+_";
    private static final int CHARS_LENGTH = CHARS.length();

    public static String sha256(final String base) {
        try{
            final MessageDigest digest = MessageDigest.getInstance("SHA-256");
            final byte[] hash = digest.digest(base.getBytes("UTF-8"));
            final StringBuilder hexString = new StringBuilder();
            for (int i = 0; i < hash.length; i++) {
                final String hex = Integer.toHexString(0xff & hash[i]);
                if(hex.length() == 1)
                    hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch(Exception ex){
            throw new RuntimeException(ex);
        }
    }

    public static String generateSalt(){
        int length = 10;
        StringBuilder salt = new StringBuilder();
        for(int i = 0; i < length; i++){
            Random r = new Random();
            salt.append(CHARS.charAt(r.nextInt(CHARS_LENGTH)));
        }
        return salt.toString();
    }
}
