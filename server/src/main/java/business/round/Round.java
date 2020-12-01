package business.round;

public class Round {

	private int roundId;
	private boolean practice;
	private float gamma;
	private float delta;


	public Round(int roundId, boolean practice, float gamma, float delta) {
		this.roundId = roundId;
		this.practice = practice;
		this.gamma = gamma;
		this.delta = delta;
	}

	public int getRoundId() {
		return roundId;
	}

	public boolean isPractice() {
		return practice;
	}

	public float getGamma() {
		return gamma;
	}

	public float getDelta() {
		return delta;
	}


	@Override
	public String toString() {
		return "Round{" +
				"roundId=" + roundId +
				", practice=" + practice +
				", gamma=" + gamma +
				", delta=" + delta +
				'}';
	}
}
