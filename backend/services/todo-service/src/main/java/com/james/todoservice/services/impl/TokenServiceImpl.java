package com.james.todoservice.services.impl;

import com.james.todoservice.services.TokenService;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class TokenServiceImpl implements TokenService {

    @Override
    public boolean verifyUser(String token, UUID uuid) throws Exception {
        JWTClaimsSet claimsSet = decodeAuthToken(token);
        return claimsSet.getSubject().equals(uuid.toString());
    }

    static JWTClaimsSet decodeAuthToken(String token) throws Exception {
        PublicKey publicKey = loadPublicKey();
        JWSVerifier verifier = new RSASSAVerifier((RSAPublicKey) publicKey);
        SignedJWT signedJWT = SignedJWT.parse(token);

        if (!signedJWT.verify(verifier)) throw new Exception("invalid auth token");

        JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
        Date exp = claimsSet.getExpirationTime();

        if (Instant.now().toEpochMilli() > exp.getTime()) {
            throw new Exception("expired auth token");
        }
        return claimsSet;
    }

    public static PublicKey loadPublicKey() throws Exception {
        ClassPathResource resource = new ClassPathResource("keys/public_key.pem");
        try (InputStream inputStream = resource.getInputStream()) {
            byte[] publicKeyBytes = inputStream.readAllBytes();
            String publicKeyPEM = new String(publicKeyBytes);

            // Remove the PEM header and footer
            publicKeyPEM = publicKeyPEM.replace("-----BEGIN PUBLIC KEY-----", "");
            publicKeyPEM = publicKeyPEM.replace("-----END PUBLIC KEY-----", "");
            publicKeyPEM = publicKeyPEM.replaceAll("\\s+", ""); // Remove any whitespace

            // Decode the base64-encoded content
            byte[] encoded = Base64.decodeBase64(publicKeyPEM);

            // Generate the public key
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(encoded);
            KeyFactory kf = KeyFactory.getInstance("RSA");
            return kf.generatePublic(keySpec);
        }
    }
}
