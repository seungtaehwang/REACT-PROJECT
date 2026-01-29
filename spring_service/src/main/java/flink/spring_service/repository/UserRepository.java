package flink.spring_service.repository;

import flink.spring_service.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // 기본 save(), findById(), findAll(), deleteById() 사용 가능
}
