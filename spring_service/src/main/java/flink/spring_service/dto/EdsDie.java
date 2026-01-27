package flink.spring_service.dto;

import lombok.Getter;
import lombok.Setter;

public class EdsDie extends Die {
    @Getter @Setter private int bin; 
    @Getter @Setter private String status; 
    public EdsDie(String id, double x, double y, double w, double h, int bin, String status) {
        super(id, x, y, w, h); this.bin = bin; this.status = status;
    }
}
