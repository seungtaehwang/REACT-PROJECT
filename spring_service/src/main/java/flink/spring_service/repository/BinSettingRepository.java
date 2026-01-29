package flink.spring_service.repository;

import flink.spring_service.dto.BinSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BinSettingRepository extends JpaRepository<BinSetting, String> {
}
