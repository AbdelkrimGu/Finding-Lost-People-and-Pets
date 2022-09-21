package com.example.userservice.models;

import com.example.userservice.enume.Sexe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.*;

/**
 * @author Get Arrays (https://www.getarrays.io/)
 * @version 1.0
 * @since 7/10/2021
 */
@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = AUTO)
    private Long id;
    private String nom="";
    private String prenom="";
    private String telephone="";
    @Column(unique = true)
    private String email;
    private String password;
    private String image="";
    private String adresse="";
    private String ville="";

    @Enumerated(EnumType.STRING)
    private Sexe sexe;




    @ManyToMany(fetch = EAGER)
    private Collection<Role> roles = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = EAGER)
    ConfirmationToken confirmationToken ;

    private Boolean enabled = false;



    public User(String email , String password){
        this.email = email;
        this.password =password;
    }
}
