package com.nicoarbelaez.apicelsia.service;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nicoarbelaez.apicelsia.client.Client;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(ServiceId.class)
@Table(name = "services")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServiceEntity {
    @Id
    @Column(name = "identification", nullable = false, length = 20)
    private String identification;

    @Id
    @Column(name = "service_name", nullable = false, length = 80)
    private String serviceName;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "last_billing_date", nullable = false)
    private LocalDate lastBillingDate;

    @Column(name = "last_payment", nullable = false)
    private int lastPayment;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "identification", referencedColumnName = "identification", insertable = false, updatable = false)
    private Client client;
}
