package com.nicoarbelaez.apicelsia.client;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nicoarbelaez.apicelsia.client.dto.ClientDTO;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(String id) {
        return clientRepository.findById(id);
    }

    @Transactional
    public Client saveClient(ClientDTO clientDTO) {
        validateClientDTO(clientDTO);

        if (clientRepository.existsById(clientDTO.getIdentification())) {
            throw new RuntimeException("El registro ya existe");
        }
        Client client = Client.builder()
                .identification(clientDTO.getIdentification())
                .firstName(clientDTO.getFirstName())
                .lastName(clientDTO.getLastName())
                .idType(clientDTO.getIdType())
                .birthDate(clientDTO.getBirthDate())
                .phoneNumber(clientDTO.getPhoneNumber())
                .email(clientDTO.getEmail())
                .build();
        return clientRepository.save(client);
    }

    @Transactional
    public Client updateClient(ClientDTO clientDTO) {
        Client client = Client.builder()
                .identification(clientDTO.getIdentification())
                .firstName(clientDTO.getFirstName())
                .lastName(clientDTO.getLastName())
                .idType(clientDTO.getIdType())
                .birthDate(clientDTO.getBirthDate())
                .phoneNumber(clientDTO.getPhoneNumber())
                .email(clientDTO.getEmail())
                .build();
        return clientRepository.save(client);
    }

    @Transactional
    public void deleteClient(String id) {
        clientRepository.deleteById(id);
    }

    private void validateClientDTO(ClientDTO clientDTO) {
        if (clientDTO.getIdentification() == null || clientDTO.getIdentification().isEmpty() ||
                clientDTO.getFirstName() == null || clientDTO.getFirstName().isEmpty() ||
                clientDTO.getLastName() == null || clientDTO.getLastName().isEmpty() ||
                clientDTO.getIdType() == null || clientDTO.getIdType().isEmpty() ||
                clientDTO.getBirthDate() == null ||
                clientDTO.getPhoneNumber() == null || clientDTO.getPhoneNumber().isEmpty() ||
                clientDTO.getEmail() == null || clientDTO.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Todos los campos son obligatorios y no pueden estar vacíos");
        }
    }
}