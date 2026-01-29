package flink.spring_service.api;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/map")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchOptionController {

@GetMapping("/options")
    public List<String> getFilteredOptions(
            @RequestParam String type,
            @RequestParam(required = false) String keyword) {
        
        // 실제로는 Service -> Repository를 통해 SQL LIKE 검색 수행
        // SELECT name FROM processes WHERE name LIKE %keyword%
        if ("process".equals(type)) {
            return List.of("Photo", "Etch", "Clean").stream()
                    .filter(s -> keyword == null || s.contains(keyword))
                    .toList();
        } else {
            return List.of("EQP-01", "EQP-02", "EQP-03").stream()
                    .filter(s -> keyword == null || s.contains(keyword))
                    .toList();
        }
    }
}
