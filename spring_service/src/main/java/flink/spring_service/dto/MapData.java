package flink.spring_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MapData {
    private String id;
    private double x; // 좌측 하단 x
    private double y; // 좌측 하단 y
    private String type;
    private String color;
    private double size;
    private double cdvalue;
}
