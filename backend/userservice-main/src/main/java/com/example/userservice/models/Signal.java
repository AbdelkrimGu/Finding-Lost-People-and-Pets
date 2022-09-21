package com.example.userservice.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Signal {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;







}
