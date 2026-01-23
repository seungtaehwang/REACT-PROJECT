package flink.spring_service.model;

public class ChartData {
	private String name;
	private float xvalue;
	private float yvalue;

	public ChartData(String name, float xvalue, float yvalue) {
		this.name = name;
		this.xvalue = xvalue;
		this.yvalue = yvalue;
	}

	public String getName() {
		return name;
	}
    public void setName(String name) { this.name = name; }

    public float getXvalue() {
		return xvalue;
	}
    public void setXvalue(float xvalue) { this.xvalue = xvalue; }

	public float getYvalue() {
		return yvalue;
	}
    public void setYvalue(float yvalue) { this.yvalue = yvalue; }
}
