package flink.spring_service.dto;

// 파라미터를 담을 객체 정의
public record WaferRequest(
    String mapType,         // String
    double waferSize,       // Double
    double waferEdge,        
    double dieSizeX,       
    double dieSizeY,       
    double scribeSize,
    double shotCols,
    double shotRows      
) {}
