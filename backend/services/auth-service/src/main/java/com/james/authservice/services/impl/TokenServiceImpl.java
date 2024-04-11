package com.james.authservice.services.impl;

import com.james.authservice.dtos.AuthDTO;
import com.james.authservice.services.TokenService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Date;

@Service
// Service for generating JWTs with RSA Private Key
public class TokenServiceImpl implements TokenService {

    @Override
    // Creates a JTW token with asymmetric keys
    public String generateAuthToken(AuthDTO authDTO) throws Exception {
        PrivateKey privateKey = loadPrivateKey();
        JWSSigner signer = new RSASSASigner(privateKey);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(String.valueOf(authDTO.getUuid()))
                .issuer("auth-service")
                .expirationTime(new Date(System.currentTimeMillis() + 30000))
                .build();

        SignedJWT signedJWT = new SignedJWT(new JWSHeader.Builder(JWSAlgorithm.RS256).build(), claimsSet);
        signedJWT.sign(signer);

        return signedJWT.serialize();
    }

    public static PrivateKey loadPrivateKey() throws Exception {
        ClassPathResource resource = new ClassPathResource("keys/private_key.pem");
        try (InputStream inputStream = resource.getInputStream()) {
            byte[] privateKeyBytes = inputStream.readAllBytes();
            String privateKeyPEM = new String(privateKeyBytes);

            // Remove the PEM header and footer
            privateKeyPEM = privateKeyPEM.replace("-----BEGIN PRIVATE KEY-----", "");
            privateKeyPEM = privateKeyPEM.replace("-----END PRIVATE KEY-----", "");
            privateKeyPEM = privateKeyPEM.replaceAll("\\s+", ""); // Remove any whitespace

            // Decode the base64-encoded content
            byte[] encoded = Base64.decodeBase64(privateKeyPEM);

            // Generate the private key
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encoded);
            KeyFactory kf = KeyFactory.getInstance("RSA");
            return kf.generatePrivate(keySpec);
        }
    }
}
