package com.nicoarbelaez.apicelsia.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicoarbelaez.apicelsia.service.dto.ServiceDTO;
import com.nicoarbelaez.apicelsia.service.enums.ServiceType;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {
    private final ServiceService serviceService;

    @GetMapping
    public ResponseEntity<List<ServiceEntity>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @GetMapping("/{identification}/{serviceName}")
    public ResponseEntity<ServiceEntity> getServiceById(@PathVariable String identification, @PathVariable String serviceName) {
        ServiceId id = new ServiceId(identification, serviceName);
        return serviceService.getServiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createService(@RequestBody ServiceDTO serviceDTO) {
        try {
            if (!ServiceType.isValid(serviceDTO.getServiceName())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nombre del servicio inválido");
            }
            return ResponseEntity.ok(serviceService.saveService(serviceDTO));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{identification}/{serviceName}")
    public ResponseEntity<?> updateService(@PathVariable String identification, @PathVariable String serviceName, @RequestBody ServiceDTO serviceDTO) {
        ServiceId id = new ServiceId(identification, serviceName);
        if (!serviceService.getServiceById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        try {
            if (!ServiceType.isValid(serviceDTO.getServiceName())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nombre del servicio inválido");
            }
            serviceDTO.setIdentification(identification);
            serviceDTO.setServiceName(serviceName);
            return ResponseEntity.ok(serviceService.updateService(serviceDTO));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{identification}/{serviceName}")
    public ResponseEntity<Void> deleteService(@PathVariable String identification, @PathVariable String serviceName) {
        ServiceId id = new ServiceId(identification, serviceName);
        if (!serviceService.getServiceById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
