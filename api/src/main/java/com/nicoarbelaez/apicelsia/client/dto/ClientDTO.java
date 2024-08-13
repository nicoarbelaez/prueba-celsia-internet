package com.nicoarbelaez.apicelsia.client.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ClientDTO {
    private String identification;
    private String firstName;
    private String lastName;
    private String idType;
    private LocalDate birthDate;
    private String phoneNumber;
    private String email;
}