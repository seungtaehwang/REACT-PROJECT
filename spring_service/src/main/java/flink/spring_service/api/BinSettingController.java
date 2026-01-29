package flink.spring_service.api;

import flink.spring_service.dto.BinSetting;
import flink.spring_service.repository.BinSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wafer-settings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BinSettingController {
    private final BinSettingRepository repository;

    @GetMapping("/{userId}")
    public ResponseEntity<BinSetting> getSetting(@PathVariable String userId) {
        return ResponseEntity.ok(repository.findById(userId).orElse(new BinSetting()));
    }

    @PostMapping("/{userId}")
    public void saveSetting(@PathVariable String userId, @RequestBody String colorConfig) {
        BinSetting setting = new BinSetting();
        setting.setUserId(userId);
        setting.setColorConfig(colorConfig);
        repository.save(setting);
    }
}
