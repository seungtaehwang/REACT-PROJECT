package flink.spring_service.dto;

import lombok.Getter;
import lombok.Setter;

public class MeasureDie extends Die {
    @Getter @Setter private double itemValue;
    public MeasureDie(String id, double x, double y, double w, double h, double val) {
        super(id, x, y, w, h); this.itemValue = val;
    }
}
