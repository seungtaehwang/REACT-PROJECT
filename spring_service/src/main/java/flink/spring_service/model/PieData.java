package flink.spring_service.model;

public class PieData {
	private String name;
	private float value;

	public PieData(String name, float value) {
		this.value = value;
		this.name = name;
	}

	public String getName() {
		return name;
	}
    public void setName(String name) { this.name = name; }

    public float getValue() {
		return value;
	}
    public void setValue(float value) { this.value = value; }

}
