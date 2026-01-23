package flink.spring_service.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import flink.spring_service.model.ChartData;
import flink.spring_service.model.PieData;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
public class ChartController {

    @GetMapping("/chart/sample-data")
    public Map<String, Object> getWeekData() {
        Map<String, Object> response = new HashMap<>();
        List<String> labels = Arrays.asList("월", "화", "수", "목", "금", "토", "일");
        List<Integer> values = Arrays.asList(120, 200, 150, 80, 70, 110, 130);
        
        response.put("labels", labels);
        response.put("values", values);
        
        return response;
    }
    @GetMapping("/chart/chart-data")
    public Map<String, Object> getChartData() {
        Map<String, Object> data = new HashMap<>();
        List<String> categories = Arrays.asList("월", "화", "수", "목", "금", "토", "일");
        List<Integer> values = Arrays.asList(120, 200, 150, 80, 70, 110, 130);
        
        data.put("categories", categories);
        data.put("yvalue", values);
        return data; // JSON 형태로 반환됩니다.
    }

    @GetMapping("/chart/pie-data")
    public List<PieData> getSalesData() {
        // 실제 데이터베이스 조회 로직 필요
        List<String> categories = Arrays.asList("월", "화", "수", "목", "금", "토", "일");
        List<PieData> response =  new ArrayList<>();
        Random random = new Random();   
        for (String category : categories) {
            response.add(new PieData(category, random.nextFloat() * 100));
        }

        return response;
    }   

    @GetMapping("/chart/xy-data")
    public List<Map<String, Object>> getItems(@RequestParam("chartIndex") String chartIndex) {
        List<Map<String, Object>> dataList = new ArrayList<>();
        List<String> legendNames = new ArrayList<>();
        Random random = new Random();
		String[] paramValues = {"A", "B", "C", "D", "E"};
		for (String paramValue : paramValues) {
            String name = String.format("C-%s series %s", chartIndex, paramValue);
            List<List<Float>> dataPoints = new ArrayList<>();
			for (int i = 0; i < 10; i++) {
				dataPoints.add(Arrays.asList(random.nextFloat() * 100, random.nextFloat() * 100));
			}
            legendNames.add(name);
            dataList.add(Map.of("name", name, "data", dataPoints));
		}
        return dataList;
    }    
}
