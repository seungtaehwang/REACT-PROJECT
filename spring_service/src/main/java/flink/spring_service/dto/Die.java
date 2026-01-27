package flink.spring_service.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "mapType")
@JsonSubTypes({
    @JsonSubTypes.Type(value = EdsDie.class, name = "EDS"),
    @JsonSubTypes.Type(value = MeasureDie.class, name = "MEASURE")
})
public class Die {
    private String id;
    private double x; // 좌측 하단 x
    private double y; // 좌측 하단 y
    private double width;
    private double height;
}
