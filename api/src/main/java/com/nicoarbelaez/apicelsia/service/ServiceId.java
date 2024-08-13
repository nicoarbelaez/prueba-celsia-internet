package com.nicoarbelaez.apicelsia.service;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceId implements Serializable {
    private String identification;
    private String serviceName;
}