package com.nicoarbelaez.apicelsia.service.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ServiceDTO {
    private String identification;
    private String serviceName;
    private LocalDate startDate;
    private LocalDate lastBillingDate;
    private int lastPayment;
}