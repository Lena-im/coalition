
package business.firm;

public class Firm {

    private int firmId;
    private String name;
    private boolean isUpstream;
    private int quantity;
    private int tech;
    private int cost;
    private int market;
    private String coalition;
    private int roundId;
    private String type;

    public Firm(int firmId, String name, boolean isUpstream, int quantity, int tech, int cost, int market, String coalition, int roundId, String type) {
        this.firmId = firmId;
        this.name = name;
        this.isUpstream = isUpstream;
        this.quantity = quantity;
        this.tech = tech;
        this.cost = cost;
        this.market = market;
        this.coalition = coalition;
        this.roundId = roundId;
        this.type = type;
    }

    public int getFirmId() {
        return firmId;
    }

    public String getName() {
        return name;
    }

    public boolean isUpstream() {
        return isUpstream;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getTech() {
        return tech;
    }

    public int getCost() {
        return cost;
    }

    public int getMarket() {
        return market;
    }

    public int getRoundId() {
        return roundId;
    }

    public String getCoalition() {
        return coalition;
    }

    public String getType() {
        return type;
    }

    @Override
    public String toString() {
        return "Firm{" +
                "firmId=" + firmId +
                ", name='" + name + '\'' +
                ", isUpstream=" + isUpstream +
                ", quantity=" + quantity +
                ", tech=" + tech +
                ", cost=" + cost +
                ", market=" + market +
                ", coalition='" + coalition + '\'' +
                ", roundId=" + roundId +
                ", type='" + type + '\'' +
                '}';
    }
}
