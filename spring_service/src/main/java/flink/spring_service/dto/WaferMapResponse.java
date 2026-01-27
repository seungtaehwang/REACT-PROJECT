package flink.spring_service.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WaferMapResponse {
    private List<? extends Die> dieList;
    private List<MapData> dataList;
    private double min = 0;
    private double max = 0;
}
