package flink.spring_service;

import static org.assertj.core.api.Assertions.assertThat; // 이 구문이 필요합니다.

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.TestRestTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest
class SpringServiceApplicationTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testWaferMapGeneration() {
        // 1. 요청 데이터 구성 (React에서 보내는 것과 동일)
        Map<String, Object> request = Map.of(
            "mapType", "EDS",
            "waferSize", 300000,
            "waferEdge", 3000,
            "dieSizeX", 10000,
            "dieSizeY", 10000,
            "scribeSize", 200,
            "shotCols", 3,
            "shotRows", 3
        );

        // 2. API 호출
        ResponseEntity<Map> response = restTemplate.postForEntity(
            "/map/wafer-data", 
            request, 
            Map.class
        );

        // 3. 결과 검증
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        //assertThat(response.getBody()).containsKey("dieList");
        //assertThat(response.getBody()).containsKey("dataList");
        
        System.out.println("응답 결과: " + response.getBody());
    }

}
