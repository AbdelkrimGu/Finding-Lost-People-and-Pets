package com.example.userservice.models;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="confirmationToken")

public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="token_id")
    private Long tokenid;

    @Column(name="confirmation_token")
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

//    @OneToOne(fetch = FetchType.EAGER)
    @OneToOne
    @JoinColumn(nullable = false, name = "id")
    private User user;




    public ConfirmationToken(User user) {
        this.user = user;
        createdDate = new Date();
        confirmationToken = UUID.randomUUID().toString();
        Algorithm algorithm = Algorithm.HMAC256("confirmation".getBytes());
        confirmationToken = JWT.create()
                .withSubject(user.getEmail())
                .withIssuer("http://localhost:8081/api/login")
                .sign(algorithm);

    }



    // getters and setters
}