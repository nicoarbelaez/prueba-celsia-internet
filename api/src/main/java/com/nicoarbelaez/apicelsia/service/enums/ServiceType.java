package com.nicoarbelaez.apicelsia.service.enums;

public enum ServiceType {
    INTERNET_200_MB("Internet 200 MB"),
    INTERNET_400_MB("Internet 400 MB"),
    INTERNET_600_MB("Internet 600 MB"),
    DIRECTV_GO("Directv Go"),
    PARAMOUNT_PLUS("Paramount+"),
    WIN_PLUS("Win+");

    private final String description;

    ServiceType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static boolean isValid(String value) {
        for (ServiceType type : values()) {
            if (type.getDescription().equals(value)) {
                return true;
            }
        }
        return false;
    }
}