package com.nicoarbelaez.apicelsia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nicoarbelaez.apicelsia.service.dto.ServiceDTO;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository serviceRepository;

    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<ServiceEntity> getServiceById(ServiceId id) {
        return serviceRepository.findById(id);
    }

    @Transactional
    public ServiceEntity saveService(ServiceDTO serviceDTO) {
        validateServiceDTO(serviceDTO);

        ServiceId serviceId = new ServiceId(serviceDTO.getIdentification(), serviceDTO.getServiceName());
        if (serviceRepository.existsById(serviceId)) {
            throw new RuntimeException("El registro ya existe");
        }
        ServiceEntity service = ServiceEntity.builder()
                .identification(serviceDTO.getIdentification())
                .serviceName(serviceDTO.getServiceName())
                .startDate(serviceDTO.getStartDate())
                .lastBillingDate(serviceDTO.getLastBillingDate())
                .lastPayment(serviceDTO.getLastPayment())
                .build();
        return serviceRepository.save(service);
    }

    @Transactional
    public ServiceEntity updateService(ServiceDTO serviceDTO) {
        ServiceEntity service = ServiceEntity.builder()
                .identification(serviceDTO.getIdentification())
                .serviceName(serviceDTO.getServiceName())
                .startDate(serviceDTO.getStartDate())
                .lastBillingDate(serviceDTO.getLastBillingDate())
                .lastPayment(serviceDTO.getLastPayment())
                .build();
        return serviceRepository.save(service);
    }

    @Transactional
    public void deleteService(ServiceId id) {
        serviceRepository.deleteById(id);
    }

    private void validateServiceDTO(ServiceDTO serviceDTO) {
        if (serviceDTO.getIdentification() == null || serviceDTO.getIdentification().isEmpty() ||
                serviceDTO.getServiceName() == null || serviceDTO.getServiceName().isEmpty() ||
                serviceDTO.getStartDate() == null ||
                serviceDTO.getLastBillingDate() == null ||
                serviceDTO.getLastPayment() == 0) {
            throw new IllegalArgumentException("Todos los campos son obligatorios y no pueden estar vacíos");
        }

        try {
            Integer.parseInt(serviceDTO.getLastPayment() + "");
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("El último pago debe ser un entero");
        }
    }
}