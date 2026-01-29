package flink.spring_service.api;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import flink.spring_service.dto.Die;
import flink.spring_service.dto.EdsDie;
import flink.spring_service.dto.MapData;
import flink.spring_service.dto.MeasureDie;
import flink.spring_service.dto.WaferMapResponse;
import flink.spring_service.dto.WaferRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MapController {

    @PostMapping("/map/wafer-data")
    public ResponseEntity<WaferMapResponse> generateDiesData(@RequestBody WaferRequest params) {

        List<Die> dieList = new ArrayList<>();
        List<MapData> dataList = new ArrayList<>();
        ThreadLocalRandom rnd = ThreadLocalRandom.current();

        String mapType = params.mapType();
        double waferSize = params.waferSize();
        double waferEdge = params.waferEdge();
        double dieXSize = params.dieSizeX();
        double dieYSize = params.dieSizeY();
        double scribe = params.scribeSize();

        double radius = (waferSize / 2.0) - waferEdge;
        double dieXStep = dieXSize + scribe;
        double dieYStep = dieYSize + scribe;
        int limitX = (int) (radius / dieXStep) + 2;
        int limitY = (int) (radius / dieYStep) + 2;
        double min = 1000000;
        double max = -1000000;
        // 1. 사사분면 탐색 Die List 생성
        for (int sRow = -limitY; sRow <= limitY; sRow++) {
            for (int sCol = -limitX; sCol <= limitX; sCol++) {
                double x = sCol * dieXStep;
                double y = sRow * dieYStep;
                // Die의 네 꼭짓점이 원 안에 있는지 확인
                if (isInside(x, y, dieXSize, dieYSize, radius)) {
                    String dId = String.format("D_%d_%d", sCol, sRow);
                    if ("EDS".equals(mapType)) {
                        int bin = (sRow % 2 == 0 || sCol % 2 == 0 ? 1 : rnd.nextInt(1, 10));
                        String status = (bin == 1 ? "Good" : "Bad");
                        dieList.add(new EdsDie(dId, x, y, dieXSize, dieYSize, bin, status));
                    } else if ("MEASURE".equals(mapType)) {
                        double value = rnd.nextDouble(60, 200);
                        min = (min > value ? value : min);
                        max = (max < value ? value : max);
                        dieList.add(new MeasureDie(dId, x, y, dieXSize, dieYSize, value));
                    } else {
                        dieList.add(new Die(dId, x, y, dieXSize, dieYSize));
                    }
                }
            }
        }
        
        // 2. Defect인 경우 defect 데이터 생성
        if ("DEFECT".equals(mapType)) {
            int rCount = rnd.nextInt(300, 1000);
            int cCount = rnd.nextInt(1, 4);
            int sCount = rnd.nextInt(2, 5);
            dataList = generateDefect(radius, rCount, cCount, sCount, 0);                
        }

        // 3. Metro-Cd 인 경우 Cds 데이터 생성
        if ("METRO-CD".equals(mapType)) {
            double[] findvalue = { 1000000, -1000000 };
            dataList = generateCds(radius, rnd.nextInt(1000, 2000), findvalue);
            min = findvalue[0];
            max = findvalue[1];                
        }

        return ResponseEntity.ok(new WaferMapResponse(dieList, dataList, min, max));
    }

    private boolean isInside(double x, double y, double w, double h, double r) {
        return isPointIn(x, y, r) && isPointIn(x + w, y, r) && 
               isPointIn(x, y + h, r) && isPointIn(x + w, y + h, r);
    }

    private boolean isPointIn(double px, double py, double r) {
        return (px * px) + (py * py) <= (r * r);
    }

    private List<MapData> generateCds(double radius, int count, double[] findvalue)
    {
        List<MapData> dataList = new ArrayList<>();
        ThreadLocalRandom rnd = ThreadLocalRandom.current();

        for (int i = 0; i < count; i++)
        {
            double x = rnd.nextDouble(-radius, radius);
            double y = rnd.nextDouble(-radius, radius);
            if (isPointIn(x, y, radius)) {
                String dId = String.format("D_%d", i);
                double cdvalue = rnd.nextDouble(60, 200);
                findvalue[0] = (findvalue[0] > cdvalue ? cdvalue : findvalue[0]);
                findvalue[1] = (findvalue[1] < cdvalue ? cdvalue : findvalue[1]);
                dataList.add(new MapData(dId, x, y, null, null, 0, cdvalue));
            }
        }
        return dataList;
    }
    
    private List<MapData> generateDefect(double radius, int numRandom, int numCluster, int numScratch, int seed)
    {
        List<MapData> dataList = new ArrayList<>();
        ThreadLocalRandom rnd = ThreadLocalRandom.current();

        // 1. Random Defects
        for (int i = 0; i < numRandom ; i++)
        {
            double x = rnd.nextDouble(-radius, radius);
            double y = rnd.nextDouble(-radius, radius);
            String dId = String.format("R_%d", i);
            double size = rnd.nextDouble(1000, 6000);
            if (((x * x) + (y * y)) <= (radius * radius))
            {
                dataList.add(new MapData(dId, x, y, "Random", "#130ffa", size, 0));
            }
        }

        // 2. Cluster Defects
        for (int i = 0; i < numCluster; i++)
        {
            double x = rnd.nextDouble(-radius, radius) * 0.7f;
            double y = rnd.nextDouble(-radius, radius) * 0.7f;

            int cCount = rnd.nextInt(50, 100);
            for (int si = 0; si < cCount; si++)
            {
                double clusterX = rnd.nextDouble(x -6000, x+ 6000);
                double clusterY = rnd.nextDouble(y - 6000, y + 6000);
                String dId = String.format("C_%d", i);
                double size = rnd.nextDouble(1000, 3000);
                dataList.add(new MapData(dId, clusterX, clusterY, "Cluster", "#be0b0b", size, 0));
            }
        }

            // 3. Scratch Defects
            int pointCount = 20;
            for (int k = 0; k < numScratch; k++)
            {
                PointD start = GetRandomPointInCircle(radius);
                PointD end = GetRandomPointInCircle(radius);

                double thickness = rnd.nextDouble(2000, 4000);

                // 2. 선형 보간을 통한 포인트 생성
                for (int i = 0; i < pointCount; i++)
                {
                    double t = (double)i / pointCount;
                    double x = start.x + (end.x - start.x) * t;
                    double y = start.y + (end.y - start.y) * t;

                    // 3. 두께 및 노이즈 추가
                    double offsetX = (rnd.nextDouble() - 0.5) * thickness;
                    double offsetY = (rnd.nextDouble() - 0.5) * thickness;
                    String dId = String.format("S_%d", i);
                    dataList.add(new MapData(dId, x + offsetX, y + offsetY, "Scratch", "#b130aa", thickness, 0));
                }
            }

        return dataList;
    }
    private PointD GetRandomPointInCircle(double r)
    {
        ThreadLocalRandom rnd = ThreadLocalRandom.current();
        double angle = rnd.nextDouble() * Math.PI * 2;
        double dist = Math.sqrt(rnd.nextDouble()) * r;
        return new PointD(dist * Math.cos(angle), dist * Math.sin(angle));
    }    

    record PointD(double x, double y) {}
}
