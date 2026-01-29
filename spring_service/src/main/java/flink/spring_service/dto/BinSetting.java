package flink.spring_service.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_bin_settings")
@Getter @Setter
public class BinSetting {
    @Id
    private String userId; // 사용자 ID (예: "admin", "user01")

    @Column(columnDefinition = "TEXT")
    private String colorConfig; // JSON 문자열로 전체 설정 저장
}
