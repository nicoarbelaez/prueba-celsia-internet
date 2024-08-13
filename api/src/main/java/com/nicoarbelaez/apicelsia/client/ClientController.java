package com.nicoarbelaez.apicelsia.client;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicoarbelaez.apicelsia.client.dto.ClientDTO;
import com.nicoarbelaez.apicelsia.client.enums.DocumentType;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clients")
public class ClientController {
    private final ClientService clientService;

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable String id) {
        return clientService.getClientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createClient(@RequestBody ClientDTO clientDTO) {
        if (!DocumentType.isValid(clientDTO.getIdType())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de identificación inválido");
        }
        try {
            return ResponseEntity.ok(clientService.saveClient(clientDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClient(@PathVariable String id, @RequestBody ClientDTO clientDTO) {
        if (!clientService.getClientById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        if (!DocumentType.isValid(clientDTO.getIdType())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de identificación inválido");
        }

        try {
            clientDTO.setIdentification(id);
            return ResponseEntity.ok(clientService.updateClient(clientDTO));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable String id) {
        if (!clientService.getClientById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}