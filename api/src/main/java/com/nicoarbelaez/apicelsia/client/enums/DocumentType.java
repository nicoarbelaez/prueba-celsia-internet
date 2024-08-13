package com.nicoarbelaez.apicelsia.client.enums;

public enum DocumentType {
    CC("CEDULA"),
    TI("TARJETA IDENTIDAD"),
    CE("CEDULA EXTRANJERIA"),
    RC("REGISTRO CIVIL");

    private final String description;

    DocumentType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static boolean isValid(String value) {
        for (DocumentType type : values()) {
            if (type.name().equals(value)) {
                return true;
            }
        }
        return false;
    }
}